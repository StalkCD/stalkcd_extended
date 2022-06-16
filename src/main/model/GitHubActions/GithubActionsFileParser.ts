import {
    Concurrency,
    ExpressionSyntax,
    GithubWorkflow,
    JobNeeds,
    NormalJob,
    PermissionsEvent,
    ReusableWorkflowCallJob,
    Shell,
    WorkingDirectory
} from "./GeneratedTypes";
import * as fs from "fs";
import {PathLike} from "fs";
import * as yaml from 'js-yaml';
import {JsonSchemaValidator} from "../../JsonSchemaValidator";
import {Pipeline} from "../pipeline/Pipeline";
import {PipelineBuilder} from "../pipeline/PipelineBuilder";
import {ParsingImpossibleError, ParsingImpossibleReason} from "../../errors/ParsingImpossibleError";
import {
    EnvironmentalVariableNameMarker,
    EnvironmentVariable,
    IEnvironmentVariable
} from "../pipeline/EnvironmentSection";
import {Stage} from "../pipeline/Stage";
import {Step} from "../pipeline/Step";
import {toKeyValueString} from "../../util";
import {IAgentOption} from "../pipeline/AgentSection";


export class GithubActionsFileParser {
    get evaluation(): any {
        return this._evaluation;
    }
    private jsonSchemaValidator: JsonSchemaValidator;

    public static readonly GITHUB_WORKFLOW_SCHEMA_PATH: PathLike = "res/schema/github-workflow.json";
    private evaluateErrors: boolean;
    private _evaluation: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
    private currentlyEvaluatedFile: string;

    /**
     * Initializes the schema.
     * @param evaluateError if this flag is true the thrown ParsingImpossibleError s are counted with the appropriate type.
     */
    constructor(evaluateError?: boolean) {
        this.jsonSchemaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH);
        if (evaluateError) {
            this.evaluateErrors = evaluateError;
        } else {
            this.evaluateErrors = false;
        }

