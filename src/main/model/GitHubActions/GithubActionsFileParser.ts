import {
    Concurrency,
    GithubWorkflow,
    NormalJob,
    PermissionsEvent,
    ReusableWorkflowCallJob
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
        builder.setParameters(GithubActionsFileParser.parameters(githubWorkflow));
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
            pipelineStage.agent = GithubActionsFileParser.runsOn(job)
            pipelineStage.environment = GithubActionsFileParser.environment(job)
            pipelineStage.options = GithubActionsFileParser.options(job)

            let steps: Step[] = [];
            if (job.steps) {
                for (let stepKey in job.steps) {
                    let githubStep = job.steps[stepKey];
                    let stageStep = new Step({
                        label: githubStep.name,
                        command: githubStep.run ? (githubStep.shell ? githubStep.shell + " " : "") + githubStep.run : githubStep.uses
                    });
                    steps.push(stageStep);
                }
            }
            pipelineStage.steps = steps;

            stages.push(pipelineStage);
        }
        return stages
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

    private static parameters(githubWorkflow: GithubWorkflow): string[] {
        let params: string[] = [];

        let defaults = githubWorkflow.defaults;
        if (defaults) {
            let run:any = defaults.run; // ugly, this should be properly typed by I'm at this point to annoyed to care
            if (run) {
                for (let runKey in run) {
                    params.push(toKeyValueString(runKey, run[runKey]));
                }
            }
        }

        let permissions: PermissionsEvent | "read-all" | "write-all" | undefined = githubWorkflow.permissions;
        if (permissions) {
            if (typeof permissions === "string") {
                params.push(toKeyValueString("permissions", permissions))
            }
            if (typeof permissions === "object") {
                params.push(toKeyValueString("permissions", JSON.stringify(permissions)))
            }
        }

        let concurrency: string | Concurrency | undefined = githubWorkflow.concurrency;
        if (concurrency) {
            if (typeof concurrency === "string") {
                params.push(toKeyValueString("concurrency", concurrency))
            }
            if (typeof concurrency === "object") {
                params.push(toKeyValueString("concurrency", JSON.stringify(concurrency)))
            }
        }

        return params;
    }

    private static runsOn(job: NormalJob): IAgentOption[] {
        if (job["runs-on"] instanceof Array) {
            throw new ParsingImpossibleError("Unable to Handle the self-hosted option in 'runs-on'\n" + job["runs-on"].toString(), ParsingImpossibleReason.SelfHosted)
        }
        return [{name: job["runs-on"].toString()}];
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

    private static options(job: NormalJob): string[] {
        let timeoutMinutes = job["timeout-minutes"];
        return timeoutMinutes ? [timeoutMinutes.toString()] : [];
    }
}