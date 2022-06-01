import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../main/model/pipeline/Pipeline";

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

function assert(expected: any, actual: any) {
    if (expected === actual) {
        return;
    } else {
        throw new AssertionError("Expected " + expected + "\nActual: " + actual);
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

function assertNotUndefined(value: any) {
    if (value === undefined) {
        throw new AssertionError("Value was undefined");
    }
}

function testEnvironment() {
    let pipeline = parseData("environment.yml");
    assertNotUndefined(pipeline.environment)
    // @ts-ignore
    assert(3, pipeline.environment.length)
    // @ts-ignore
    assertArray(pipeline.environment, v => v.name === "my-var" && v.value === "test")
    // @ts-ignore
    assertArray(pipeline.environment, v => v.name === "my-number" && v.value === "0")
    // @ts-ignore
    assertArray(pipeline.environment, v => v.name === "my-boolean" && v.value === "true")
}


testEnvironment()


