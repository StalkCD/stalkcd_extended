import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";
import {GithubWorkflowGenerator} from "../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import * as fs from "fs";
import {Comparator} from "../main/Comparator";
import {GithubActions2StalkCdEvaluation} from "../test/github/GithubActions2StalkCdEvaluation";
import {AssertionError} from "./Asserts";

const githubActionsFileParser = new GithubActionsFileParser(false, []);

const ROUNDTRIP_TEST_FOLDER: string | Buffer | URL = "testRes/GithubRoundtrip/";

export function parseData(filename: string): Pipeline  {
    // @ts-ignore
    return githubActionsFileParser.parse(ROUNDTRIP_TEST_FOLDER + filename);
}

function roundtripTest(filename: string ): void {
    let expected = GithubActions2StalkCdEvaluation.loadFile(ROUNDTRIP_TEST_FOLDER + filename);

    let pipeline: Pipeline = parseData(filename);

    let generator: GithubWorkflowGenerator = new GithubWorkflowGenerator(true);
    let actual = generator.run(pipeline);
    let jsonResultString: string = JSON.stringify(actual);
    console.log("-----------------")
    console.log(jsonResultString)
    console.log("-----------------")
    fs.writeFileSync("testfile.json", jsonResultString)

    try {
        new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH).validate("testfile.json");
    } catch (err) {
        console.log("--> schema validation failed " + filename )
        throw err
    }

    let map = Comparator.compareObjects(expected, actual);
    if (map.size > 0) {
        console.log(map)
        console.log("--> deep comparison failed: " + filename);
        throw new AssertionError("--> deep comparison failed: " + filename + "\n" + map);
    } else {
        console.log("tested successfully: " + filename);
    }
}

roundtripTest("main.yml");
roundtripTest("WopsS_RED4ext.SDK.build.yml");
roundtripTest("actions-cool_issue-vote.test-all.yml");
// roundtripTest("active-group_reacl-c-testing.tests.yml"); // TODO: obj[on]
roundtripTest("finfet_kestrel.release.yml");
roundtripTest("hashed-io_hashed-luhn-ui.gh-pages.yml");
