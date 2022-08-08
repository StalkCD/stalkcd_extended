import * as fs from "fs";
import {PathLike} from "fs";
import {GithubActionsFileParser} from "../../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../../main/model/pipeline/Pipeline";

export class GithubActions2StalkCdEvaluation {

    private static readonly _sourcePath: PathLike = "res/GithubActions.source";

    public static evaluate() {
        let files: string[] = this.getFiles();
        let parser: GithubActionsFileParser = new GithubActionsFileParser(true);
        let pipelines: (Pipeline | undefined)[] = files.map(f => parser.parse(f));
        let evaluation: Map<string, Map<string, number>> = parser.evaluation;
        let amountOfErrors: Map<number, Array<Map<string, number>>> = this.amountOfErrorsInObject(evaluation);
        for (let mapElement of amountOfErrors) {
            console.log(`Error amount ${mapElement[0]}: ${mapElement[1].length}`)
        }
        // console.log(map.get(1))
        let reducedErrors: Map<string, Map<string, number>> = this.reduceEvaluationMap(evaluation, this.getAmountPredicate(1));
        console.log(reducedErrors.size)
        let map = this.amountOfErrorsInObject(reducedErrors);
        for (let mapElement of map) {
            console.log(`Error amount ${mapElement[0]}: ${mapElement[1].length}`)
        }
        this.countTotalError(reducedErrors)
        console.log(this.countTotalError(reducedErrors))
        console.log("Total files analysed: " + files.length)
    }

    /**
     * Simple predicate function for the "reduceEvaluationMap" function.
     * @param amount the amount of errors expected to be held by the
     * @private
     */
    private static getAmountPredicate(amount: number): (e: Map<string, number>) => boolean {
        return (e: Map<string, number>) => {
            let amountOfErrors: number = 0;
            for (let errorElement of e) {
                if (errorElement[1] > 0) {
                    amountOfErrors++;
                }
            }
            return amountOfErrors === amount;
        };
    }

    private static getFiles(): string[] {
        return fs.readdirSync(this._sourcePath).map(fileName => this._sourcePath + "/" + fileName);
    }

    /**
     * Counts the errors an individual file has.
     * e.g. if an file has 2 errors it is added to the key with 2.
     * @param evaluation
     * @private
     */
    private static amountOfErrorsInObject(evaluation: Map<string, Map<string, number>>): Map<number, Array<Map<string, number>>> {
        let numberOfErrorsMap: Map<number, Array<Map<string, number>>> = new Map();

        // fill Map
        for (let i = 0; i < 10; i++) {
            numberOfErrorsMap.set(i, []);
        }

        for (let evaluationElement of evaluation) {
            if (evaluationElement[0] === "total") {
                continue
            }

            let amountOfErrors: number = 0;
            for (let errorElement of evaluationElement[1]) {
                if (errorElement[1] > 0) {
                    amountOfErrors++;
                }
            }

            let errors: Array<Map<string, number>> | undefined = numberOfErrorsMap.get(amountOfErrors);
            if (errors) {
                errors.push(evaluationElement[1])
            } else {
                let array: Array<Map<string, number>> = [];
                array.push(evaluationElement[1])
                numberOfErrorsMap.set(amountOfErrors, array);
            }
        }
        return numberOfErrorsMap;
    }

    /**
     * This Function accepts the Error map (originally intended for Github-Actions evaluation result).
     * Returned is the same type of map which is provided.
     * The key "total" as Filename is ignored.
     * @param evaluation the map of <Filename <ErrorName, Amount>> which is to be filtered
     * @param predicate the predicate which chooses the objects. If true object is in map.
     * @private
     */
    private static reduceEvaluationMap(evaluation: Map<string, Map<string, number>>, predicate: Function): Map<string, Map<string, number>> {
        let reducedMap: Map<string, Map<string, number>> = new Map();
        for (let evaluationElement of evaluation) {
            if (evaluationElement[0] === "total") {
                continue
            }
            if (predicate(evaluationElement[1])) {
                reducedMap.set(evaluationElement[0], evaluationElement[1])
            }
        }
        return reducedMap;
    }

    /**
     * initializes and error-map and counts the errors which did occur in the given map.
     * @param countMap
     * @private
     */
    private static countTotalError(countMap: Map<string, Map<string, number>>): Map<string, number> {
        let totalMap: Map<string, number> = GithubActionsFileParser.getInitializedErrorMap();

        for (let evaluationElement of countMap) { // run through all elements in given map
            if (evaluationElement[0] === "total") {
                continue
            }
            for (let errorMapElement of evaluationElement[1]) { // run through all errors in a map-element
                let errorName: string = errorMapElement[0];
                let errorAmount: number = errorMapElement[1];
                // @ts-ignore totalMap should always be defined since this should be the contract of the called method for initializing
                let currentTotalAmount: number = totalMap.get(errorName);
                totalMap.set(errorName, currentTotalAmount + errorAmount);
            }
        }

        return totalMap
    }
}