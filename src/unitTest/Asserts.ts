import {separateKeyValue} from "../main/util";

export function assert(actual: any, expected: any) {
    if (expected === actual) {
        return;
    } else {
        throw new AssertionError("Expected " + expected + "\nActual: " + actual);
    }
}

export class AssertionError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function assertThrows(run: Function, checkError: Function) {
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

export function assertArray(value: any[], predicate: Function) {
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

export function assertStringKeyValueArray(myArrayValue: any[], key: string, value: string) {
    assertArray(myArrayValue, (p:string) => {
        let keyValue = separateKeyValue(p);
        return keyValue[0] === key && keyValue[1] === value
    })
}

export function assertDefined(value: any | undefined) {
    if (value === undefined) {
        throw new AssertionError("Value was undefined");
    }
}