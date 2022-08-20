import * as fs from 'fs';
import { StalkCdParser } from './io/StalkCdParser';
import { BpmnParser } from './io/BpmnParser';
import { StalkCdWriter } from './io/StalkCdWriter';
import { JenkinsfileWriter } from './io/jenkinsfile/jenkinsfile-writer';
import { BpmnWriter } from './io/BpmnWriter';
import { JenkinsfileParser } from './io/jenkinsfile/jenkinsfile-parser';
import { JenkinsfileCollector } from '../test/JenkinsfileCollector';
import { TestUtils } from '../test/TestUtils';
import { GitHubWorkflowGeneratorFromJenkinsPipeline} from "./model/GitHubActions/GitHubWorkflowGeneratorFromJenkinsPipeline";
import * as YAML from "json-to-pretty-yaml";
import {JsonSchemaValidator} from "./JsonSchemaValidator";
import {GithubActionsFileParser} from "./model/GitHubActions/GithubActionsFileParser";

export interface FileGeneratorConfig {

    source: string;
    target: string;

}

export interface BpmnParserConfig extends FileGeneratorConfig {

}

export interface BpmnGeneratorConfig extends FileGeneratorConfig {

}

export interface JenkinsfileGeneratorConfig extends FileGeneratorConfig {

}

export interface JenkinsfileParserConfig extends FileGeneratorConfig {

}

export class Runner {
    /**
     * Checks the configuration for validity
     * @param config The configuration to check
     */
    assertFilePrerequisites(config: FileGeneratorConfig) {
        if (!config.source) {
            throw new Error('A source file has to be specified');
        }
        if (!config.target) {
            throw new Error('A target file has to be specified');
        }

        if (!fs.existsSync(config.source)) {
            throw new Error(`The source file '${config.source}' does not exist.`);
        }
    }

    /**
     * Transforms a BPMN model into a StalkCd file
     * @param config The configuration
     */
    async bpmn2stalkCd(config: BpmnParserConfig) {
        this.assertFilePrerequisites(config);

        const res = await new BpmnParser().parse(fs.readFileSync(config.source).toString());

        fs.writeFileSync(config.target, await new StalkCdWriter().write(res));
    }

    /**
     * Transforms the deployment process specification into a BPMN model
     * @param config The configuration
     */
    async stalkCd2bpmn(config: BpmnGeneratorConfig) {
        this.assertFilePrerequisites(config);

        const model = await new StalkCdParser().load(config.source);
        fs.writeFileSync(config.target, await new BpmnWriter().write(model));
    }

    /**
     * Transforms the deployment process specification into a Jenkinsfile
     * @param config The configuration
     */
    async stalkCd2jenkinsfile(config: JenkinsfileGeneratorConfig) {
        this.assertFilePrerequisites(config);

        const model = await new StalkCdParser().load(config.source);

        fs.writeFileSync(config.target, await new JenkinsfileWriter().write(model));
    }

    /**
     * Transforms a BPMN model directly into a Jenkinsfile
     * @param config The configuration
     */
    async bpmn2jenkins(config: JenkinsfileGeneratorConfig) {
        this.assertFilePrerequisites(config);

        const model = await new BpmnParser().parse(fs.readFileSync(config.source).toString());

        fs.writeFileSync(config.target, await new JenkinsfileWriter().write(model));
    }

    /**
     * Transform a Jenkinsfile into a StalkCd file
     * @param config The configuration
     */
    async jenkinsfile2stalkCd(config: JenkinsfileParserConfig) {
        this.assertFilePrerequisites(config);

        const parser = new JenkinsfileParser();
        const pipeline = parser.parse(fs.readFileSync(config.source).toString());
        fs.writeFileSync(config.target, await new StalkCdWriter().write(pipeline));
    }

    /**
     * Normalizes a Jenkinsfile
     * @param config The configuration
     */
    async normalizeJenkinsfile(config: JenkinsfileParserConfig) {
        this.assertFilePrerequisites(config);

        const content = fs.readFileSync(config.source).toString();
        const normalized = TestUtils.normalizeJenkinsfile(content);
        fs.writeFileSync(config.target, normalized);
    }

    /**
     * Transform a Jenkinsfile into a GitHubActions file
     * @param config The configuration
     */
    async jenkinsfile2ghaFile(config: JenkinsfileParserConfig, singleFileTransformation: Boolean) {

        this.assertFilePrerequisites(config);

        const parser = new JenkinsfileParser();
        const readSourceFile = fs.readFileSync(config.source).toString()
        const pipeline = parser.parse(readSourceFile);

        //generate GHA file from pipeline
        let generator: GitHubWorkflowGeneratorFromJenkinsPipeline = new GitHubWorkflowGeneratorFromJenkinsPipeline();
        //first entry of the returned result is the actual generated GHA file, second are generated comments
        let results:any[]  = generator.run(pipeline)

        //create GHAfile in JSON, creation of json is necessary for the validation of a generated GHA file
        if(!singleFileTransformation){
            fs.writeFileSync(config.target, JSON.stringify(results[0]));
        }

        //if the conversion is done with the evaluation, the following steps are not needed (validation is done in other class, no yaml needed)
        if (singleFileTransformation) {
            //create GHAfile in JSON, creation of json is necessary for the validation of a generated GHA file, .json needs to appended because with single file the target is configured to be yaml file
            fs.writeFileSync(config.target + ".json", JSON.stringify(results[0]));
            console.log("Created GHA-Json file: " + config.target + ".json")
            //create GHAfile in YAML, which is the target format of GHA files
            fs.writeFileSync(config.target, YAML.stringify(results[0]).replace(/["]+/g, ' '))
            console.log("Created GHA-YAML file: " + config.target)

            //validate
            let validationResult = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate(config.target + ".json")

            if (validationResult != true) {
                fs.writeFileSync(config.target + ".txt", results[1] + "\n\n The following are the errors from the failed validation: \n\n" + JSON.stringify(validationResult.errors, null, " "))
                console.log("Created comment file with validation error results: " + config.target + ".txt")

            } else {
                fs.writeFileSync(config.target + ".txt", results[1])
                console.log("Created comment file, the validation was successfull:" + config.target + ".txt")
            }
            //
        }


    }
}
