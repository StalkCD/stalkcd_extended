import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";
import {EnvironmentVariable} from "../main/model/pipeline/EnvironmentSection";
import {ParsingImpossibleError} from "../main/errors/ParsingImpossibleError";

class AssertionError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/*
interface Predicate {
    test(value: any): boolean
}
*/

function parseData(filename: string): Pipeline {
    return new GithubActionsFileParser().parse("testRes/" + filename);
}

function assert(actual: any, expected: any) {
    if (expected === actual) {
        return;
    } else {
        throw new AssertionError("Expected " + expected + "\nActual: " + actual);
    }
}

function assertThrows(run: Function, checkError: Function) {
    let errorThrown = false;
    try {
        run();
    } catch (error) {
        errorThrown = true;
        if (!checkError(error)) {
            throw new AssertionError("Checking the error was not successful.");
        }
    }
    if (!errorThrown) {
        throw new AssertionError("Unexpectedly no error was thrown while running the function.");
    }
}

function assertArray(value: any[], predicate: Function) {
    if (value === undefined) {
        throw new AssertionError("Value was undefined");
    }
    let hasPassed: boolean = false;
    value.forEach(v => {
        if (predicate(v)) {
            hasPassed = true;
        }
    });
    if (!hasPassed) {
        throw new AssertionError("value did not pass the predicate");
    }
}

function assertDefined(value: any) {
    if (value === undefined) {
        throw new AssertionError("Value was undefined");
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


testEnvironment()
testTriggers1()
testTriggers2()
testTriggers3()


