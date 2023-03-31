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

    constructor(repoOwner: string, repoName: string) {

        this.repoName = repoName;
        this.repoOwner = repoOwner;

    }

    private token: string = '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'
    private targetFileName = "";
    private targetDir = "res/GHAFilesandLogs/";

    /**
     * This method downloads creates a folder in ./res/GHAFilesandLogs with the name of the given repository, if it doesn't already exist.
     *
     */
    async downloadFiles() {

        try {

            const fileContents = this.getAllWorkflows();
            //const differentWorkflows: Workflow[] = this.getWorkflows(fileContents);
            const workflowsJson = JSON.parse(await fileContents);
            const amountWorkflows = Object.keys(workflowsJson.workflows).length;

            for (let i = 0; i < amountWorkflows; i++) {
                if(workflowsJson.workflows[i] !== undefined) {
                    this.createWorkflowFoldersAndFile(workflowsJson.workflows[i] as Workflow);
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
                        fs.writeFileSync(writePath, JSON.stringify(RunsOfWorkflowJson.workflow_runs[j]), {encoding: 'utf8'});

                        const JobsOfWorkflow = await this.getJobsOfRun(RunsOfWorkflowJson.workflow_runs[j].id);
                    }
                    console.log(amountRunsOfWorkflow);
                }
            }

        } catch (err: any) {
            console.error();
        }
    }

    private async getJobsOfRun(runID: any): Promise<any> {


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
        //fs.writeFileSync(path + fileName, totalContents, {encoding: 'utf8'});
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
        fs.writeFileSync(path, json, {encoding: 'utf8'});
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
        const fileContents = await fileContentsResponse.text();

        this.targetDir = this.targetDir + this.repoName;
        this.createTargetDir();

        this.targetFileName = this.repoName + "_workflows.json";

        const path: string = this.targetDir + '/' + this.targetFileName;

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
}