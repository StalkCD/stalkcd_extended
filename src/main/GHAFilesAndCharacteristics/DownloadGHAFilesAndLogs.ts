import fetch, {RequestInit, Response} from "node-fetch";
import * as fs from 'fs';
import {GHAFileSaver} from "./GHAFileSaver";
import {GHAHistoryBuilder} from "./GHAHistoryBuilder";

const GITHUB_API_VERSION = 'application/vnd.github.v3+json'; // https://docs.github.com/en/rest/overview/resources-in-the-rest-api



export class DownloadGHAFilesAndLogs {

    repoName: string;
    repoOwner: string;
    workflowName: string;
    token: string;

    constructor(repoOwner: string, repoName: string, workflowName: string, token: string) {

        this.repoName = repoName;
        this.repoOwner = repoOwner;
        this.workflowName = workflowName;
        this.token = token;
    }

    private targetFileName = "";
    private targetDir = "res/GHAFilesandLogs/";

    /**
     *
     */
    async downloadFiles(save: boolean): Promise<GHAHistoryBuilder> {

        let history: GHAHistoryBuilder = new GHAHistoryBuilder();

        try {

            let fileContents = await this.getAllWorkflows();

            const workflowsJson = JSON.parse(fileContents);
            const amountWorkflows = Object.keys(workflowsJson.workflows).length;
            history.addRepo(this.repoName, workflowsJson);
            for (let i = 0; i < amountWorkflows; i++) {
                if(workflowsJson.workflows[i] !== undefined) {

                    //this.createWorkflowFoldersAndFile(workflowsJson.workflows[i]);
                    const WorkflowFile = await this.DownloadWorkflowFile(workflowsJson.workflows[i]);
                    const WorkflowFileJson = JSON.parse(WorkflowFile);

                    //const WorkflowYaml = this.DownloadYamlFile(workflowsJson.workflows[i], WorkflowFile.download_url);

                    const RunsOfWorkflow = await this.getRunsOfWorkflow(workflowsJson.workflows[i]);
                    const RunsOfWorkflowJson = JSON.parse(RunsOfWorkflow);
                    history.addWorkflow(workflowsJson.workflows[i].id, RunsOfWorkflowJson);
                    const amountRunsOfWorkflow = Object.keys(RunsOfWorkflowJson.workflow_runs).length;


                    for (let j = 0; j < amountRunsOfWorkflow; j++) {
                        let path = workflowsJson.workflows[i].name + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id;
                        //this.createTargetDir(path);
                        //let writePath = this.targetDir + "/" + path + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id +".json";
                        //fs.writeFile(writePath, JSON.stringify(RunsOfWorkflowJson.workflow_runs[j]), {encoding: 'utf8'}, err => {});

                        const jobsOfRun = await this.getJobsOfRun(RunsOfWorkflowJson.workflow_runs[j].id);
                        const jobsOfRunJson = JSON.parse(jobsOfRun);
                        history.addRun(RunsOfWorkflowJson.workflow_runs[j].id, jobsOfRunJson);

                        const amountJobsOfRun = Object.keys(jobsOfRunJson.jobs).length;
                        const jobPath = this.targetDir + "/" + path + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id + "_jobs.json";
                        //fs.writeFile(jobPath, JSON.stringify(jobsOfRunJson), {encoding: 'utf8'}, err => {})
                        //console.log(Object.keys(jobsOfRunJson.jobs).length);

                        for (let k = 0; k < amountJobsOfRun; k++) {

                            let path = workflowsJson.workflows[i].name + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id + "/jobid_" + jobsOfRunJson.jobs[k].id;
                            let filePath = this.targetDir + "/" + path + "/jobid_" + jobsOfRunJson.jobs[k].id + ".json";
                            //this.createTargetDir(path);
                            //fs.writeFile(filePath, JSON.stringify(jobsOfRunJson.jobs[k]), {encoding: 'utf8'}, err => {};


                            const logOfJob = await this.getLogOfJob(jobsOfRunJson.jobs[k].id);
                            history.addJob(jobsOfRunJson.jobs[k].id, logOfJob)


                            let logPath = this.targetDir + "/" + path + "/jobid_" + jobsOfRunJson.jobs[k].id + "_log.json";

                            fs.writeFile(logPath, logOfJob, {encoding: 'utf8'}, err => {
                            });


                        }

                    }


                }
            }
            if(save) {
                let saver: GHAFileSaver = new GHAFileSaver();
                saver.saveFiles(history);
            }

        } catch (err: any) {
        console.error();
        }

        return history;
    }


