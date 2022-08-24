import * as fs from "fs";
import {PathLike, PathOrFileDescriptor} from "fs";
import {GithubActionsFileParser} from "../../main/model/GitHubActions/GithubActionsFileParser";
import {Pipeline} from "../../main/model/pipeline/Pipeline";
import {GithubWorkflowGenerator} from "../../main/model/GitHubActions/GitHubWorkflowGenerator";
import {JsonSchemaValidator} from "../../main/JsonSchemaValidator";
import {Comparator} from "../../main/Comparator";
import {GithubWorkflow} from "../../main/model/GitHubActions/GeneratedTypes";
import * as yaml from "js-yaml";
import {TestUtils} from "../TestUtils";
import {JSZipObject} from "jszip";

export class GithubActions2StalkCdEvaluation {

    private static readonly _sourcePath: PathLike = "res/GithubActions.source";

    public static async evaluate() {
        let files = await this.setup();

        // parse all
        let parserResult: GithubActionsFileParser = this.parseFiles(files, true, []);
        let zeroErrorResults: Map<string, Map<string, number>> = this.reduceEvaluationMap(parserResult.evaluation, this.getAmountPredicate(0));
        let zeroErrorFiles: string[] = []
        zeroErrorResults.forEach((_, filename) => zeroErrorFiles.push(filename))

        let pipelinesMap: Map<string, Pipeline | undefined> = this.parseFilesToPipeline(zeroErrorFiles, true, []);

        let generatedWorkflows: Map<string, any> = this.generateGithubActionObjects(pipelinesMap);

        // Get evaluation basis
        let workflowsValidityMap: Map<string, boolean> = this.schemaValidation(generatedWorkflows);
        let workflowsComparisonDeeplyMap: Map<string, Map<string, string[]>> = this.compareDeeply(generatedWorkflows);
        let workflowsComparisonSemanticMap: Map<string, Map<string, string[]>> = this.compareSemantically(generatedWorkflows);

        // check successful for success
        let totalFiles = files.length
        // @ts-ignore
        let resultOfProcessing: number = parserResult.evaluation.get("total");
        let failedSemanticComparison = this.getFailedComparisons(workflowsComparisonSemanticMap)
        let failedDeepComparison = this.getFailedComparisons(workflowsComparisonDeeplyMap)

        let validWorkflowsAfterProcessing: number = 0
        let failedValidationAfterProcessing: number = 0
        workflowsValidityMap.forEach((value) => value ? validWorkflowsAfterProcessing++ : failedValidationAfterProcessing++)

        console.log("Total Files found and processed: " + totalFiles)
        console.log("Result of processing:")
        console.log(resultOfProcessing)
        console.log("Schema-Valid Workflows after processing: " + validWorkflowsAfterProcessing)
        console.log("Failed validation of Workflows after processing: " + failedValidationAfterProcessing)
        console.log("Failed deep comparison for: " + failedDeepComparison)
        console.log("Failed semantic comparison for: " + failedSemanticComparison)
        console.log("Total successful Converted: " + (workflowsComparisonSemanticMap.size - failedSemanticComparison))

    }

    private static getFailedComparisons(workflowsComparisonDeeplyMap: Map<string, Map<string, string[]>>): number {
        let failedComparison = 0
        workflowsComparisonDeeplyMap.forEach((value) => {
            if (value.size > 0) {
                failedComparison++
            }
        })
        return failedComparison;
    }

    private static async setup(): Promise<string[]> {
        if (fs.existsSync(this._sourcePath)) {
            TestUtils.removeDirectoryRecursively(this._sourcePath);
        }
        fs.mkdirSync(this._sourcePath);
        await this.unzipSourceData()
        return this.getFiles();
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
        files.forEach(f => pipelineMap.set(f, parser.parse(f)));
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
                validator.validateObject(element[1]);
            } catch (err) {
                isValid = false
            }
            isSchemaValidMap.set(element[0], isValid)
        }
        return isSchemaValidMap;
    }

    public static compareSemantically(workflowMap: Map<string, any>) {
        let compareDeeplyMap: Map<string, Map<string, string[]>> = new Map();
        for (let element of workflowMap) {
            let expected: object = this.loadFile(element[0]);
            let actual: object = element[1];
            compareDeeplyMap.set(
                element[0],
                Comparator.compareObjects(expected, actual,
                    (c, e, a) => this.specialCaseEqualityOn([...c], e, a)
                        || this.specialCaseEqualityNeeds([...c], e, a)
                        || this.specialCaseEqualityEnvAndEnvironment([...c], e)
                )
            )
        }
        return compareDeeplyMap
    }

    public static compareDeeply(workflowMap: Map<string, any>) {
        let compareDeeplyMap: Map<string, Map<string, string[]>> = new Map();
        for (let element of workflowMap) {
            let expected: object = this.loadFile(element[0]);
            let actual: object = element[1];
            compareDeeplyMap.set(
                element[0],
                Comparator.compareObjects(expected, actual)
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
        if (context.pop() === "on") {
            if (expected instanceof Array && typeof actual === "string") {
                return expected.length === 1 && expected[0] === actual
            }
        }
        return false
    }

    public static specialCaseEqualityNeeds(context: any[], expected: any, actual: any): boolean {
        if (context.pop() === "needs") {
            if (actual instanceof Array && typeof expected === "string") {
                return actual.length === 1 && actual[0] === expected
            }
        }
        return false
    }

    /**
     * This is evil, please don't do this manipulation of the object.
     * Reason: manipulating an object while it is processed is bad practice and can lead to funny errors or the crash of the program.
     * This only works because intrinsic workings of the Comparator-Class are known to the programmer [ck] and objects in JS are mutable.
     * Also this is still ambiguous since there can be "env" and "environment at the same time.
     */
    public static specialCaseEqualityEnvAndEnvironment(context: any[], expected: any): boolean {
        if (context[context.length - 2] === "jobs" && expected.environment !== undefined && expected.env === undefined) {
            expected.env = expected.environment
            delete expected.environment
        }
        return false
    }

    private static async unzipSourceData() {
        await TestUtils.unzip("res/GithubActions.source.zip", (file: JSZipObject, content: Buffer) => {
                if (file.dir) {
                    return;
                }

                let indexOf = file.name.lastIndexOf('/');
                fs.writeFileSync(this._sourcePath + "/" + file.name.slice(indexOf), content)
            }
        )
    }

}