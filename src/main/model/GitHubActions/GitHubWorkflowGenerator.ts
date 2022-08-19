import {IPipeline, Pipeline} from "../pipeline/Pipeline";
import {IStage} from "../pipeline/Stage";
import {IStep} from "../pipeline/Step";
import {WorkflowBuilder} from "./GithubWorkflowBuilder";
import {separateKeyValue} from "../../util";
import {EnvironmentVariable} from "../pipeline/EnvironmentSection";
import {IAgentOption} from "../pipeline/AgentSection";
import {isNumberic} from "../util/Utils";


export class GithubWorkflowGenerator {

    private builder: WorkflowBuilder;

    constructor(doExperimentalConversion?: boolean) {
        this.builder = new WorkflowBuilder(doExperimentalConversion)
    }

    run(pipeline: Pipeline) {
        this.doPipeline(pipeline);
        let stages = pipeline.stages;
        for (let stage of stages) {
            this.doStage(stage);
            let steps = stage.steps;
            if (steps !== undefined) {
                for (let step of steps) {
                    this.doStep(step);
                }
            }
            this.builder.currentJob().end()
        }

        return this.builder.build();
    }

    private doPipeline(pipeline: IPipeline) {
        let triggers = pipeline.triggers;
        let name: string[] = pipeline.definitions ? pipeline.definitions : [];
        if (!triggers) {
            throw new Error("Triggers are required.")
        }

        this.builder
            .on(triggers)
            .name(name[0])

        let options: string[] | undefined = pipeline.options;
        if (options) {
            options.forEach(s => this.doOptionForWorkflow(s))
        }

        let env: EnvironmentVariable[] | undefined = pipeline.environment;
        if (env) {
            env.forEach(e => this.builder.env(e.name, this.getValueTyped(e.value)))
        }
    }

    private getValueTyped(value: string | number | boolean): string | number | boolean {
        // find out type by parsing to number
        if (typeof value === 'boolean' || typeof value === 'number') {
            return value
        }
        // handling of possible toString-conversion-types
        if ("true" === value) {
            return true
        } else if ("false" === value) {
            return false
        } else if (isNumberic(value)) {
            return +value
        }

        return value; // the actual string value
    }

    private doStage(stage: IStage): void {
        let id: string | undefined = stage.name;
        if (id === undefined) {
            throw new Error("name of Stage is required.")
        }

        this.builder.job(id);
        let agent = stage.agent;
        if (agent) {
            agent.forEach(keyValue => this.doAgent(keyValue))
        }
        let options: string[] | undefined = stage.options;
        if (options) {
            options.forEach(s => this.doOptionForJob(s))
        }

        let env: EnvironmentVariable[] | undefined = stage.environment
        if (env) {
            for (let environmentVariable of env) {
                // special case(s)
                if ("strategyJSON" === environmentVariable.name) {
                    this.builder.currentJob().strategy(JSON.parse(environmentVariable.value))
                    continue;
                }

                // normal env processing
                this.builder.currentJob().env(environmentVariable.name, this.getValueTyped(environmentVariable.value));
            }
        }

        let name: string | undefined = stage.baseName
        if (name) {
            this.builder.currentJob().name(name)
        }

        let ifExpression: string | undefined = stage.when;
        if (ifExpression) {
            this.builder.currentJob().ifExpression(ifExpression)
        }

        let continueOnError: boolean | undefined = stage.failFast
        if (!(continueOnError === undefined)) {
            // failFast is the opposite to continue-on-error
            this.builder.currentJob().continueOnError(!continueOnError);
        }
    }

    private doAgent(keyValue: IAgentOption) {
        if (keyValue.name === "runs-on") {
            this.builder.currentJob().runsOn(keyValue.value)
        }
        if (keyValue.name === "container") {
            // @ts-ignore
            this.builder.currentJob().container(JSON.parse(keyValue.value))
        }
        if (keyValue.name === "services") {
            // @ts-ignore
            this.builder.currentJob().service(JSON.parse(keyValue.value))
        }
    }

    private doStep(step: IStep): void {
        this.builder.currentJob().step()
            .name(step.label)
            .shell(this.getShell(step.command))
            .run(this.getRun(step.command))
            .uses(this.getUses(step.command))
            .if(this.getIfStatement(step))
            .with(step.reusableCallParameters)
            .env(step.environment)
            .end()
    }

    private getIfStatement(step: IStep): string | undefined {
        if (!step.when) {
            return undefined
        }
        return step.when.join(" || ");
    }

    private getShell(command: string | undefined): string | undefined {
        if (command?.startsWith("$uses$ ")) {
            return undefined
        }
        let split: any = command?.split(" ");
        return split[0].length > 0 ? split[0] : undefined;
    }

    private doOptionForWorkflow(optionString: string): void {
        let strings: string[] = separateKeyValue(optionString);
        let key: string = strings[0];
        let value: string = strings[1];

        if (key.startsWith("defaults.run_")) {
            let defaultRunKey: string = key.split("_")[1];
            this.builder.defaultsRun(defaultRunKey, value);
        }

        if (key.startsWith("concurrency")) {
            this.builder.concurrency(value);
        }
        if (key.startsWith("concurrencyJSON")) {
            this.builder.concurrency(JSON.parse(value));
        }

        if (key.startsWith("permissions")) {
            this.builder.permissions(value);
        }
        if (key.startsWith("permissionsJSON")) {
            this.builder.permissions(JSON.parse(value));
        }
    }

    private doOptionForJob(optionString: string): void {
        let strings: string[] = separateKeyValue(optionString);
        let key: string = strings[0];
        let value: string = strings[1];

        if (key.startsWith("defaults.run_")) {
            let defaultRunKey: string = key.split("_")[1];
            this.builder.currentJob().defaultsRun(defaultRunKey, value);
        }

        if (key.startsWith("concurrency")) {
            this.builder.currentJob().concurrency(value);
        }
        if (key.startsWith("concurrencyJSON")) {
            this.builder.currentJob().concurrency(JSON.parse(value));
        }

        if (key.startsWith("permissions")) {
            this.builder.currentJob().permissions(value);
        }
        if (key.startsWith("permissionsJSON")) {
            this.builder.currentJob().permissions(JSON.parse(value));
        }

        if (key.startsWith("timeout-minutes")) {
            this.builder.currentJob().timeoutMinutes(Number.parseInt(value))
        }

        if (key.startsWith("needs")) {
            this.builder.currentJob().needs(value)
        }
    }

    private getRun(command: string | undefined): string | undefined {
        if (command) {
            if (command.startsWith("$uses$ ")) {
                return undefined
            }

            let shell: string | undefined = this.getShell(command);
            if (shell) {
                return command.replace(shell + " ", "");
            } else {
                return command.slice(1)
            }
        }
        return command;
    }

    private getUses(command: string | undefined) {
        if (command === undefined) {
            return undefined
        }
        if (!command.includes("$uses$ ")) {
            return undefined;
        }

        return command.replace("$uses$ ", "");
    }
}