import {IPipeline, Pipeline} from "../pipeline/Pipeline";
import {IStage} from "../pipeline/Stage";
import {IStep} from "../pipeline/Step";
import {WorkflowBuilder} from "./GithubWorkflowBuilder";
import {separateKeyValue} from "../../util";
import {EnvironmentVariable} from "../pipeline/EnvironmentSection";
import {IAgentOption} from "../pipeline/AgentSection";

export interface WorkflowGenerator {
    run(pipeline: Pipeline): any;
}

export class GithubWorkflowGenerator implements WorkflowGenerator{

    protected builder: WorkflowBuilder;
    private doExperimentalConversion: boolean

    constructor(doExperimentalConversion?: boolean) {
        this.doExperimentalConversion = doExperimentalConversion !== undefined ? doExperimentalConversion : false
        this.builder = new WorkflowBuilder(this.doExperimentalConversion)
    }

    run(pipeline: Pipeline) {
        this.builder = new WorkflowBuilder(this.doExperimentalConversion)
        this.doPipeline(pipeline);
        let stages = pipeline.stages;
        for (let stage of stages) {
            this.doStageWithPipeline(stage);
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

    protected doPipeline(pipeline: IPipeline) {
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
            env.forEach(e => this.builder.env(e.name === "EXTERNAL_ENVIRONMENT" ? undefined : e.name, e.value))
        }
    }

    protected doStageWithPipeline(stage: IStage): void {
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
                this.builder.currentJob().env(environmentVariable.name === "EXTERNAL_ENVIRONMENT" ? undefined : environmentVariable.name, environmentVariable.value);
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

    protected doAgent(keyValue: IAgentOption) {
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

    protected doStep(step: IStep): void {
        this.builder.currentJob().step()
            .name(step.label)
            .shell(this.getShell(step.command))
            .run(this.getRun(step.command))
            .uses(this.getUses(step.command))
            .if(this.getIfStatement(step))
            .with(step.reusableCallParameters)
            .env(step.environment)
            .workingDirectory(step.workingDirectory)
            .end()
    }

    protected getIfStatement(step: IStep): string | undefined {
        if (!step.when) {
            return undefined
        }
        return step.when.join(" || ");
    }

    protected getShell(command: string | undefined): string | undefined {
        if (command) {
            if (command.startsWith("$uses$ ")) {
                return undefined;
            }
            let split: any = command?.split(" ");
            return split[0].length > 0 ? split[0] : undefined;
        }
    }

    protected doOptionForWorkflow(optionString: string): void {
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

    protected doOptionForJob(optionString: string): void {
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

    protected getRun(command: string | undefined): string | undefined {
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
        if (command) {
            if (!command.includes("$uses$ ")) {
                return undefined;
            }
            return command.replace("$uses$ ", "");
        }

    }
}