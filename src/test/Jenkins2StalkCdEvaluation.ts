import {TestUtils} from "./TestUtils";
import * as fs from 'fs';
import {JenkinsfileStats} from "./JenkinsfileStats";
import {JenkinsfileCollector, FileConfig} from "./JenkinsfileCollector";
import {Runner} from "../main/Runner";
import {reporters} from 'mocha';
import {JSZipObject} from "jszip";

export class Jenkins2StalkCDEvaluation {

    private stats = new JenkinsfileStats();

    private readonly _jenkinsfileSource = 'res/Jenkinsfiles.source';

    private readonly _jenkinsfileTarget = 'res/Jenkinsfiles.target';

    private readonly _stalkCdTarget = 'res/StalkCd.target';

    async evaluate() {
        if (fs.existsSync(this._jenkinsfileSource)) {
            TestUtils.removeDirectoryRecursively(this._jenkinsfileSource)
        }
        fs.mkdirSync(this._jenkinsfileSource);
        await this.getSourceData();
        const configurations = new JenkinsfileCollector(
            this._jenkinsfileSource,
            this._jenkinsfileTarget,
            this._stalkCdTarget,
            this.stats,
        ).collect();

        for (const config of configurations) {
            console.log(reporters.Base.color('suite', `\n-- ${config.jenkinsFileSource}\n-> ${config.jenkinsFileTarget}`));
            try {
                await this.processFile(config);
            } catch (err) {
                console.trace(err);
            }
        }
        const statsOutput = this.stats.output();
        fs.writeFileSync('res/evaluate-jenkins2stalkcd-result.txt', statsOutput);
        fs.writeFileSync('res/evaluate-jenkins2stalkcd-result.json', JSON.stringify(this.stats));
        try {
            TestUtils.checkResult("res/ExpectedResults/jenkins2stalkcd-result.json", this.stats);
        } catch (error){

        } finally {
            // Cleanup
            // TestUtils.removeDirectoryRecursively(this._jenkinsfileSource)
            TestUtils.removeDirectoryRecursively(this._jenkinsfileTarget)
            TestUtils.removeDirectoryRecursively(this._stalkCdTarget)
        }

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
    private async processFile(config: FileConfig) {
        // Jenkinsfile > StalkCD
        if (fs.existsSync(config.stalkCdFileTarget)) {
            fs.unlinkSync(config.stalkCdFileTarget);
        }

        await new Runner().jenkinsfile2stalkCd({
            source: config.jenkinsFileSource,
            target: config.stalkCdFileTarget,
        });

        // StalkCD > Jenkinsfile
        if (fs.existsSync(config.jenkinsFileTarget)) {
            fs.unlinkSync(config.jenkinsFileTarget);
        }

        await new Runner().stalkCd2jenkinsfile({
            source: config.stalkCdFileTarget,
            target: config.jenkinsFileTarget,
        });

        // Assert equality
        let source = fs.readFileSync(config.jenkinsFileSource).toString();
        let result = fs.readFileSync(config.jenkinsFileTarget).toString();

        const normSource = TestUtils.normalizeJenkinsfile(source);
        const normResult = TestUtils.normalizeJenkinsfile(result);

        if (normSource !== normResult) {
            this.stats.failure++;
            TestUtils.classifyJenkinsfileDiff(config, normSource, normResult, this.stats);
        } else {
            this.stats.success++;
        }
    }

}
