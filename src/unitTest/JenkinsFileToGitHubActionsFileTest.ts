import {JenkinsfileParser} from "../main/io/jenkinsfile/jenkinsfile-parser";
import * as fs from 'fs';
import {GithubWorkflowGenerator} from "../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {StalkCdWriter} from "../main/io/StalkCdWriter";
import * as yaml from "js-yaml";
import * as YAML from "json-to-pretty-yaml";
import {
    GitHubWorkflowGeneratorFromJenkinsPipeline
} from "../main/model/GitHubActions/GitHubWorkflowGeneratorFromJenkinsPipeline";

//parse jenkinsfile to pipeline
const parser = new JenkinsfileParser();
const pipeline = parser.parse(fs.readFileSync("testRes/jenkinsToGHA/teknofile_maven-test.Jenkinsfile").toString());

//generate GHA file from pipeline
let generator: GitHubWorkflowGeneratorFromJenkinsPipeline = new GitHubWorkflowGeneratorFromJenkinsPipeline();
let result = generator.run(pipeline)
let resultString: string = JSON.stringify(result);
console.log("-----------------")
console.log(resultString)
console.log("-----------------")
fs.writeFileSync("testJ2GHAfile.json", resultString)
fs.writeFileSync("testJ2GHAfile.yaml", YAML.stringify(result))
new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testJ2GHAfile.json")
