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
        allParsed: "GHAEval.parseFiles(true, false, GHAEval.getFiles())",
        experimentalConversion: false,
        restrictExperimentalConversionTo: []
    }

    private parseMenu: { [index: string]: any } = {
        parse: function (state: { [index: string]: any }) {
            let restrictExperimentalConversionTo = state.experimentalConversion ? state.restrictExperimentalConversionTo : undefined;
            let allParsed = GHAEval.parseFiles(true, state.filesToParse, restrictExperimentalConversionTo);
            state.allParsed = allParsed
            console.log(">> state.experimentalConversion = " + state.experimentalConversion)
            console.log(">> state.restrictExperimentalConversionTo = " + state.restrictExperimentalConversionTo)
            console.log(">> state.filesToParse = " + state.filesToParse.length)
            console.log(">> parsed Files: " + (allParsed.evaluation.size - 1))
            console.log()
        },
        setExperimentalConversion: function (state: { [index: string]: any }) {
            let selected = readLine.keyInSelect(["on", "off"], "experimentalConversion on or off?",);
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
            if (typeof state.allParsed == 'string') {
                console.log("Please run a parse-command first.")
                return
            }
            let allEvaluation = state.allParsed.evaluation;
            let map = GHAEval.amountOfErrorsInObject(allEvaluation);
            console.log("Total errors")
            for (let mapElement of map) {
                console.log(`Error amount ${mapElement[0]}: ${mapElement[1].length}`)
            }

            let amountOfErrorsPerObject = readLine.questionInt("How many Errors?\n");
            let reducedEvaluation = GHAEval.reduceEvaluationMap(allEvaluation, GHAEval.getAmountPredicate(amountOfErrorsPerObject));

            // print evaluation
            console.log("------------------")
            let reducedResults: Map<string, Map<string, number>> = GHAEval.reduceEvaluationMap(reducedEvaluation, GHAEval.getAmountPredicate(amountOfErrorsPerObject));
            console.log("Found objects with " + amountOfErrorsPerObject + " error: " + reducedResults.size)
            console.log("------------------")
            console.log("Total error-types counted:")
            let totalErrorCount = GHAEval.countTotalError(reducedResults);
            totalErrorCount.forEach((value, key) => {
                if (value > 0) {
                    console.log(key + ": " + value)
                }
            })
            console.log("------------------")

            // save reduced files in state
            let filteredFiles: string[] = []
            reducedResults.forEach((_, filename) => filteredFiles.push(filename))
            state.filteredFiles = filteredFiles;
        }
    }

    run() {
        let items = Object.keys(this.parseMenu);
        while (true) {
            let commandToExecute = readLine.keyInSelect(items, "\n");
            if (commandToExecute === -1) {
                break
            }
            this.parseMenu[items[commandToExecute]](this.state)
        }
    }
}

new GithubActionsEvaluationCLI().run()