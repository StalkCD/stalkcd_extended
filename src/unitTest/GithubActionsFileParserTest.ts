import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";
import {EnvironmentVariable} from "../main/model/pipeline/EnvironmentSection";
import {ParsingImpossibleError} from "../main/errors/ParsingImpossibleError";
import {assert, assertArray, assertDefined, assertThrows} from "./Asserts";
import {separateKeyValue} from "../main/util";


function parseData(filename: string): Pipeline {
    return new GithubActionsFileParser().parse("testRes/" + filename);
}

function testEnvironment() {
    let pipeline = parseData("environment.yml");
    assertDefined(pipeline.environment)
    if (pipeline.environment) {
        assert(pipeline.environment.length, 3);
        assertArray(pipeline.environment, (v: EnvironmentVariable) => v.name === "my-var" && v.value === "test")
        assertArray(pipeline.environment, (v: EnvironmentVariable) => v.name === "my-number" && v.value === "0")
        assertArray(pipeline.environment, (v: EnvironmentVariable) => v.name === "my-boolean" && v.value === "true")
    }
}


function testTriggers1() {
    let pipeline = parseData("triggers1.yml");
    assertDefined(pipeline.triggers)
    if (pipeline.triggers) {
        assert(pipeline.triggers.length, 1)
        assert(pipeline.triggers[0], "push")
    }
}

function testTriggers2() {
    let pipeline = parseData("triggers2.yml");
    assertDefined(pipeline.triggers)
    if (pipeline.triggers) {
        assert(pipeline.triggers.length, 2)
        assertArray(pipeline.triggers, (t: string) => t === "push")
        assertArray(pipeline.triggers, (t: string) => t === "release")
    }
}

function testTriggers3() {
    assertThrows(() => parseData("triggers3.yml"), (err:Error) => err as ParsingImpossibleError);
}

function testparameters() {
    let pipeline = parseData("parameters.yml");
    assertDefined(pipeline.parameters);
    if (pipeline.parameters) {
        assert(pipeline.parameters.length, 2);
        assertArray(pipeline.parameters, (p:string) => {
            let keyValue = separateKeyValue(p);
            return keyValue[0] === "shell" && keyValue[1] === "sh";
        });
        assertArray(pipeline.parameters, (p:string) => {
            let keyValue = separateKeyValue(p);
            return keyValue[0] === "working-directory" && keyValue[1] === "mydir";
        });
    }
}

function testThrowsReusableWorkflowCallJob(){
    assertThrows(() => parseData("jobs.ReusableWorkflowCallJob.yml"), (err:Error) => err as ParsingImpossibleError)
}

function testSimpleMainRun() {
    console.log(parseData("main.yml"));
}


testEnvironment()
testTriggers1()
testTriggers2()
testTriggers3()
testparameters()
testThrowsReusableWorkflowCallJob()
testSimpleMainRun()
console.log("successfully tested")


