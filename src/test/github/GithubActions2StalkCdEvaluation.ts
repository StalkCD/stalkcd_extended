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
        let total: Map<string, number> | undefined = evaluation.get("total");
        console.log(evaluation)
        console.log(total)
        let map: Map<number, Array<Map<string, number>>> = this.amountOfErrors(evaluation);
        for (let mapElement of map) {
            console.log(`Error amount ${mapElement[0]}: ${mapElement[1].length}`)
        }
        // console.log(map.get(1))
        let reducedErrors: Map<string, Map<string, number>> = this.reduceEvaluation(evaluation, this.getAmountPredicate(1));
        console.log(reducedErrors.size)
        console.log("Total files analysed: " + files.length)
    }

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

    private static amountOfErrors(evaluation: Map<string, Map<string, number>>): Map<number, Array<Map<string, number>>> {
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
                let array: Array<Map<string,number>> = [];
                array.push(evaluationElement[1])
                numberOfErrorsMap.set(amountOfErrors, array);
            }
        }
        return numberOfErrorsMap;
    }

    private static reduceEvaluation(evaluation: Map<string, Map<string, number>>, predicate: Function): Map<string, Map<string, number>> {
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
}