import {GithubWorkflowGenerator} from "./GitHubWorkflowGenerator";
import {WorkflowBuilder} from "./GithubWorkflowBuilder";
import {IPipeline, Pipeline} from "../pipeline/Pipeline";
import {EnvironmentVariable} from "../pipeline/EnvironmentSection";
import {IStage} from "../pipeline/Stage";
import {IAgentOption} from "../pipeline/AgentSection";
import {separateKeyValue} from "../../util";
import {IPostSection} from "../pipeline/PostSection";
import {IStep} from "../pipeline/Step";
// import * as YAML from "json-to-pretty-yaml";
const YAML = require('json-to-pretty-yaml');
import {WorkflowGenerator} from "./WorkflowGenerator";

export class GitHubWorkflowGeneratorFromJenkinsPipeline implements WorkflowGenerator{

    protected builder: WorkflowBuilder;

    constructor() {
        this.builder = new WorkflowBuilder();
    }

    run(pipeline: Pipeline) {
        this.doPipeline(pipeline);
        let stages = pipeline.stages;
        for (let stage of stages) {
            this.doStageWPipeline(stage, pipeline);
            let steps = stage.steps;
            if (steps !== undefined) {
                for (let step of steps) {
                    this.doStep(step);
                }
            }
            this.builder.currentJob().end()
        }

        return [this.builder.build(), this.builder.buildComments()];

    }


    protected doPipeline(pipeline: IPipeline) {
        let triggers
        if (pipeline.triggers == undefined)
        {
            //triggers = undefined

            //If there is no trigger provided by the input jenkins file set up a default value (push), which should be the case, since jenkins file triggers are defined outside of the jenkinsfile.
            triggers = ["push"];
            this.builder.appendToComments("Please review. Since there was no trigger provided by the jenkins file, we set [push] as a default trigger ('on:'). ")
        }
        else
        {
            triggers = pipeline.triggers;
        }

        let name: string[] = pipeline.definitions ? pipeline.definitions : [];

        this.builder
            .on(triggers)
            .name(name[0])


        //TODO Add mapping for jenkinsfile options to GHA, see https://www.jenkins.io/doc/book/pipeline/syntax/#options
        //Options for jobs in a pipeline are not parsed with StalkCD yet, so there is no corresponding implementation for workflow options
        let options: string[] | undefined = pipeline.options;
        if (options) {
            this.builder.appendToComments("The following options could not be mapped to GitHub Actions:" + options)
        }

        let env: EnvironmentVariable[] | undefined = pipeline.environment;
        if (env) {
            env.forEach(e => this.builder.env(e.name, e.value))
        }

        let post: IPostSection | undefined = pipeline.post;
        if (post) {
            this.doPostSection(post, false);
        }
    }


    protected doStageWPipeline (stage: IStage, pipeline: IPipeline): void {
        let id: string | undefined = stage.name;

        //in jenkinsfiles a name for stages is also mandatory
        if (id === undefined) {
            throw new Error("name of Stage is required.")
        }

        //spaces are not allowed in GHA Job identifiers
        id = id.replace(/\s+/g, '_');

        this.builder.job(id);
        let agent = stage.agent;

        //agents in Jenkinsfiles can be defined on pipeline level (mandatory) and on stage level(optional)
        //if there is no agent defined on stage level, take the agent defined on pipeline level for the current job
        if (agent) {
            agent.forEach(keyValue => this.doAgent(keyValue, id))
        }
        else{
            agent = pipeline.agent
            if (agent) {
                agent.forEach(keyValue => this.doAgent(keyValue, id))
            }
            else{   //Jenkinsfiles without Agent are invalid because Agent is mandatory in jenkins
                throw new Error("There was no Agent declared in the Jenkinsfile. ")
            }

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
                this.builder.currentJob().env(environmentVariable.name, environmentVariable.value);
            }
        }


        let post: IPostSection | undefined = stage.post
        if (post) {
            this.doPostSection(post, true, id)
        }


    }


    protected doAgent(keyValue: IAgentOption, stageId?: string) {

        if (keyValue.name === "any" || keyValue.name === undefined) {
            this.builder.currentJob().runsOn("ubuntu-latest")
            //this.builder.currentJob().runsOn(keyValue.name)
            this.builder.appendToComments("Please review. In stage " + stageId +" as the jenkinsfile agent was '" + JSON.stringify(keyValue)+ "' we set a default value ('ubuntu-latest') for 'runs-on.'")
        }

        else{
            this.builder.currentJob().runsOn(keyValue.name)
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


    protected doPostSection(postSection: IPostSection, postOnJobLayer : Boolean, jobId?:string) {

        var postString = ""
        Object.entries(postSection).forEach(prop => {
            if (prop[1].length > 0 && prop[0] != "propertiesOrder") {
                if (postOnJobLayer == false)
                {
                    postString = "The following steps were part of the post section in the jenkinsfile. Please transform these to steps with the corresponding GHA condition: "
                    postString = postString + JSON.stringify(prop)
                    this.builder.appendToComments(postString)}

                else if (postOnJobLayer == true)
                {
                    postString = "The following steps were part of the post section in the job" + jobId + ". Please transform these to steps with the corresponding GHA condition: "
                    postString = postString + JSON.stringify(prop)
                    this.builder.appendToComments("" + postString)}
            }
        })

    }


    protected getShell(command: string | undefined): string | undefined {
        let split: any = command?.split(" ");
        if(split[0] == "bash" || split[0] == "pwsh" || split[0] == "python" || split[0] == "sh" || split[0] == "cmd" || split[0] == "powershell"){
            return split[0]
        }
        else {
            return undefined;
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
            let shell: string | undefined = this.getShell(command);
            if (shell != undefined) {
                return command.replace(shell + " ", "");
            }
            else {
                return command
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