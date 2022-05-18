import {GithubWorkflow, NormalJob, ReusableWorkflowCallJob} from "./GeneratedTypes";
import * as fs from "fs";
import {PathLike} from "fs";
import * as yaml from 'js-yaml';
import {JsonSchemaValidator} from "../../JsonSchemaValidator";
import {Pipeline} from "../pipeline/Pipeline";
import {IStage, Stage} from "../pipeline/Stage";
import {off} from "commander";
import {Step} from "../pipeline/Step";


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
        let pipeline: Pipeline = new Pipeline();
        if (githubWorkflow.name) {
            pipeline.definitions = [];
            pipeline.definitions.push(githubWorkflow.name);
        }
        // TODO: GithubWorkflow.on has an any type and needs to be identified
        if (githubWorkflow.on) {
            pipeline.triggers = [];
            // @ts-ignore
            pipeline.triggers.push(githubWorkflow.on[0]);
        }
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
            // @ts-ignore
            let stage = new Stage({
                name: jobKey,
                agent: {
                    // @ts-ignore
                    name: job['runs-on']
                },
                steps: steps
            });
            pipeline.stages.push(stage);
        }
        return pipeline;
    }
}