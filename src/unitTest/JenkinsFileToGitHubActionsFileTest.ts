import {JenkinsfileParser} from "../main/io/jenkinsfile/jenkinsfile-parser";
import * as fs from 'fs';
import {GithubWorkflowGenerator} from "../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";

//parse jenkinsfile to pipeline
const parser = new JenkinsfileParser();
const pipeline = parser.parse(fs.readFileSync("testRes/jenkinsToGHA/Andriantomanga_trocmedoc.Jenkinsfile").toString());

//generate GHA file from pipeline
let generator: GithubWorkflowGenerator = new GithubWorkflowGenerator();
let run: string = JSON.stringify(generator.run(pipeline));
console.log("-----------------")
console.log(run)
console.log("-----------------")
fs.writeFileSync("testJ2GHAfile.json", run)

new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testJ2GHAfile.json")
