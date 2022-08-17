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
let results:any[] = generator.run(pipeline)
//let jenkinsYaml = YAML.stringify(readFile)

//var readFileWithoutQuotes= readFile.replace(/[\n]+/g, '\\')

let resultString: string = JSON.stringify(results[0], null, " ");

console.log("-----------------")
console.log(resultString)
console.log("-----------------")
fs.writeFileSync("testJ2GHAfile.json", resultString)

//TODO YAML Erstellung in eigene Builder Methode auslagern
fs.writeFileSync("testJ2GHAfile.yaml", YAML.stringify(results[0]).replace(/["]+/g, ' '))
let validationResult = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testJ2GHAfile.json")

if (validationResult != true)
    {

        //TODO validator output mitreinschreiben
        console.log("-----------------")
        console.log("Create comment file")
        console.log("-----------------")
        fs.writeFileSync("testJ2GHAfile.json.txt", results[1] + "\n\n The following are the errors from the failed validation: \n\n" + JSON.stringify(validationResult.errors, null, " "))
    }

else{
    console.log("-----------------")
    console.log("No comment file is created because the validation was successfull.")
    console.log("-----------------")
}
