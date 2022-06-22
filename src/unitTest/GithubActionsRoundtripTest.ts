import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";
import {GithubWorkflowGenerator} from "../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import * as fs from "fs";

const githubActionsFileParser = new GithubActionsFileParser(false);

export function parseData(filename: string): Pipeline {
    return githubActionsFileParser.parse("testRes/GithubRoundtrip/" + filename);
}

let pipeline: Pipeline = parseData("main.yml");

let generator: GithubWorkflowGenerator = new GithubWorkflowGenerator();
let run: string = JSON.stringify(generator.run(pipeline));
console.log("-----------------")
console.log(run)
console.log("-----------------")
fs.writeFileSync("testfile.json", run)

new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testfile.json")