import fetch, {RequestInit, Response} from "node-fetch";
import * as fs from 'fs';

const GITHUB_API_VERSION = 'application/vnd.github.v3+json'; // https://docs.github.com/en/rest/overview/resources-in-the-rest-api

interface Workflow {
    id: string;
    node_id: string;
    name: string;
    path: string;
    state: string;
    created_at: string;
    updated_at: string;
    url: string;
    html_url: string;
    badge_url: string
}

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
     * This method downloads creates a folder in ./res/GHAFilesandLogs with the name of the given repository, if it doesn't already exist.
     *
     */
    async downloadFiles() {
        let baseDir: string = 'res/GHAFilesandLogs'
        if(!fs.existsSync(baseDir)) {
            fs.mkdir(baseDir, 0o777, (err: any) => {
                if (err) {
                    console.error(`Could not create directory '${baseDir}'`, err);
                }
            });
        }

        try {

            let fileContents = await this.getAllWorkflows();

            const workflowsJson = JSON.parse(fileContents);
            const amountWorkflows = Object.keys(workflowsJson.workflows).length;

            for (let i = 0; i < amountWorkflows; i++) {
                if(workflowsJson.workflows[i] !== undefined) {
                    this.createWorkflowFoldersAndFile(workflowsJson.workflows[i] as Workflow);
                    this.DownloadYamlFile(workflowsJson.workflows[i]);
                }
            }

            for (let i = 0; i < amountWorkflows; i++) {
                if(workflowsJson.workflows[i] !== undefined) {
                    const RunsOfWorkflow = await this.getRunsOfWorkflow(workflowsJson.workflows[i] as Workflow);
                    const RunsOfWorkflowJson = JSON.parse(RunsOfWorkflow);
                    const amountRunsOfWorkflow = Object.keys(RunsOfWorkflowJson.workflow_runs).length;

                    for (let j = 0; j < amountRunsOfWorkflow; j++) {
                        let path = workflowsJson.workflows[i].name + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id;
                        this.createTargetDir(path);
                        let writePath = this.targetDir + "/" + path + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id +".json";
                        fs.writeFile(writePath, JSON.stringify(RunsOfWorkflowJson.workflow_runs[j]), {encoding: 'utf8'}, err => {});

                        const jobsOfRun = await this.getJobsOfRun(RunsOfWorkflowJson.workflow_runs[j].id);
                        const jobsOfRunJson = JSON.parse(jobsOfRun);
                        const amountJobsOfRun = Object.keys(jobsOfRunJson.jobs).length;
                        const jobPath = this.targetDir + "/" + path + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id + "_jobs.json";
                        fs.writeFile(jobPath, JSON.stringify(jobsOfRunJson), {encoding: 'utf8'}, err => {})
                        console.log(Object.keys(jobsOfRunJson.jobs).length);

                        for (let k = 0; k < amountJobsOfRun; k++) {
                            let path = workflowsJson.workflows[i].name + "/" + "runid_" + RunsOfWorkflowJson.workflow_runs[j].id + "/jobid_" + jobsOfRunJson.jobs[k].id;
                            let filePath = this.targetDir + "/" + path + "/jobid_" + jobsOfRunJson.jobs[k].id + ".json";
                            this.createTargetDir(path);
                            fs.writeFile(filePath, JSON.stringify(jobsOfRunJson.jobs[k]), {encoding: 'utf8'}, err => {})

                            const logOfJob = await this.getLogOfJob(jobsOfRunJson.jobs[k].id);
                            let logPath = this.targetDir + "/" + path + "/jobid_" + jobsOfRunJson.jobs[k].id + "_log.json";
                            fs.writeFile(logPath, logOfJob, {encoding: 'utf8'}, err => {})
                        }
                    }
                    console.log(amountRunsOfWorkflow);
                }
            }

        } catch (err: any) {
            console.error();
        }
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
    private async getRunsOfWorkflow(workflow: Workflow): Promise<any> {
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
     * Method creates a subfolder for the passed workflow in the folder for the repository with the name of the workflow.
     * Afterwards the workflows are written in a .txt file in their respective folder.
     * @param workflow
     * @private
     */
    private createWorkflowFoldersAndFile(workflow: Workflow) {

        this.createTargetDir(workflow.name);
        const json = JSON.stringify(workflow);
        const path: string = this.targetDir + "/" + workflow.name + "/" + workflow.name + ".json";
        if(!fs.existsSync(path)) {
            fs.writeFile(path, json, {encoding: 'utf8'}, err => {});
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
        this.createTargetDir();

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

        fs.writeFile(path, fileContents, {encoding: 'utf8'}, (err: any) => {

            if (err) {
                console.error(`Could not write to '${this.targetFileName}'`, err);
            }
        });
        return fileContents;
    }
    /**
     * Downloads the workflows file of a repository.
     * @param retryCount
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

    private async DownloadYamlFile(workflow: any) {
        let path = workflow.path;
        const fileContentsResponse = await this.tryFetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${path}`);
        const fileContentsJson = await fileContentsResponse.json();
        const fileContents = JSON.stringify(fileContentsJson);
        fs.writeFile(this.targetDir + "/" + workflow.name + "/yaml_" + workflow.name +".json", fileContents, {encoding: 'utf8'}, (err: any) => {
        })
        const yamlContentsResponse = await this.tryFetch(fileContentsJson.download_url);
        const yamlContents = await yamlContentsResponse.text();
        fs.writeFile(this.targetDir + "/" + workflow.name + "/" + workflow.name +".yml", yamlContents, {encoding: 'utf8'}, (err: any) => {
        })
    }
}