import {eachItem} from "ajv/dist/compile/util";

export class JenkinsfileStatsJenkins2GHA {

    /**
     * Total input files
     */
    totalInputFiles = 0;

    /**
     * All skipped input files
     */
    skippedInputFiles = 0;

    /**
     * All skipped Jenkinsfiles
     */
    private _skippedJenkinsFiles = 0;
    get skippedJenkinsFiles() {
        return this._skippedJenkinsFiles;
    }
    
    /**
     * Jenkinsfiles that were skipped because of an invalid extension
     */
    private _skippedNoJenkinsfile = 0;
    get skippedNoJenkinsfile() {
        return this._skippedNoJenkinsfile;
    }
    set skippedNoJenkinsfile(val: number) {
        const diff = val - this._skippedNoJenkinsfile;
        this._skippedJenkinsFiles += diff;
        this._skippedNoJenkinsfile = val;
    }
    
    /**
     * Jenkinsfile that were skipped because they contain no declarative pipeline
     */
    private _skippedNonDeclarative = 0;
    get skippedNonDeclarative() {
        return this._skippedNonDeclarative;
    }
    set skippedNonDeclarative(val: number) {
        this._skippedJenkinsFiles += val - this._skippedNonDeclarative;
        this._skippedNonDeclarative = val;
    }
    
    /**
     * Jenkinsfiles that were skipped because they contain multiple pipelines
     */
    private _skippedMultiplePipeline = 0;
    get skippedMultiplePipeline() {
        return this._skippedMultiplePipeline;
    }
    set skippedMultiplePipeline(val: number) {
        this._skippedJenkinsFiles += val - this._skippedMultiplePipeline;
        this._skippedMultiplePipeline = val;
    }
    
    /**
     * All processed Jenkinsfiles
     */
    private _totalProcessedFiles = 0;
    get totalProcessedFiles() {
        return this._totalProcessedFiles;
    }
    
    /**
     * Successfully processed Jenkinsfiles
     */
    private _success = 0;
    get success() {
        return this._success;
    }
    set success(val: number) {
        const diff = val - this._success;
        this._totalProcessedFiles += diff;
        this._success = val;
    }
    
    /**
     * Jenkinsfiles that could not be transformed to valid GitHub Action Files
     */
    private _failure = 0;
    get failure() {
        return this._failure;
    }
    set failure(val: number) {
        const diff = val - this._failure;
        this._totalProcessedFiles += diff;
        this._failure = val;
    }

    private _failureFileNameList:string[] = [];

    appendFailureFileNameList(val: string) {
        this._failureFileNameList.push(val);
    }

    failureFileNameListToString() {
        let failureFilesListString: string = "";
        this._failureFileNameList.forEach(function (value) {
            failureFilesListString = failureFilesListString + value + "\n"
        });
        return failureFilesListString;
    }

    private _successFileNameList:string[] = [];

    appendSuccessFileNameList(val: string) {
        this._successFileNameList.push(val);
    }

    successFileNameListToString() {
        let successFilesListString: string = "";
        this._successFileNameList.forEach(function (value) {
            successFilesListString = successFilesListString + value + "\n"
        });
        return successFilesListString;
    }

    /**
     * Detailed evaluation results for each file
     */
    readonly failedFileResults: any[] = [];


    /**
     * Prints all relevant statistical data
     */
    output(): string {
        const successRate = Math.round(this.success / this.totalProcessedFiles * 100);
        const failureRate = Math.round(this.failure / this.totalProcessedFiles * 100);

        // Sum of all failure classes
        const failureClassSum = new Map();

        // All file details
        let fileDetails = '';

        // Collect failure classification results for all files (res = results for one file), i.e. iterate over all errors
        for (const res of this.failedFileResults) {
            fileDetails += `\n\n  --- ${res.source}` +
                `\n  --> ${res.target}` +
                `\n${JSON.stringify(res.errors, null, " ")}\n`;

            // Increase overall sum for this failure class
            for (const error of res.errors) {
                let errorString: string = "instance path of input: " + JSON.stringify(error.instancePath) + "| error code: " + JSON.stringify(error.params) + "| error message: " + JSON.stringify(error.message)
                if (!failureClassSum.has(errorString)) {
                  failureClassSum.set(errorString, 1)
                }
                else {
                    failureClassSum.set(errorString, failureClassSum.get(errorString) + 1)
                }
            }

        }
        // Sort FailureClassSum regarding amount of errors
        const failureClassSumSorted = new Map([...failureClassSum.entries()].sort((a, b) => b[1] - a[1]));
        let failureClassStats = 'Aggregated validation error classification: \n';
        let failureClassSumSortedArray = Array.from(failureClassSumSorted.entries());
        for (var failureEntry of failureClassSumSortedArray){
            failureClassStats += `
                    - amount of files: ${failureEntry[1]} | ${failureEntry[0]}`;
        }

        return `
==== JenkinsToGitHubAction Evaluation Output
==== Please find the validation error summary at the end of the file.

==== ERROR DETAILS
${fileDetails}

==== Validation error summary
==== Total Input Files: ${this.totalInputFiles}
        No Jenkinsfile: ${this.skippedNoJenkinsfile}
       Not Declarative: ${this.skippedNonDeclarative}
    Multiple pipelines: ${this.skippedMultiplePipeline}

====       Valid files: ${this.totalProcessedFiles}
               Success: ${this.success} (${successRate} %) See list of files below
               Failure: ${this.failure} (${failureRate} %) See list of files below
                   
${failureClassStats}

====   Successfully validated files: ${this.successFileNameListToString()}
====   Failed validated files: ${this.failureFileNameListToString()}
        `;
    }
}
