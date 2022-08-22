import {Comparator} from "../main/Comparator";
import {GithubActions2StalkCdEvaluation as GHAEval} from "../test/github/GithubActions2StalkCdEvaluation";

let actualFull: object = {
    myString: "myValue",
    list: [1, 2, 3],
    myNumber: 5,
    myBoolean: true,
    myBoolean2: false,
    myObject: {key: "myValue", list: [1, 2, 3], myNumber: 5, myBoolean: true, myBoolean2: false}
};
let expectedFull: object = {
    myString: "myValue",
    list: [1, 2, 3],
    myNumber: 5,
    myBoolean: true,
    myBoolean2: false,
    myObject: {key: "myValue", list: [1, 2, 3], myNumber: 5, myBoolean: true, myBoolean2: false}
};

function doPositiveComparison(expected: object, actual: object, specialCasesCallback?: (context: any[], expectedElement: any, actualElement: any) => boolean) {
    let map: Map<string, string[]> = Comparator.compareObjects(expected, actual, specialCasesCallback);
    let errors: string[] = errorsDetected(map);
    if (errors.length > 0) {
        console.log(map)
        console.log(errors);
        console.log("errors are not as expected");
    } else {
        console.log("success")
    }
}

function doNegativeComparison(expectedErros: string[], expected: object, actual: object, specialCasesCallback?: (context: any[], expectedElement: any, actualElement: any) => boolean) {
    let map: Map<string, string[]> = Comparator.compareObjects(expected, actual, specialCasesCallback);
    let actualErrors: string[] = errorsDetected(map);


    if (!areErrorsSame(expectedErros, actualErrors)) {
        console.log(map)
        console.log("errors are not as expected");
    } else {
        console.log("success");
    }
}

function areErrorsSame(expectedErros: string[], actual: string[]): Boolean {
    for (let i = 0; i < expectedErros.length; i++) {
        let expectedValue: string = expectedErros[i];
        let actualContainsValue: boolean = false;
        for (let j = 0; j < actual.length; j++) {
            let actualValue = actual[j];
            if (actualValue === expectedValue) {
                actualContainsValue = true;
                break;
            }
        }
        if (!actualContainsValue) {
            return false;
        }
    }
    return true;
}


function errorsDetected(errors: Map<string, string[]>): string[] {
    let errorList: string[] = []
    errors.forEach((value, _) => {
        if (value) {
            value.forEach(s => errorList.push(s));
        }
    })
    for (let key in errors) {
    }
    return errorList;
}


// Standard functionality
doPositiveComparison(expectedFull, actualFull)
doPositiveComparison({list: [{myVal: "val"}, {myVal: "val"}]}, {list: [{myVal: "val"}, {myVal: "val"}]})
doNegativeComparison(['obj[1]'], [{myVal: "val"}, {myVal: "val"}], [{myVal: "val"}, {myVal: "val", mySecondVal: "val"}])
doNegativeComparison(['obj[wrongValue] = that --> actual = this'], {wrongValue: "that"}, {wrongValue: "this"})
doNegativeComparison(['obj[wrongKey] type: string --> actual: undefined'], {wrongKey: "that"}, {reallyWronKey: "that"})
doNegativeComparison(['obj[myBoolean] = true --> actual = false'], {myBoolean: true}, {myBoolean: false})
doNegativeComparison(['obj[myNumber] = 1 --> actual = 5'], {myNumber: 1}, {myNumber: 5})
doNegativeComparison(['obj[myObject][1] type: string --> actual: undefined'], {myObject: {1: "val"}}, {myObject: ["val"]})
doNegativeComparison(['obj[myObject][1] type: string --> actual: undefined'], {myObject: {1: "val"}}, {myObject: ["val"]})


// Cases with callback
doPositiveComparison({on: ["myOnlyElement"]}, {on: "myOnlyElement"}, GHAEval.specialCaseEqualityOn)
doPositiveComparison({needs: "myOnlyElement"}, {needs: ["myOnlyElement"]}, GHAEval.specialCaseEqualityNeeds)
doNegativeComparison([ 'obj[on] type: string --> actual: object' ], {on: "myOnlyElement"}, {on: ["myOnlyElement"]}, GHAEval.specialCaseEqualityOn)
doNegativeComparison([ 'obj[on] type: string --> actual: object' ], {on: "myOnlyElement"}, {on: ["myOnlyElement", "secondElement"]}, GHAEval.specialCaseEqualityOn)