    private async getLogOfJob(jobId: any): Promise<any> {
        let fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/jobs/${jobId}/logs`);
        let fileContents = await fileContentsResponse.text();
        return fileContents;
    }

    private async getJobsOfRun(runId: any): Promise<any> {
        let fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/runs/${runId}/jobs`);
        let fileContents = await fileContentsResponse.text();
        return fileContents;
    }


    /**
     *
     * @param workflow
     * @private
     */
    private async getRunsOfWorkflow(workflow: any): Promise<any> {
        let page: number = 1;
        let fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows/${workflow.id}/runs?per_page=100&page=${page}`);
        let fileContents = await fileContentsResponse.text();
        let totalContents: any = fileContents.slice(0, -2);
        let linkMatch = /<([^>]*?)>; rel="next"/.exec(<string>fileContentsResponse.headers.get('link'));
        while(page < 2 && fileContentsResponse.headers.get('link') !== null && linkMatch && linkMatch.length >= 2 ? linkMatch[1] : undefined) {
            page = page + 1;
            fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows/${workflow.id}/runs?per_page=100&page=${page}`);
            fileContents = await fileContentsResponse.text();
            fileContents = fileContents.slice(fileContents.indexOf("[") + 1);
            fileContents = fileContents.slice(0, -2);
            totalContents = totalContents + ",";
            totalContents = totalContents + fileContents;
            linkMatch = /<([^>]*?)>; rel="next"/.exec(<string>fileContentsResponse.headers.get('link'));
        }
        totalContents = totalContents + "]}"
        const path: string = this.targetDir + "/" + workflow.name + "/";
        const fileName: string = workflow.name + "_runs.json";
        fs.writeFile(path + fileName, totalContents, {encoding: 'utf8'}, err => {});
        return totalContents;
    }


    /**
     * This method uses the tryFetch method to get all workflows of a given repository via the github api.
     * Afterwards this method downloads creates a folder in ./res/GHAFilesandLogs with the name of the given repository, if it doesn't already exist.
     * The method returns the content of the downloaded file.
     * @private
     */
    private async getAllWorkflows(): Promise<any> {
        const fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows`);
        let fileContentsJson = await fileContentsResponse.json();
        let fileContents = JSON.stringify(fileContentsJson);

        this.targetDir = this.targetDir + this.repoName;
        //this.createTargetDir();

        this.targetFileName = this.repoName + "_workflows.json";

        const path: string = this.targetDir + '/' + this.targetFileName;

        if(this.workflowName != null && this.workflowName != "") {
            let indexOfWorkflow = 0;
            for(let i = 0; i < Object.keys(fileContentsJson.workflows).length; i++) {
                if(fileContentsJson.workflows[i].name == this.workflowName) {
                    indexOfWorkflow = i;
                }
            }
            fileContents = "{\"workflows\":[" + JSON.stringify(fileContentsJson.workflows[indexOfWorkflow]) + "]}";
        }

        /*
        fs.writeFile(path, fileContents, {encoding: 'utf8'}, (err: any) => {

            if (err) {
                console.error(`Could not write to '${this.targetFileName}'`, err);
            }
        });*/
        return fileContents;
    }
    /**
     * Downloads a file with a given url of a repository.
     * @param fetchUrl the url to be downloaded
     * @private
     */
    private async tryFetch(fetchUrl:string): Promise<Response> {
        let fetchParams: RequestInit = {
            headers: {
                'Accept': GITHUB_API_VERSION,
                'Authorization': 'token ' + this.token,
                'User-Agent': 'request',
                'charset': 'UTF-8'
            },
        };
        let url: string = fetchUrl;//`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows`;
        let res: Response = new Response();

        try {
            res = await fetch(url, fetchParams);
        } catch (err) {
            console.error(err);
        }

        console.log("request successful: " + url)
        return res;
    }

    private async DownloadYamlFile(workflow: any, url: string): Promise<any> {

        const yamlContentsResponse = await this.tryFetch(url);
        const yamlContents = await yamlContentsResponse.text();
        fs.writeFile(this.targetDir + "/" + workflow.name + "/" + workflow.name +".yml", yamlContents, {encoding: 'utf8'}, (err: any) => {
        })
        return yamlContents;
    }

    private async DownloadWorkflowFile(workflow: any): Promise<any> {
        let path = workflow.path;
        const fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${path}`);
        const fileContentsJson = await fileContentsResponse.json();
        const fileContents = JSON.stringify(fileContentsJson);
        fs.writeFile(this.targetDir + "/" + workflow.name + "/yaml_" + workflow.name +".json", fileContents, {encoding: 'utf8'}, (err: any) => {
        })
        return fileContents;
    }
}