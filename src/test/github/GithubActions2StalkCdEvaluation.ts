import * as fs from "fs";
import {PathLike, PathOrFileDescriptor} from "fs";
import {GithubActionsFileParser} from "../../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../../main/model/pipeline/Pipeline";
import {GithubWorkflowGenerator} from "../../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../../main/JsonSchemaValidator";
import {Comparator} from "../../main/Comparator";
import {GithubWorkflow} from "../../main/model/GitHubActions/GeneratedTypes";
import * as yaml from "js-yaml";

export class GithubActions2StalkCdEvaluation {

    private static readonly _sourcePath: PathLike = "res/GithubActions.source";

    public static evaluate() {
        let files: string[] = this.getFiles();
        // parse all
        let parserResult: GithubActionsFileParser = this.parseFiles(files, true, []);
        let zeroErrorResults: Map<string, Map<string, number>> = this.reduceEvaluationMap(parserResult.evaluation, this.getAmountPredicate(0));
        let zeroErrorFiles: string[] = []
        zeroErrorResults.forEach((_, filename) => zeroErrorFiles.push(filename))

        let pipelinesMap: Map<string, Pipeline | undefined> = this.parseFilesToPipeline(zeroErrorFiles, true, []);

        let generatedWorkflows: Map<string, any> = this.generateGithubActionObjects(pipelinesMap);

        // Get evaluation basis
        let workflowsValidityMap: Map<string, boolean> = this.schemaValidation(generatedWorkflows);
        let workflowsComparisonMap: Map<string, Map<string, string[]>> = this.compareDeeply(generatedWorkflows);

        // check if everything has run successfully
        workflowsValidityMap.forEach((value,key) => {
            if (!value) {
                console.log(key + " was unable to be validated after generation.")
            }
        });
        console.log();
        let counter = 0
        workflowsComparisonMap.forEach((value, key) => {
            if (value.size > 0) {
                counter++
                console.log(key + " contains deep comparioson errors.")
                console.log(value)
                console.log()
            }
        })
        console.log("Failed deep comparison for: " + counter)
        console.log("Total Converted: " + workflowsComparisonMap.size)
    }

    /**
     * parse all files in the given list and return the parser.
     * This is done for analysis methods.
     * @param files
     * @param evaluateError
     * @param restrictExperimentalConversionTo
     */
    public static parseFiles(files: string[], evaluateError: boolean, restrictExperimentalConversionTo: string[]): GithubActionsFileParser {
        let parser: GithubActionsFileParser = new GithubActionsFileParser(evaluateError, restrictExperimentalConversionTo);
        files.map(f => parser.parse(f));
        return parser
    }


    public static parseFilesToPipeline(files: string[], evaluateError: boolean, restrictExperimentalConversionTo: string[]): Map<string, Pipeline | undefined> {
        let parser: GithubActionsFileParser = new GithubActionsFileParser(evaluateError, restrictExperimentalConversionTo);
        let pipelineMap: Map<string, Pipeline | undefined> = new Map();
        files.forEach(f => pipelineMap.set(f, parser.parse(f)) );
        return pipelineMap
    }

    /**
     * takes in a pipeline and transforms it to a GithubActionFile
     * @param pipelineMap
     */
    public static generateGithubActionObjects(pipelineMap: Map<string, Pipeline | undefined>) {
        let githubWorkflowGenerator: GithubWorkflowGenerator = new GithubWorkflowGenerator(true);
        let workflowMap: Map<string, any> = new Map();
        for (let element of pipelineMap) {
            if (element[1] === undefined) { // skip undefined entries
                continue
            }
            workflowMap.set(element[0], githubWorkflowGenerator.run(element[1]));
        }
        return workflowMap
    }

    /**
     * validates all entries in the map against the given schema
     * @param workflowMap
     */
    public static schemaValidation(workflowMap: Map<string, any>) {
        let validator: JsonSchemaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH)
        let isSchemaValidMap: Map<string, boolean> = new Map();
        for (let element of workflowMap) {
            let isValid = true
            try {
                validator.validate(element[1]);
            } catch (err) {
                isValid = false
            }
            isSchemaValidMap.set(element[0] , isValid)
        }
        return isSchemaValidMap;
    }

    public static compareDeeply(workflowMap: Map<string, any>) {
        let compareDeeplyMap: Map<string, Map<string, string[]>> = new Map();
        for (let element of workflowMap) {
            let expected: object = this.loadFile(element[0]);
            let actual: object = element[1];
            compareDeeplyMap.set(
                element[0],
                Comparator.compareObjects(expected, actual,
                (c, e, a) => this.specialCaseEqualityOn([...c], e, a) || this.specialCaseEqualityNeeds([...c], e, a))
            )
        }
        return compareDeeplyMap
    }

    public static loadFile(path: PathOrFileDescriptor): GithubWorkflow {
        return <GithubWorkflow>yaml.load(fs.readFileSync(path, {encoding: 'utf8'}))
    }

    public static hasUndefinedEntry(pipelineMap: Map<string, Pipeline | undefined>): boolean {
        for (let element of pipelineMap) {
            if (element[1] === undefined) {
                return true
            }
        }
        return false
    }


    /**
     * Simple predicate function for the "reduceEvaluationMap" function.
     * @param amount the amount of errors expected to be held by the
     * @private
     */
    static getAmountPredicate(amount: number): (e: Map<string, number>) => boolean {
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

    public static getFiles(): string[] {
        return fs.readdirSync(this._sourcePath).map(fileName => this._sourcePath + "/" + fileName);
    }

    /**
     * Counts the errors an individual file has.
     * e.g. if an file has 2 errors it is added to the key with 2.
     * @param evaluation
     * @private
     */
    static amountOfErrorsInObject(evaluation: Map<string, Map<string, number>>): Map<number, Array<Map<string, number>>> {
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
    public static reduceEvaluationMap(evaluation: Map<string, Map<string, number>>, predicate: Function): Map<string, Map<string, number>> {
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
    static countErrorsByType(countMap: Map<string, Map<string, number>>): Map<string, number> {
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

    public static countObjectsWithErrorType(evaluation: Map<string, Map<string, number>>) {
        let countedObjectsPerErrorType: Map<string, number> = GithubActionsFileParser.getInitializedErrorMap();
        for (let evaluationElement of evaluation) { // run through all elements in given map
            if (evaluationElement[0] === "total") {
                continue
            }
            for (let errorTypeElement of evaluationElement[1]) {
                if (errorTypeElement[1] > 0) {
                    let amount = countedObjectsPerErrorType.get(errorTypeElement[0]);
                    if (amount) {
                        countedObjectsPerErrorType.set(errorTypeElement[0], amount + 1);
                    } else {
                        countedObjectsPerErrorType.set(errorTypeElement[0], 1);
                    }
                }
            }
        }
        return countedObjectsPerErrorType;
    }

    public static specialCaseEqualityOn(context: any[], expected: any, actual: any): boolean {
            try {
                if (context.pop() === "on") {
                    if (expected instanceof Array && typeof actual === "string") {
                        return expected.length === 1 && expected[0] === actual
                    }
                }
            } catch (err) {
                return false
            }
            return false
    }

    public static specialCaseEqualityNeeds(context: any[], expected: any, actual: any): boolean {
            try {
                if (context.pop() === "needs") {
                    if (actual instanceof Array && typeof expected === "string") {
                        return actual.length === 1 && actual[0] === expected
                    }
                }
            } catch (err) {
                return false
            }
            return false
    }
}