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
    private jsonSchemaValidator: JsonSchemaValidator;

    public static readonly GITHUB_WORKFLOW_SCHEMA_PATH: PathLike = "res/schema/github-workflow.json";

    constructor() {
        this.jsonSchemaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH);
    }

    /**
     * Returns an Pipeline-Object based on the given GithubActionsWorkflow-File.
     * If the file is not a valid GithubActionsWorkflow yml-File, an ValidationError is thrown.
     * @param input
     */
    parse(input: PathLike): Pipeline {
        this.jsonSchemaValidator.validate(input);
        let githubWorkflow: GithubWorkflow = <GithubWorkflow>yaml.safeLoad(fs.readFileSync(input, {encoding: 'utf8'}));
        let builder: PipelineBuilder = new PipelineBuilder();
        builder.setDefinitions(GithubActionsFileParser.definitions(githubWorkflow));
        builder.setEnvironment(GithubActionsFileParser.environment(githubWorkflow))
        builder.setTriggers(GithubActionsFileParser.triggers(githubWorkflow));
        builder.setOptions(GithubActionsFileParser.options(githubWorkflow));
        let stages: Stage[] = GithubActionsFileParser.stages(githubWorkflow);
        for (let stage of stages) {
            builder.beginStage(stage.toSerial())
            builder.endStage()
        }
        return builder.pipeline;
    }

    private static stages(githubWorkflow: GithubWorkflow): Stage[] {
        let stages: Stage[] = [];
        let jobs = githubWorkflow.jobs;
        // fail fast
        if (GithubActionsFileParser.hasReusableWorkflowCallJob(jobs)) {
            throw new ParsingImpossibleError(jobs.toString(), ParsingImpossibleReason.UnableToHandleReusableWorkflowCallJob)
        }
        if (GithubActionsFileParser.hasOutput(jobs)) {
            throw new ParsingImpossibleError(jobs.toString(), ParsingImpossibleReason.HasOutput)
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
            pipelineStage.agent = GithubActionsFileParser.agent(job)
            pipelineStage.environment = GithubActionsFileParser.environment(job)
            pipelineStage.options = GithubActionsFileParser.options(job)

            let continueOnError = job["continue-on-error"];
            if (typeof continueOnError === "string") {
                throw new ParsingImpossibleError("The attriubte 'continue-on-error' was a string: '" + continueOnError + "'", ParsingImpossibleReason.ContinueOnErrorIsString)
            }
            if (continueOnError !== undefined) {
                pipelineStage.failFast = !continueOnError;
            }
            pipelineStage.steps = GithubActionsFileParser.steps(job.steps);

            stages.push(pipelineStage);
        }
        return stages
    }

    private static steps(steps: { id?: string; if?: string; name?: string; uses?: string; run?: string; "working-directory"?: WorkingDirectory; shell?: Shell; with?: { [p: string]: string | number | boolean } | string; env?: { [p: string]: string | number | boolean } | string; "continue-on-error"?: boolean | ExpressionSyntax; "timeout-minutes"?: number }[] | undefined) {
        let pipelineSteps: Step[] = [];
        if (steps) {
            for (let stepKey in steps) {
                let githubStep = steps[stepKey];
                if (githubStep.id) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'id' with value '" + githubStep.id + "'", ParsingImpossibleReason.StepId)
                }
                if (githubStep.if) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'if' with value '" + githubStep.if + "'", ParsingImpossibleReason.StepIf)
                }
                if (githubStep.with) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'with' with value '" + githubStep.with + "'", ParsingImpossibleReason.StepWith)
                }
                if (githubStep.env) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'env' with value '" + githubStep.env + "'", ParsingImpossibleReason.StepEnvironment)
                }
                if (githubStep["timeout-minutes"]) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'timeout-minutes' with value '" + githubStep["timeout-minutes"] + "'", ParsingImpossibleReason.StepTimeoutMinutes)
                }
                if (githubStep["continue-on-error"]) {
                    throw new ParsingImpossibleError("Unsupported Attribute 'continue-on-error' with value '" + githubStep["continue-on-error"] + "'", ParsingImpossibleReason.StepContinueOnError)
                }
                let stageStep = new Step({
                    label: githubStep.name,
                    command: githubStep.run ? (githubStep.shell ? githubStep.shell + " " : "") + githubStep.run : githubStep.uses
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

    private static triggers(githubWorkflow: GithubWorkflow): string[] {
        let triggers: string[] = [];
        if (githubWorkflow.on instanceof Array) { // Handling Event[]
            githubWorkflow.on.forEach(e => triggers.push(e.toString()));
        } else if ((typeof githubWorkflow.on) === "string") { // Handling Event; very ugly ts Seems Unnecessary Complicated Knowing typeS
            triggers.push(githubWorkflow.on.toString())
        } else {
            throw new ParsingImpossibleError(githubWorkflow.on.toString(), ParsingImpossibleReason.OnIsUnknownType);
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
        if (!entity.env) {
            return [];
        }

        let pipelineEnvironment: IEnvironmentVariable[] = [];
        let env = entity.env;
        if (typeof env === "string") {
            pipelineEnvironment.push(new EnvironmentVariable(EnvironmentalVariableNameMarker.EXTERNAL_ENVIRONMENT, env));
        } else if (typeof env === "object") {
            for (let envKey in env) {
                pipelineEnvironment.push(new EnvironmentVariable(envKey, env[envKey].toString()));
            }
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
                    options.push(toKeyValueString(runKey, run[runKey]));
                }
            }
        }

        let permissions: PermissionsEvent | "read-all" | "write-all" | undefined = object.permissions;
        if (permissions) {
            if (typeof permissions === "string") {
                options.push(toKeyValueString("permissions", permissions))
            }
            if (typeof permissions === "object") {
                options.push(toKeyValueString("permissions", JSON.stringify(permissions)))
            }
        }

        let concurrency: string | Concurrency | undefined = object.concurrency;
        if (concurrency) {
            if (typeof concurrency === "string") {
                options.push(toKeyValueString("concurrency", concurrency))
            }
            if (typeof concurrency === "object") {
                options.push(toKeyValueString("concurrency", JSON.stringify(concurrency)))
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

    private static agent(job: NormalJob): IAgentOption[] {
        let agents: IAgentOption[] = []

        if (job["runs-on"] instanceof Array) {
            throw new ParsingImpossibleError("Unable to Handle the self-hosted option in 'runs-on'\n" + job["runs-on"].toString(), ParsingImpossibleReason.SelfHosted)
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