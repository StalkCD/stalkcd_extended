import {GithubWorkflowGenerator} from "./GitHubWorkflowGenerator";
import {WorkflowBuilder} from "./GithubWorkflowBuilder";
import {IPipeline, Pipeline} from "../pipeline/Pipeline";
import {EnvironmentVariable} from "../pipeline/EnvironmentSection";
import {IStage} from "../pipeline/Stage";
import {IAgentOption} from "../pipeline/AgentSection";
import {separateKeyValue} from "../../util";
import {IPostSection} from "../pipeline/PostSection";
import {IStep} from "../pipeline/Step";
import * as YAML from "json-to-pretty-yaml";

export class GitHubWorkflowGeneratorFromJenkinsPipeline extends GithubWorkflowGenerator{

constructor() {
   super()
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

        return this.builder.build();
    }


    protected doPipeline(pipeline: IPipeline) {
        let triggers
        if (pipeline.triggers == undefined)
        {
            triggers = new Array<string>()
        }
        else
        {
            triggers = pipeline.triggers;
        }

        let name: string[] = pipeline.definitions ? pipeline.definitions : [];

        //vielleicht auch noch in eine Error Map schreiben, sodass am Ende in Konsole Uebersicht gegeben werden kann, was alles fehlt im GHA File
        if (triggers.length == 0)
        {
            triggers.push(" # Please add one or multiple trigger events here to get a valid GitHub Actions File.")
        }

        this.builder
            .on(triggers)
            .name(name[0])


        //TODO Add mapping for jenkinsfile options to GHA, see https://www.jenkins.io/doc/book/pipeline/syntax/#options
        //Options for jobs in a pipeline are not parsed with StalkCD yet, so there is no corresponding implementation for workflow options
        let options: string[] | undefined = pipeline.options;
        if (options) {
            this.builder.unknownOptionsObjects(options)
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
        if (agent) {
            agent.forEach(keyValue => this.doAgent(keyValue))
        }
        else{
            agent = pipeline.agent
            if (agent) {
                agent.forEach(keyValue => this.doAgent(keyValue))
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
            this.doPostSection(post, true)
        }


    }


    protected doAgent(keyValue: IAgentOption) {
        if (keyValue.name === "runs-on") {
            this.builder.currentJob().runsOn(keyValue.value)
        }

        else{
            let jobAgent = " # Please replace former jenkins file entry for agent '" + JSON.stringify(keyValue)+ "' with corresponding GHA run environment."
            this.builder.currentJob().runsOn(jobAgent)
        }

    }


    protected doPostSection(postSection: IPostSection, postOnJobLayer : Boolean) {

        var postString = ""
        Object.entries(postSection).forEach(prop => {
            if (prop[1].length > 0 && prop[0] != "propertiesOrder") {
                 postString = postString + JSON.stringify(prop)
            }
        })
        if (postString.length > 0 && postOnJobLayer == false)
        {this.builder.postSection(postString)}
        else if (postString.length > 0 && postOnJobLayer == true)
        {this.builder.currentJob().postSection(postString)}
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



}