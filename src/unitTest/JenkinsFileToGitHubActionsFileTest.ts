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
const readFile = fs.readFileSync("testRes/jenkinsToGHA/teknofile_maven-test.Jenkinsfile").toString()
const pipeline = parser.parse(readFile);

//generate GHA file from pipeline
let generator: GitHubWorkflowGeneratorFromJenkinsPipeline = new GitHubWorkflowGeneratorFromJenkinsPipeline();
let result = generator.run(pipeline)
//let jenkinsYaml = YAML.stringify(readFile)

//var readFileWithoutQuotes= readFile.replace(/[\n]+/g, '\\')
result.originalJenkinsfile = readFile

let resultString: string = JSON.stringify(result);

console.log("-----------------")
console.log(resultString)
console.log("-----------------")
fs.writeFileSync("testJ2GHAfile.json", resultString)
fs.writeFileSync("testJ2GHAfile.yaml", YAML.stringify(result).replace(/["]+/g, ' '))
new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testJ2GHAfile.json")
