import * as fs from 'fs';
import {JenkinsfileStatsJenkins2GHA} from "./JenkinsfileStatsJenkins2GHA";

export interface FileConfigJenkins2GHA {
    title: string;
    jenkinsFileSource: string;
    ghaFileTarget: string;
}

export class JenkinsfileCollectorJenkins2GHA {

    allFiles: string[] = [];

    constructor(
        private jenkinsfileSource: string,
        private ghaFileTarget: string,
        private stats: JenkinsfileStatsJenkins2GHA,
    ) {
        if (!fs.existsSync(jenkinsfileSource)) {
            throw new Error(`Directory not found: ${jenkinsfileSource}`)
        }
        if (!fs.existsSync(ghaFileTarget)) {
            fs.mkdir(ghaFileTarget, e => e)
        }

    }

    collect(): FileConfigJenkins2GHA[] {
        this.allFiles = fs.readdirSync(this.jenkinsfileSource);
        this.stats.totalInputFiles = this.allFiles.length;
        
        for (const jenkinsFileName of this.allFiles) {
            const fileMatch = jenkinsFileName.match(/^(.*)\.Jenkinsfile/);
            if (!fileMatch) {
                console.log(`Skipping ${jenkinsFileName}`);
                this.stats.skippedInputFiles++;
            }
        }
        
        return  this.allFiles.map(f => {
            const fileMatch = f.match(/^(.*)\.Jenkinsfile/);
            if (!fileMatch) {
                console.log(`- Skipping file '${this.jenkinsfileSource + '/' + f}' (no Jenkinsfile)`);
                this.stats.skippedNoJenkinsfile++;
                return {} as FileConfigJenkins2GHA;
            }
        
            const config: FileConfigJenkins2GHA = {
                title: this.jenkinsfileSource + '/' + f,
                jenkinsFileSource: this.jenkinsfileSource + '/' + f,
                ghaFileTarget: this.ghaFileTarget + '/' + fileMatch[0] + '.json',
                //TODO Define additional target for yaml file output, if needed
            };

            const contents = fs.readFileSync(config.jenkinsFileSource).toString();
        
            const pipelineMatch = contents.match(/^\s*pipeline\s*{\s*/mg);
            if (!pipelineMatch) {
                console.log(`- Skipping file '${config.jenkinsFileSource}' (no declarative Jenkinsfile)`);
                this.stats.skippedNonDeclarative++;
                return {} as FileConfigJenkins2GHA;
            }

            if (pipelineMatch.length > 1) {
                console.log(`- Skipping file '${config.jenkinsFileSource}' (multiple pipeline definitions)`);
                this.stats.skippedMultiplePipeline++;
                return {} as FileConfigJenkins2GHA;
            }

            return config;
        }).filter(f => !!f.jenkinsFileSource);
    }
    
}