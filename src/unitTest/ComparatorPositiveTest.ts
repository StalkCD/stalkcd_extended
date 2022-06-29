import {Comparator, FailedComparisonReason} from "../main/Comparator";

let comparator: Comparator = new Comparator();

let actual: object = {key: "myValue", list: [1,2,3], myNumber: 5, myBoolean: true, myBoolean2: false, myObject: {key: "myValue", list: [1,2,3], myNumber: 5, myBoolean: true, myBoolean2: false}};
let expected: object = {myString: "myValue", list: [1,2,3], myNumber: 5, myBoolean: true, myBoolean2: false, myObject: {key: "myValue", list: [1,2,3], myNumber: 5, myBoolean: true, myBoolean2: false}};
comparator.compareObjects(expected, actual)

if (!errorLength(fullErrorMap(), comparator.errors)) {
    console.log("errors are not as expected");
} else {
    console.log("success")
}

function errorLength(expected: Map<string, number>, errors: Map<string, string[]>) {
    for (let expectedKey in expected) {
        // @ts-ignore
        let expectedAmount: number = expected.get(expectedKey);
        // @ts-ignore
        let actualAmount : number = errors.get(expectedKey).length
        if (expectedAmount !== actualAmount) {
            return false;
        }
    }
    return true;
}

function fullErrorMap(): Map<string, number> {
    let map = new Map<string, number>();
    for (let reason in FailedComparisonReason) {
        map.set(reason, 0);
    }
    return map;
}