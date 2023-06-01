import * as fs from 'fs';

interface KPIs {
    avgBuildDuration: number;
    arrivalRate: any[];
    buildResults: any[];
}

export class GetKPIs {

    repoNameForKPIs: string;
    workflowNameForKPIs: string;

    constructor(repoNameForKPIs: string, workflowNameForKPIs: string) {

        this.repoNameForKPIs = repoNameForKPIs;
        this.workflowNameForKPIs = workflowNameForKPIs;
    }

    async getKPIs(): Promise<KPIs> {

        if (!fs.existsSync(`./res/GHAFilesandLogs/${this.repoNameForKPIs}`)) {
            throw new Error('The repo does not exist.');
        }
        if (!fs.existsSync(`./res/GHAFilesandLogs/${this.repoNameForKPIs}/${this.workflowNameForKPIs}`)) {
            throw new Error('The workflow does not exist.');
        }
        const runsFile = fs.readFileSync(`./res/GHAFilesandLogs/${this.repoNameForKPIs}/${this.workflowNameForKPIs}/${this.workflowNameForKPIs}_runs.json`, 'utf-8');
        let runsFileJson = JSON.parse(runsFile);

        let avgBuildDuration = this.getAvgBuildDuration(runsFileJson);
        console.log("avgBuildDuration is " + avgBuildDuration + "ms or " + avgBuildDuration/1000 + " seconds with " + Object.keys(runsFileJson.workflow_runs).length + " runs.");
        
        let arrivalRate = (await this.getArrivalRate(runsFileJson));
        console.log("arrivalRate is " + arrivalRate);
        
        let buildResults = this.getBuildResults(runsFileJson);
        console.log("buildResults is " + buildResults);

        //TODO: return KPIs with right values (arrivalrate??)
        return {avgBuildDuration, arrivalRate, buildResults}
    }

    private getBuildResults(runsFileJson: any) {

        let results: any[] = [];

        const amountWorkflowRuns = Object.keys(runsFileJson.workflow_runs).length;
        for (let i = 0; i < amountWorkflowRuns; i++) {
            results.push(runsFileJson.workflow_runs[i].conclusion);
        }

        let map  = results.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

        let unique = results.filter(function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        });

        let resultsArray: any[][] = [];

        for(let i = 0; i < unique.length; i++) {
            let arrival: any[] = [];
            arrival.push(unique[i]);
            arrival.push(map[unique[i]]);
            resultsArray.push(arrival);
        }
        /*
        for(let j = 0; j < resultsArray.length; j++) {
            console.log(resultsArray[j][0]);
            console.log(resultsArray[j][1]);
        }
         */
        return resultsArray;
    }

    private getAvgBuildDuration(runsFileJson: any) {

        let totalDur = 0;
        const amountWorkflowRuns = Object.keys(runsFileJson.workflow_runs).length;
        for (let i = 0; i < amountWorkflowRuns; i++) {
            let startTime = Date.parse(runsFileJson.workflow_runs[i].created_at);
            let endTime = Date.parse(runsFileJson.workflow_runs[i].updated_at);
            let runTime = endTime - startTime;
            //console.log(runsFileJson.workflow_runs[i].id + " " + runTime);
            totalDur += runTime;
        }
        let avgDur = totalDur/amountWorkflowRuns;
        //console.log("avgDur is " + avgDur + "ms or " + avgDur/1000 + " seconds with " + amountWorkflowRuns + " runs.");
        //console.log("In HH:MM:SS: " + new Date(avgDur).toISOString().slice(11, 19));
        return avgDur;
    }

    private async getArrivalRate(runsFileJson: any) {

        let arrivalDates: any[] = []; //arrivalsPerDate

        const amountWorkflowRuns = Object.keys(runsFileJson.workflow_runs).length;


        for (let i = 0; i < amountWorkflowRuns &&  i < 200; i++) {
            let arrivalTime = Date.parse(runsFileJson.workflow_runs[i].created_at);
            let arrivalDate = new Date(arrivalTime);
            let month = arrivalDate.getUTCMonth() + 1; //months from 1-12
            let day = arrivalDate.getUTCDate();
            let year = arrivalDate.getUTCFullYear();
            let arrivalString = year + "/" + month + "/" + day

            arrivalDates.push(arrivalString);

        }

        let map  = arrivalDates.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});


        let unique = arrivalDates.filter(function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        });

        let arrivalsArray: any[][] = []

        for(let i = 0; i < unique.length; i++) {
            let arrival: any[] = [];
            arrival.push(unique[i]);
            arrival.push(map[unique[i]]);
            arrivalsArray.push(arrival);
        }

        /*
        for(let j = 0; j < arrivalsArray.length; j++) {
            console.log(arrivalsArray[j][0]);
            console.log(arrivalsArray[j][1]);
        }
        */
        return arrivalsArray;

    }

}