        this._evaluation.set("total", GithubActionsFileParser.getInitializedErrorMap());
        this.currentlyEvaluatedFile = ""
    }

    private static getInitializedErrorMap(): Map<string, number> {
        let map = new Map<string, number>();
        for (let reason in ParsingImpossibleReason) {
            map.set(reason, 0);
        }
        return map;
    }

    private error(message: string, errorType: ParsingImpossibleReason) {
        if (this.evaluateErrors) {
            let totalEvaluation = this._evaluation.get("total");
            let currentFileEvaluation = this._evaluation.get(this.currentlyEvaluatedFile);

            if (totalEvaluation === undefined || currentFileEvaluation === undefined) {
                throw new Error("The file is unknown to the evaluation, please check if the initialization of the evaluation at the beginning of the parsing process is done correctly.")
            }
            let totalNumber: number | undefined = totalEvaluation.get(errorType);
            let currentNumber: number | undefined= currentFileEvaluation.get(errorType);

            if (totalNumber === undefined || currentNumber === undefined) {
                throw new Error("The number is undefined, this should not be happening since the list initialized with a '0' and all errorTypes should be know in the enum. Please check the received errorType and the initialization process.")
            }

            totalEvaluation.set(errorType, totalNumber + 1);
            currentFileEvaluation.set(errorType, currentNumber + 1);

        } else {
            throw new ParsingImpossibleError(message, errorType);
        }
    }

    /**
     * Returns an Pipeline-Object based on the given GithubActionsWorkflow-File.
     * If the file is not a valid GithubActionsWorkflow yml-File, an ValidationError is thrown.
     * In the same object you cannot rerun the same file-parsing if the 'evaluateErrors' flag is set to true.
     * @param input
     */
    parse(input: PathLike): Pipeline {
        this.currentlyEvaluatedFile = input.toString()
        if (this.evaluateErrors && this._evaluation.get(this.currentlyEvaluatedFile) !== undefined) {
            throw Error(`The File '${ this.currentlyEvaluatedFile }' was already parsed. If it would be parsed again the total evaluation would break.`)
        }

        this._evaluation.set(this.currentlyEvaluatedFile, GithubActionsFileParser.getInitializedErrorMap());

        this.jsonSchemaValidator.validate(input);

        let githubWorkflow: GithubWorkflow = <GithubWorkflow>yaml.load(fs.readFileSync(input, {encoding: 'utf8'}));
        let builder: PipelineBuilder = new PipelineBuilder();

        // Workflow
        builder.setDefinitions(GithubActionsFileParser.definitions(githubWorkflow));
        builder.setEnvironment(GithubActionsFileParser.environment(githubWorkflow))
        builder.setTriggers(this.triggers(githubWorkflow));
        builder.setOptions(GithubActionsFileParser.options(githubWorkflow));

        // Stages
        let stages: Stage[] = this.stages(githubWorkflow);
        for (let stage of stages) {
            builder.beginStage(stage.toSerial())
            builder.endStage()
        }
        return builder.pipeline;
    }

    private stages(githubWorkflow: GithubWorkflow): Stage[] {
        let stages: Stage[] = [];
        let jobs = githubWorkflow.jobs;
        // fail fast
        if (GithubActionsFileParser.hasReusableWorkflowCallJob(jobs)) {
            this.error(jobs.toString(), ParsingImpossibleReason.UnableToHandleReusableWorkflowCallJob)
        }
        if (GithubActionsFileParser.hasOutput(jobs)) {
            this.error(jobs.toString(), ParsingImpossibleReason.HasOutput)
        }

        // processing
        for (let jobId in jobs) {
            let job: NormalJob = <NormalJob>jobs[jobId];
            let pipelineStage: Stage = new Stage({
                name: jobId,
            });
            if (job.name) {
                pipelineStage.baseName = job.name;
            }
            pipelineStage.when = GithubActionsFileParser.when(job)
            pipelineStage.agent = this.agent(job)
            pipelineStage.environment = GithubActionsFileParser.environment(job)
            pipelineStage.options = GithubActionsFileParser.options(job)

            let continueOnError = job["continue-on-error"];
            if (typeof continueOnError === "string") {
                this.error("The attriubte 'continue-on-error' was a string: '" + continueOnError + "'", ParsingImpossibleReason.ContinueOnErrorIsString)
            }
            if (continueOnError !== undefined) {
                pipelineStage.failFast = !continueOnError;
            }
            pipelineStage.steps = this.steps(job.steps);

            stages.push(pipelineStage);
        }
        return stages
    }

    private steps(steps: { id?: string; if?: string; name?: string; uses?: string; run?: string; "working-directory"?: WorkingDirectory; shell?: Shell; with?: { [p: string]: string | number | boolean } | string; env?: { [p: string]: string | number | boolean } | string; "continue-on-error"?: boolean | ExpressionSyntax; "timeout-minutes"?: number }[] | undefined) {
        let pipelineSteps: Step[] = [];
        if (steps) {
            for (let stepKey in steps) {
                let githubStep = steps[stepKey];
                if (githubStep.id) {
                    this.error("Unsupported Attribute 'id' with value '" + githubStep.id + "'", ParsingImpossibleReason.StepId)
                }
                if (githubStep.if) {
                    this.error("Unsupported Attribute 'if' with value '" + githubStep.if + "'", ParsingImpossibleReason.StepIf)
                }
                if (githubStep.with) {
                    this.error("Unsupported Attribute 'with' with value '" + githubStep.with + "'", ParsingImpossibleReason.StepWith)
                }
                if (githubStep.env) {
                    this.error("Unsupported Attribute 'env' with value '" + githubStep.env + "'", ParsingImpossibleReason.StepEnvironment)
                }
                if (githubStep["timeout-minutes"]) {
                    this.error("Unsupported Attribute 'timeout-minutes' with value '" + githubStep["timeout-minutes"] + "'", ParsingImpossibleReason.StepTimeoutMinutes)
                }
                if (githubStep["continue-on-error"]) {
                    this.error("Unsupported Attribute 'continue-on-error' with value '" + githubStep["continue-on-error"] + "'", ParsingImpossibleReason.StepContinueOnError)
                }
                let stageStep = new Step({
                    label: githubStep.name,
                    command: githubStep.run ? (githubStep.shell ? githubStep.shell + " " : " ") + githubStep.run : githubStep.uses //
                });
                pipelineSteps.push(stageStep);
            }
        }
        return pipelineSteps;
    }

    private static when(job: NormalJob): string {
        // TODO: extract also jobs.<job-id>.JobNeeds
        if (job.if) {
            return job.if;
        }
        return "";
    }

    private static hasReusableWorkflowCallJob(jobs: { [p: string]: NormalJob | ReusableWorkflowCallJob }): boolean {
        for (let jobId in jobs) {
            // @ts-ignore
            if (jobs[jobId].with) { // very ugly, this is an attribute which only exists on ReusableWorkflowCallJob
                return true;
            }
        }
        return false;
    }

    private triggers(githubWorkflow: GithubWorkflow): string[] {
        let triggers: string[] = [];
        if (githubWorkflow.on instanceof Array) { // Handling Event[]
            githubWorkflow.on.forEach(e => triggers.push(e.toString()));
        } else if ((typeof githubWorkflow.on) === "string") { // Handling Event; very ugly ts Seems Unnecessary Complicated Knowing typeS
            triggers.push(githubWorkflow.on.toString())
        } else {
            this.error(githubWorkflow.on.toString(), ParsingImpossibleReason.OnIsUnknownType);
        }
        return triggers;
    }

    private static definitions(githubWorkflow: GithubWorkflow): string[] {
        let definitions: string[] = [];
        if (githubWorkflow.name) {
            definitions.push(githubWorkflow.name);
        }
        return definitions;
    }

    private static environment(entity: GithubWorkflow | NormalJob): IEnvironmentVariable[] {
        let pipelineEnvironment: IEnvironmentVariable[] = [];
        let env = entity.env;
        if (typeof env === "string") {
            pipelineEnvironment.push(new EnvironmentVariable(EnvironmentalVariableNameMarker.EXTERNAL_ENVIRONMENT, env));
        } else if (typeof env === "object") {
            for (let envKey in env) {
                pipelineEnvironment.push(new EnvironmentVariable(envKey, env[envKey].toString()));
            }
        }

        // Handling of special NormalJob attributes
        if ("strategy" in entity) {
            let strategy = entity.strategy;
            pipelineEnvironment.push(new EnvironmentVariable("strategyJSON", JSON.stringify(strategy)))
        }

        return pipelineEnvironment;
    }

    private static options(object: GithubWorkflow | NormalJob): string[] {
        let options: string[] = [];

        let defaults = object.defaults;
        if (defaults) {
            let run: any = defaults.run; // ugly, this should be properly typed by I'm at this point to annoyed to care
            if (run) {
                for (let runKey in run) {
                    options.push(toKeyValueString("defaults.run_" + runKey, run[runKey]));
                }
            }
        }

        let permissions: PermissionsEvent | "read-all" | "write-all" | undefined = object.permissions;
        if (permissions) {
            if (typeof permissions === "string") {
                options.push(toKeyValueString("permissions", permissions))
            }
            if (typeof permissions === "object") {
                options.push(toKeyValueString("permissionsJSON", JSON.stringify(permissions)))
            }
        }

        let concurrency: string | Concurrency | undefined = object.concurrency;
        if (concurrency) {
            if (typeof concurrency === "string") {
                options.push(toKeyValueString("concurrency", concurrency))
            }
            if (typeof concurrency === "object") {
                options.push(toKeyValueString("concurrencyJSON", JSON.stringify(concurrency)))
            }
        }

        // Handling of special NormalJob attributes
        // @ts-ignore
        let timeoutMinutes = object["timeout-minutes"];
        if (timeoutMinutes) {
            options.push(toKeyValueString("timeout-minutes", timeoutMinutes))
        }

        // @ts-ignore
        let needs: JobNeeds = object.needs;
        if (needs) {
            if (typeof needs == "string") {
                options.push(toKeyValueString("needs", needs));
            } else {
                needs.forEach(n => options.push(toKeyValueString("needs", n)))
            }
        }

        return options;
    }

    private static hasOutput(jobs: { [p: string]: NormalJob | ReusableWorkflowCallJob }) {
        for (let jobsKey in jobs) {
            let job: NormalJob = <NormalJob>jobs[jobsKey];
            if (job.outputs) {
                return true;
            }
        }
        return false;
    }

    private  agent(job: NormalJob): IAgentOption[] {
        let agents: IAgentOption[] = []

        if (job["runs-on"] instanceof Array) {
            this.error("Unable to Handle the self-hosted option in 'runs-on'\n" + job["runs-on"].toString(), ParsingImpossibleReason.SelfHosted)
        }
        agents.push({
            name: "runs-on",
            value: job["runs-on"].toString()
        })
        let container = job.container;
        if (container) {
            agents.push({
                name: "container",
                value: JSON.stringify(container)
            })
        }
        let services = job.services
        if (services) {
            agents.push({
                name: "services",
                value: JSON.stringify(services),
            })
        }
        return agents;
    }
}