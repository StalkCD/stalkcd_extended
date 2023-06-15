import {GHAHistoryBuilder} from "./GHAHistoryBuilder";
import * as fs from "fs";

export class GHAFileSaver {

    private baseDir =  "historydata";
    private targetDir = this.baseDir + "/";

    saveFiles(history: GHAHistoryBuilder) {

        this.createBaseDir();

        this.targetDir = this.baseDir + "/" + history.repo?.name + "/";
        this.createTargetDir();
        this.fileWriter(this.targetDir + "workflows", history.repo!.workflowsFile, ".json");

        for(let i = 0; history.workflows!.length > i; i++) {

            this.createTargetDir(history.repo?.workflowsFile.workflows[i].name);
            let path = history.repo?.workflowsFile.workflows[i].name + "/";
            this.fileWriter(this.targetDir + path + history.repo?.workflowsFile.workflows[i].name + "_runs", history.workflows![i].runsFile, ".json");

            let amountRunsOfWorkflow = Object.keys(history.workflows![i].runsFile.workflow_runs).length;

            for(let j = 0; j < amountRunsOfWorkflow; j++) {
                path = history.repo?.workflowsFile.workflows[i].name + "/";
                this.createTargetDir(path + "runid_" + history.workflows![i].runsFile.workflow_runs[j].id);

                let runId = history.workflows![i].runsFile.workflow_runs[j].id;

                path = path + "runid_" + history.workflows![i].runsFile.workflow_runs[j].id + "/";
                let run = history.runs?.find(({id}) => id === runId);
                this.fileWriter(this.targetDir + path + "runid_" + runId + "_jobs", run!.jobsFile, ".json");

                let amountJobsOfRun = Object.keys(history.runs![j].jobsFile.jobs).length;

                for(let l = 0; l < amountJobsOfRun; l++) {
                    path = history.repo?.workflowsFile.workflows[i].name + "/" + "runid_" + history.workflows![i].runsFile.workflow_runs[j].id + "/";
                    this.createTargetDir(path + "jobid_" + history.runs![j].jobsFile.jobs[l].id);
                    let jobID = history.runs![j].jobsFile.jobs[l].id;

                    path = path + "jobid_" + history.runs![j].jobsFile.jobs[l].id + "/";

                    let job = history.jobs?.find(({id}) => id === jobID);
                    this.fileWriter(this.targetDir + path + "jobid_" + jobID + "_log", job!.logFile, ".json");
                }

            }
        }

    }

    private fileWriter(path: string, content: string, ending: string) {

        let cont = JSON.stringify(content);
        fs.writeFile(path + ending,  cont, {encoding: 'utf8'}, err => {})
    }
    private createBaseDir() {
        if(!fs.existsSync(this.baseDir)) {
            fs.mkdir(this.baseDir, 0o777, (err: any) => {
                if (err) {
                    console.error(`Could not create directory '${this.baseDir}'`, err);
                }
            });
        }
    }

    /**
     * Method creates the target direction, and a subfolder that can get passed optionally.
     * @param folder
     * @private
     */
    private createTargetDir(folder?: string) {

        let targetDir: string = this.targetDir;

        if(typeof folder !== 'undefined') {
            targetDir = targetDir + "/" + folder;
        }
        if(!fs.existsSync(targetDir)) {
            fs.mkdir(targetDir, 0o777, (err: any) => {
                if (err) {
                    console.error(`Could not create directory '${targetDir}'`, err);
                }
            });
        }
    }

}