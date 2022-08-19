import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";
import {GithubWorkflowGenerator} from "../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import * as fs from "fs";
import {Comparator} from "../main/Comparator";
import * as yaml from "js-yaml";
import {GithubWorkflow} from "../main/model/GitHubActions/GeneratedTypes";

const githubActionsFileParser = new GithubActionsFileParser(false);

export function parseData(filename: string): Pipeline  {
    // @ts-ignore
    return githubActionsFileParser.parse("testRes/GithubRoundtrip/" + filename);
}

let expected = <GithubWorkflow>yaml.load(fs.readFileSync("testRes/GithubRoundtrip/main.yml", {encoding: 'utf8'}));

let pipeline: Pipeline = parseData("main.yml");

let generator: GithubWorkflowGenerator = new GithubWorkflowGenerator(true);
let actual = generator.run(pipeline);
let jsonResultString: string = JSON.stringify(actual);
console.log("-----------------")
console.log(jsonResultString)
console.log("-----------------")
fs.writeFileSync("testfile.json", jsonResultString)

new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testfile.json")
let map = Comparator.compareObjects(expected,actual);
if (map.size > 0) {
    console.log(map)
    console.log("test failed");
} else {
    console.log("tested successfully");
}
