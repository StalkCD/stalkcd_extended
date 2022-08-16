import {TestUtils} from "../test/TestUtils";
import * as fs from 'fs';
import {JenkinsfileStats} from "../test/JenkinsfileStats";
import {JenkinsfileCollector, FileConfig} from "../test/JenkinsfileCollector";
import {Runner} from "../main/Runner";
import {reporters} from 'mocha';
import {JSZipObject} from "jszip";
import {FileConfigJenkins2GHA, JenkinsfileCollectorJenkins2GHA} from "../test/JenkinsfileCollectorJenkins2GHA";
import {JsonSchemaValidator} from "../main/JsonSchemaValidator";
import {GithubActionsFileParser} from "../main/model/GitHubActions/GithubActionsFileParser";
import {JenkinsfileStatsJenkins2GHA} from "../test/JenkinsfileStatsJenkins2GHA";
import {eachItem} from "ajv/dist/compile/util";

export class JenkinsFileToGitHubActionsFileEvaluationTest {

    private stats = new JenkinsfileStatsJenkins2GHA();

    private readonly _jenkinsfileSource = 'res/Jenkinsfiles.source';

    private readonly _ghaTarget = 'res/GHAFiles.target';

   // private readonly _stalkCdTarget = 'res/StalkCd.target';

    async evaluate() {
        if (fs.existsSync(this._jenkinsfileSource)) {
            TestUtils.removeDirectoryRecursively(this._jenkinsfileSource)
        }
        fs.mkdirSync(this._jenkinsfileSource);
        await this.getSourceData();
        const configurations = new JenkinsfileCollectorJenkins2GHA(
            this._jenkinsfileSource,
            this._ghaTarget,
            this.stats,
        ).collect();

        for (const config of configurations) {
            console.log(reporters.Base.color('suite', `\n-- ${config.jenkinsFileSource}\n-> ${config.ghaFileTarget}`));
            try {
                await this.processFile(config);
            } catch (err) {
                console.trace(err);
            }
        }
        const statsOutput = this.stats.output();
        fs.writeFileSync('res/evaluate-jenkins2GHA-result.txt', statsOutput);
        fs.writeFileSync('res/evaluate-jenkins2GHA-result.json', JSON.stringify(this.stats));

       // Cleanup
        TestUtils.removeDirectoryRecursively(this._jenkinsfileSource)
        TestUtils.removeDirectoryRecursively(this._ghaTarget)

        // console.log(statsOutput);
    }

    private async getSourceData() {
        await TestUtils.unzip("res/Evaluation-Jenkinsfile2StalkCD.zip", (file: JSZipObject, content: Buffer) => {
                if (file.dir) {
                    return;
                }
                let regExpMatchArray = file.name.match(/1-Jenkinsfiles\.source/);
                if (regExpMatchArray !== null && regExpMatchArray.length > 0) {
                    let indexOf = file.name.lastIndexOf('/');
                    fs.writeFileSync(this._jenkinsfileSource + file.name.slice(indexOf), content)
                }
            }
        )
    }

    /**
     * Process a Jenkinsfile
     * @param config The file configuration
     */
    private async processFile(config: FileConfigJenkins2GHA) {
        // Jenkinsfile > GHAFile
        if (fs.existsSync(config.ghaFileTarget)) {
            fs.unlinkSync(config.ghaFileTarget);
        }

        await new Runner().jenkinsfile2ghaFile({
            source: config.jenkinsFileSource,
            target: config.ghaFileTarget,
        });


        let ghaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH)
        let schemaResult = ghaValidator.validate(config.ghaFileTarget)

        if(schemaResult == true)
        {
         this.stats.success++;
        }
        else
        {
          this.stats.failure++;

          let errors = schemaResult.errors


          let source = config.jenkinsFileSource
          let target = config.ghaFileTarget

          let evaluationResultObject = {source, target, errors}
          this.stats.fileResults.push(evaluationResultObject);
        }

/*
        if (normSource !== normResult) {
            this.stats.failure++;
            TestUtils.classifyJenkinsfileDiff(config, normSource, normResult, this.stats);
        } else {
            this.stats.success++;
        }*/
    }

}








