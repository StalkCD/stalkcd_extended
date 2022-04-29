import {ClassificationResult, JenkinsfileFailureClassification, JenkinsfileStats} from "./JenkinsfileStats";
import * as jsDiff from 'diff';
import * as fs from 'fs';
import {PathLike} from 'fs';
import {reporters as MochaReporters} from 'mocha';
import {FileConfig} from "./JenkinsfileCollector";

import * as yaml from 'js-yaml';
import * as JSZip from "jszip";
import {JSZipObject} from "jszip";

import Ajv from "ajv";

class ValidationError extends Error {
    name: string = "ValidationError";
}

export class TestUtils {

    /**
     * Removes all unclear characters from a Jenkinsfile in order
     * to ensure comparability
     */
    static normalizeJenkinsfile(src: string): string {
        return src
            // Indentation
            .replace(/^\s+/gm, '')
            // Head comment
            .replace(/^#.*$/mg, '')
            // Line comment, not inside of string
            .replace(/^(([^'"\r\n]|"[^"]*"|'[^']*')*?)\/\/.*?$/gm, '$1')
            // Multi-Line comment
            .replace(/^(([^'"\r\n]|"[^"]*"|'[^']*')*?)\/\*(.|\n)*?\*\//gm, '$1')
            // Jenkinsfile Init
            .replace(/^\s*Jenkinsfile \(Declarative Pipeline\)/, '')
            // Semicolons outside strings
            .replace(/(([^'"\r\n]|"[^"]*"|'[^']*')*?);\s*/g, '$1\n')
            // Spaces before and after brackets
            .replace(/\s*([,()\[\]])\s*/g, '$1')
            // Quotation marks around stage name
            .replace(/stage\("([^"]*)"\)/g, 'stage(\'$1\')')
            // Trailing commas
            .replace(/,([)\]}])/g, '$1')
            // Line breaks
            .replace(/(\\)?[\r\n]/g, '\n')
            // Spaces
            .replace(/\s/g, '')
            .trim();
    }

    static classifyJenkinsfileDiff(fileConfig: FileConfig, normSource: string, normResult: string, stats: JenkinsfileStats): void {
        const diffParts = jsDiff.diffWords(normSource, normResult);
        const classification = new JenkinsfileFailureClassification();
        let classificationSummary = '';
        let mainClass: keyof JenkinsfileFailureClassification = 'unknown';

        for (let i = 0; i < diffParts.length; i++) {
            const diff = diffParts[i];
            if (diff.removed) {
                let summaryKey: string | undefined;
                let classTarget: keyof JenkinsfileFailureClassification | undefined;

                if (diff.value.match(/^.{0,30}(parallel|wrapCommands)\(/)) {
                    classTarget = 'complexStep';
                    summaryKey = 'COMPLEX STEP';
                } else if (diff.value.match(/^.{0,5}(agent|options|steps?|stages|parallel){/)) {
                    classTarget = 'misplacedSection';
                    summaryKey = 'MISPLACED';
                } else if (diff.value.match(/^properties\(/)) {
                    classTarget = 'prePipelineProperties';
                    summaryKey = 'PRE PROPERTIES';
                } else if (diff.value.match(/^[^a-zA-Z]*script{/)) {
                    classTarget = 'script';
                    summaryKey = 'SCRIPT';
                } else if (diff.value.match(/^[^a-zA-Z]*expression{/)) {
                    classTarget = 'expression';
                    summaryKey = 'EXPRESSION';
                } else if (diff.value.match(/^.{0,5}(def|import|@Library)/)) {
                    classTarget = 'groovyDef';
                    summaryKey = 'GROOVY DEF';
                } else if (diff.value.match(/^node/)) {
                    classTarget = 'scriptedPipeline';
                    summaryKey = 'SCRIPTED PIPELINE';
                } else if (diff.value.match(/^\w+{/)) {
                    classTarget = 'unsupportedEnvironment';
                    summaryKey = 'UNSUPPORTED ENV';
                } else if (i === 0) {
                    classTarget = 'groovyDef';
                    summaryKey = 'GROOVY DEF';
                } else {
                    classification.unknown.push(diff.value);
                }

                if (classTarget) {
                    classification[classTarget].push(diff.value);
                    if (mainClass === 'unknown') {
                        mainClass = classTarget;
                    }
                }

                let summaryText = MochaReporters.Base.color('diff removed', diff.value);

                if (summaryKey) {
                    summaryText =
                        MochaReporters.Base.color('diff gutter', ` >>>${summaryKey}>>> `)
                        + summaryText
                        + MochaReporters.Base.color('diff gutter', ' <<< ');
                }

                classificationSummary += summaryText;
            } else if (diff.added) {
                classificationSummary += MochaReporters.Base.color('diff added', diff.value);
            } else {
                classificationSummary += diff.value;
            }
        }
        stats.fileResults.push(new ClassificationResult(
            fileConfig.jenkinsFileSource,
            fileConfig.jenkinsFileTarget,
            mainClass,
            classification,
            classificationSummary,
        ));
    }

    static checkResult(expectedPath: PathLike, actualData: { [key: string]: any }) {
        const expected = JSON.parse(fs.readFileSync(expectedPath).toString());
        let failure: any[] = [];
        // General results
        for (let entry in expected) {
            if (entry === "fileResults") {
                continue
            }
            if (expected[entry] !== actualData[entry]) {
                failure.push(entry)
            }
        }

        // TODO: specific results

        if (failure.length > 0) {
            console.error("Something went wrong while validating input. Failed properties: " + failure);
            let message: string = "";
            for (let pos in failure) {
                let entry = failure[pos];
                message = message + `Property '${entry}'\n    Expected: '${expected[entry]}'\n    actual: '${actualData[entry]}'\n`;
            }
            throw new ValidationError(message);
        }
        console.log("Successfully validated.")
    }

    static async unzip(file: PathLike, entryCall: Unzipper) {
        let promiseList: Promise<Buffer>[] = [];
        let zipFileContent = fs.readFileSync(file);
        let jsZip = await JSZip.loadAsync(zipFileContent);
        for (let entry in jsZip.files) {
            let file = jsZip.files[entry];
            if (file === undefined) {
                continue
            }
            let content = await file.async("nodebuffer");
            entryCall(file, content);
        }
        /*        new JSZip.external.Promise(function (resolve, reject) {
                    fs.readFile("res/Evaluation-Jenkinsfile2StalkCD.zip", function (err, data) {
                        if (err) {
                            throw err;
                        } else {
                            resolve(data);
                        }
                    });
                }).then(function (data: any) {
                    return JSZip.loadAsync(data);
                    // @ts-ignore
                }).then((zipped: JSZip) => {
                    for (let entry in zipped.files) {
                        let file = zipped.files[entry];
                        if (file === undefined) {
                            continue
                        }
                        promiseList.push(file.async("nodebuffer")) ;
                    }
                });
                await Promise.all(promiseList)*/
    }

    static removeDirectoryRecursively(path: PathLike) {
        let stats = fs.lstatSync(path);
        if (stats.isDirectory()) {
            let files = fs.readdirSync(path);
            if (files.length !== 0) {
                files.forEach((fileOrDirectory) => {
                    this.removeDirectoryRecursively(path + '/' + fileOrDirectory);
                });
            }
            fs.rmdirSync(path)
        }
        if (stats.isFile()) {
            fs.unlinkSync(path)
        }
    }

    static validateJsonSchema(schemaPath: PathLike, dataPath: PathLike ) {
        let ajv = new Ajv();
        const schema = JSON.parse(fs.readFileSync(schemaPath).toString("utf8"));
        const data = yaml.safeLoad(fs.readFileSync(dataPath, { encoding: 'utf8' }));
        const validate = ajv.compile(schema);
        const valid = validate(data);
        valid ? console.log("successfully validated.") : console.log(validate.errors);
    }
}

interface Unzipper {
    (file: JSZipObject, content: Buffer): void
}