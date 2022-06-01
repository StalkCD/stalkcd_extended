import {GithubWorkflow} from "./GeneratedTypes";
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
import {toKeyValueString} from "../util/Utils";


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
        builder.setTriggers(this.triggers(githubWorkflow));
        builder.setParameters(GithubActionsFileParser.parameters(githubWorkflow));
        // builder.beginStage()
        // this.stages(githubWorkflow);
        return builder.pipeline;
    }

    // job = stagge
/*
    private stages(githubWorkflow: GithubWorkflow): Stage[] {
        let stages: Stage[] = [];
        for (let jobKey in githubWorkflow.jobs) {
            let job: NormalJob = <NormalJob>githubWorkflow.jobs[jobKey];
            let steps: Step[] = [];
            if (job.steps) {
                for (let stepKey in job.steps) {
                    let githubStep = job.steps[stepKey];
                    let pipelineStep = new Step({
                        label: githubStep.name,
                        command: githubStep.run ? githubStep.run : githubStep.uses
                    });
                    steps.push(pipelineStep);
                }
            }

            let stage = new Stage({
                name: jobKey,
                agent: {
                    name: job['runs-on'].toString()
                },
                steps: steps
            });
            // pipeline.stages.push(stage);
        }
        return stages
    }
*/

    private triggers(githubWorkflow: GithubWorkflow): string[] {
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

    private static environment(githubWorkflow: GithubWorkflow): IEnvironmentVariable[] {
        if (!githubWorkflow.env) {
            return [];
        }

        let pipelineEnvironment: IEnvironmentVariable[] = [];
        let env = githubWorkflow.env;
        if (typeof env === "string") {
            pipelineEnvironment.push(new EnvironmentVariable(EnvironmentalVariableNameMarker.EXTERNAL_ENVIRONMENT, env));
        } else if (typeof env === "object"){
            for (let envKey in env) {
                pipelineEnvironment.push(new EnvironmentVariable(envKey, env[envKey].toString()))
            }
        }
        return pipelineEnvironment;
    }

    private static parameters(githubWorkflow: GithubWorkflow): string[] {
        if (!githubWorkflow.defaults || !githubWorkflow.defaults.run) {
            return [];
        }

        let params: string[] = [];
        let run = githubWorkflow.defaults.run;
        for (let runKey in run) {
            // @ts-ignore
            params.push(toKeyValueString(runKey, run[runKey].toString()))
        }
        return params;
    }
}