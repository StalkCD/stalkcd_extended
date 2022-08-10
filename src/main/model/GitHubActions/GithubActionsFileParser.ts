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
import {ParsingImpossibleError, ParsingImpossibleReason as PIR} from "../../errors/ParsingImpossibleError";
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
    get experimentalConversionActive(): boolean {
        return this._experimentalConversionActive;
    }

    get evaluateErrors(): boolean {
        return this._evaluateErrors;
    }

    get evaluation(): Map<string, Map<string, number>> {
        return this._evaluation;
    }

    private jsonSchemaValidator: JsonSchemaValidator;
    public static readonly GITHUB_WORKFLOW_SCHEMA_PATH: PathLike = "res/schema/github-workflow.json";

    private readonly _evaluateErrors: boolean;
    private readonly _experimentalConversionActive: boolean;
    private readonly _restrictExperimentalConversionTo: string[];

    private _evaluation: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
    private currentlyEvaluatedFile: string;

    /**
     * Initializes the schema.
     * @param evaluateError if this flag is true the thrown ParsingImpossibleError s are counted with the appropriate type.
     * @param restrictExperimentalConversionTo If this Parameter is defined, some ParsingImpossibleError's are not thrown.
     *                                          A rather ambiguous way for conversion is chosen.
     *                                          Furthermore, it is possible to restrict the conversion to certain types of Errors to see their effect.
     *                                          If an empty list is given all errors are allowed by default
     */
    constructor(evaluateError?: boolean, restrictExperimentalConversionTo?: string[]) {
        // set flags
        this._evaluateErrors = evaluateError !== undefined ? evaluateError : false;
        this._experimentalConversionActive = restrictExperimentalConversionTo !== undefined;
        this._restrictExperimentalConversionTo = this.getRestrictExperimentalConversion(restrictExperimentalConversionTo);

        // init schema
        this.jsonSchemaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH);

        // init evaluation
        this._evaluation.set("total", GithubActionsFileParser.getInitializedErrorMap());
        this.currentlyEvaluatedFile = ""
    }

    private getRestrictExperimentalConversion(restrictExperimentalConversionTo: string[] | undefined) {
        if (restrictExperimentalConversionTo !== undefined
            && (restrictExperimentalConversionTo.length !== 0)) {
            return restrictExperimentalConversionTo;
        } else { // if no restrictions are given, every conversion is allowed
            let noRestrictionMap: string[] = []
            GithubActionsFileParser.getInitializedErrorMap().forEach((_, key) => noRestrictionMap.push(key));
            return noRestrictionMap;
        }
    }

    public static getInitializedErrorMap(): Map<string, number> {
        let map = new Map<string, number>();
        for (let reason in PIR) {
            map.set(reason, 0);
        }
        return map;
    }

    private error(message: string, errorType: PIR) {
        if (this._evaluateErrors) {
            let totalEvaluation = this._evaluation.get("total");
            let currentFileEvaluation = this._evaluation.get(this.currentlyEvaluatedFile);

            if (totalEvaluation === undefined || currentFileEvaluation === undefined) {
                throw new Error("The file is unknown to the evaluation, please check if the initialization of the evaluation at the beginning of the parsing process is done correctly.")
            }
            let totalNumber: number | undefined = totalEvaluation.get(errorType);
            let currentNumber: number | undefined = currentFileEvaluation.get(errorType);

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
    parse(input: PathLike): Pipeline | undefined {
        this.currentlyEvaluatedFile = input.toString()

        if (this._evaluateErrors && this._evaluation.get(this.currentlyEvaluatedFile) !== undefined) {
            throw Error(`The File '${this.currentlyEvaluatedFile}' was already parsed. If it would be parsed again the total evaluation would break.`)
        }
        this._evaluation.set(this.currentlyEvaluatedFile, GithubActionsFileParser.getInitializedErrorMap());

        try {

            try {
                this.jsonSchemaValidator.validate(input);
            } catch (err) {
                this.error("unable to validate file '" + input + "' against schema.", PIR.ValidationFailed)
            }

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
        } catch (err) {
            this.error("An Error Occured which was not expected", PIR.UnknownError)
        }

        return undefined
    }

    private stages(githubWorkflow: GithubWorkflow): Stage[] {
        let stages: Stage[] = [];
        let jobs = githubWorkflow.jobs;
        // fail fast
        if (GithubActionsFileParser.hasReusableWorkflowCallJob(jobs)) {
            this.error(jobs.toString(), PIR.UnableToHandleReusableWorkflowCallJob)
        }
        if (GithubActionsFileParser.hasOutput(jobs)) {
            this.error(jobs.toString(), PIR.HasOutput)
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
                this.error("The attriubte 'continue-on-error' was a string: '" + continueOnError + "'", PIR.ContinueOnErrorIsString)
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
                let reusableCallParameters: Map<string, string | number | boolean> | undefined = undefined;
                let environment: Map<string, string | number | boolean> | undefined = undefined;
                let githubStep = steps[stepKey];
                if (githubStep.id) {
                    this.error("Unsupported Attribute 'id' with value '" + githubStep.id + "'", PIR.StepId)
                }
                if (githubStep.if) {
                    this.error("Unsupported Attribute 'if' with value '" + githubStep.if + "'", PIR.StepIf)
                }
                if (githubStep.with) {
                    if (this._experimentalConversionActive && this.isConversionAllowed(PIR.StepWith)) {
                        reusableCallParameters = this.doStepWith(githubStep);
                    } else {
                        this.error("Unsupported Attribute 'with' with value '" + githubStep.with + "'", PIR.StepWith);
                    }
                }
                if (githubStep.env) {
                    if (this._experimentalConversionActive && this.isConversionAllowed(PIR.StepEnvironment)) {
                        environment = this.doStepEnv(githubStep);
                    } else {
                        this.error("Unsupported Attribute 'env' with value '" + githubStep.env + "'", PIR.StepEnvironment);
                    }
                }
                if (githubStep["timeout-minutes"]) {
                    this.error("Unsupported Attribute 'timeout-minutes' with value '" + githubStep["timeout-minutes"] + "'", PIR.StepTimeoutMinutes)
                }
                if (githubStep["continue-on-error"]) {
                    this.error("Unsupported Attribute 'continue-on-error' with value '" + githubStep["continue-on-error"] + "'", PIR.StepContinueOnError)
                }
                let stageStep = new Step({
                    label: githubStep.name,
                    command: githubStep.run ? (githubStep.shell ? githubStep.shell + " " : " ") + githubStep.run : githubStep.uses,
                    reusableCallParameters: reusableCallParameters,
                    environment: environment
                });
                pipelineSteps.push(stageStep);
            }
        }
        return pipelineSteps;
    }

    private doStepWith(githubStep: { id?: string; if?: string; name?: string; uses?: string; run?: string; "working-directory"?: WorkingDirectory; shell?: Shell; with?: { [p: string]: string | number | boolean } | string; env?: { [p: string]: string | number | boolean } | string; "continue-on-error"?: boolean | ExpressionSyntax; "timeout-minutes"?: number }): Map<string, string | number | boolean> | undefined {
        if (typeof githubStep.with === 'string') {
            // ignore
            // this should be impossible a value needs a reference.
            this.error("Unsupported Attribute 'with' with value '" + githubStep.with + "'", PIR.StepWith);
            return undefined
        }
        let map: Map<string, string | number | boolean> = new Map<string, string | number | boolean>();
        for (let key in githubStep.with) {
            // ignore if one of these happen, they are incompatible with any concept known to us in StalkCD (09.08.2022)
            if (githubStep.with.args) {
                this.error("Unsupported Attribute 'with.args' with value '" + githubStep.with.args + "'", PIR.StepWithArgs);
                // https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswithargs
                continue
            }
            if (githubStep.with.entrypoint) {
                // https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswithentrypoint
                this.error("Unsupported Attribute 'with.entrypoint' with value '" + githubStep.with.entrypoint + "'", PIR.StepWithEntrypoint);
                continue
            }
            // variables are accessible by upper case and with INPUT_ as prefix; see documentation:
            // https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith
            map.set("INPUT_" + key.toUpperCase(), githubStep.with[key]);
        }
        return map;

    }

    private doStepEnv(githubStep: { id?: string; if?: string; name?: string; uses?: string; run?: string; "working-directory"?: WorkingDirectory; shell?: Shell; with?: { [p: string]: string | number | boolean } | string; env?: { [p: string]: string | number | boolean } | string; "continue-on-error"?: boolean | ExpressionSyntax; "timeout-minutes"?: number }): Map<string, string | number | boolean> | undefined {
        if (typeof githubStep.env === 'string') {
            // ignore
            // this should be impossible a value needs a reference.
            this.error("Unsupported Attribute 'env' with value '" + githubStep.env + "'", PIR.StepEnvironment);
            return undefined
        }

        let map: Map<string, string | number | boolean> = new Map<string, string | number | boolean>();
        for (let key in githubStep.env) {
            map.set(key, githubStep.env[key])
        }
        return map
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
        } else { // arbitrary object for on.
            if (this._experimentalConversionActive && this.isConversionAllowed(PIR.OnIsUnknownType)) {
                triggers.push("onJSON")
                triggers.push(JSON.stringify(githubWorkflow.on))
            } else {
                this.error(githubWorkflow.on.toString(), PIR.OnIsUnknownType);
            }
        }
        return triggers;
    }

    private isConversionAllowed(reason: PIR) {
        return this._restrictExperimentalConversionTo.find(item => item == reason);
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

    private agent(job: NormalJob): IAgentOption[] {
        let agents: IAgentOption[] = []

        if (job["runs-on"] instanceof Array) {
            this.error("Unable to Handle the self-hosted option in 'runs-on'\n" + job["runs-on"].toString(), PIR.SelfHosted)
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