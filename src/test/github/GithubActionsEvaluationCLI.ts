import * as readLine from "readline-sync";
import {GithubActions2StalkCdEvaluation as GHAEval} from "./GithubActions2StalkCdEvaluation";
import {GithubActionsFileParser} from "../../main/model/GitHubActions/GithubActionsFileParser";

export class GithubActionsEvaluationCLI {

    constructor() {
    }

    private state: { [index: string]: any } = {
        allFiles: GHAEval.getFiles(),
        filteredFiles: [],
        filesToParse: GHAEval.getFiles(),
        parsed: "GHAEval.parseFiles(true, false, GHAEval.getFiles())",
        experimentalConversion: false,
        restrictExperimentalConversionTo: []
    }

    private menu: { [index: string]: any } = {
        parse: function (state: { [index: string]: any }) {
            let restrictExperimentalConversionTo = state.experimentalConversion ? state.restrictExperimentalConversionTo : undefined;
            let parsed:GithubActionsFileParser = GHAEval.parseFiles(state.filesToParse, true, restrictExperimentalConversionTo);
            state.parsed = parsed
            console.log(">> state.experimentalConversion = " + state.experimentalConversion)
            console.log(">> state.restrictExperimentalConversionTo = [" + state.restrictExperimentalConversionTo + "]")
            console.log(">> state.filesToParse = " + state.filesToParse.length)
            console.log(">> parsed Files: " + (parsed.evaluation.size - 1))
            console.log()
        },
        setExperimentalConversion: function (state: { [index: string]: any }) {
            let selected = readLine.keyInSelect(["on", "off"], "experimentalConversion on or off?\n",);
            state.experimentalConversion = selected == 0
            if (state.experimentalConversion) {
                let noRestrictionMap: string[] = [];
                noRestrictionMap.push("all")
                GithubActionsFileParser.getInitializedErrorMap().forEach((_, key) => noRestrictionMap.push(key));
                while (true) {
                    let select = readLine.keyInSelect(noRestrictionMap);
                    if (select === 0 ||select === -1) {
                        state.restrictExperimentalConversionTo = [];
                        return;
                    } else {
                        state.restrictExperimentalConversionTo.push(noRestrictionMap[select]);
                        if (readLine.keyInSelect(["add more", "return"]) == 0) {
                        } else {
                            return;
                        }
                    }
                }
            }
            console.log(">> state.experimentalConversion = " + state.experimentalConversion);
            console.log()
        },
        setFilesToParse: function (state: { [index: string]: any }) {
            let selected = readLine.keyInSelect(["allFiles (" + state.allFiles.length + ")", "filteredFiles (" + state.filteredFiles.length + ")"], "experimentalConversion on or off?",);
            state.filesToParse = selected == 0 ? state.allFiles : state.filteredFiles;
            console.log(">> state.filesToParse = " + state.filesToParse.length)
            console.log()
        },
        filterByAmountOfErrors: function (state: { [index: string]: any }) {
            if (typeof state.parsed == 'string') {
                console.log("Please run a parse-command first.")
                return
            }
            this.printTotalErrorsPerObject(state)

            let amountOfErrorsPerObject = readLine.questionInt("Filter amount of Errors?\n");
            let allEvaluation = state.parsed.evaluation;
            let reducedResults: Map<string, Map<string, number>> = GHAEval.reduceEvaluationMap(allEvaluation, GHAEval.getAmountPredicate(amountOfErrorsPerObject));

            // print evaluation
            console.log("------------------")
            console.log("Found objects with " + amountOfErrorsPerObject + " error: " + reducedResults.size)
            console.log("------------------")
            console.log("Print cumulated error count")
            this.printCumulatedErrorCount(state, reducedResults)
            console.log("------------------")
            console.log("Print Objects per error")
            this.printObjectsWithErrorType(state, reducedResults)
            console.log("------------------")

            // save reduced files in state
            let filteredFiles: string[] = []
            reducedResults.forEach((_, filename) => filteredFiles.push(filename))
            state.filteredFiles = filteredFiles;
        },
        printTotalErrorsPerObject: function (state: { [index: string]: any }) {
            let allEvaluation = state.parsed.evaluation;
            let map = GHAEval.amountOfErrorsInObject(allEvaluation);
            console.log("Total errors")
            for (let mapElement of map) {
                console.log(`Error amount ${mapElement[0]}: ${mapElement[1].length}`)
            }
        },
        printCumulatedErrorCount: function (state: { [index: string]: any }, providedResults?: Map<string, Map<string, number>>) {
            let results: Map<string, Map<string, number>>;
            if (providedResults) {
                results = providedResults;
            } else {
                results = state.parsed.evaluation
            }
            let totalErrorCount = GHAEval.countErrorsByType(results);
            totalErrorCount.forEach((value, key) => {
                if (value > 0) {
                    console.log(key + ": " + value)
                }
            })
        },
        printObjectsWithErrorType: function (state: { [index: string]: any }, providedResults?: Map<string, Map<string, number>>) {
            let results: Map<string, Map<string, number>>;
            if (providedResults) {
                results = providedResults;
            } else {
                results = state.parsed.evaluation
            }
            let countedObjectsPerErrorType = GHAEval.countObjectsWithErrorType(results);
            console.log("The following shows how many workflows were affected by the known error-types")
            console.log(countedObjectsPerErrorType)
        }
    }

    run() {
        let items = Object.keys(this.menu);
        while (true) {
            let commandToExecute = readLine.keyInSelect(items, "\n");
            if (commandToExecute === -1) { // CANCEL is selected
                break
            }
            this.menu[items[commandToExecute]](this.state)
        }
    }
}

new GithubActionsEvaluationCLI().run()