import { Request, Response } from "express";
import { Runner } from "../Runner";

const convertJenkinsToStalkCd = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './testRes/jenkinsToGHA/azerbadjani_jenkins.Jenkinsfile';

    //target name + location
    // let target = req.body.target;
    let target = './res/_StalkCDYamls/';

    // let fileName = req.body.fileName;
    let fileName = 'test.yml';


    let config: any = {
        source: source,
        target: target + fileName
    };

    await new Runner().jenkinsfile2stalkCd(config);
    
    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

const convertStalkCdToJenkins = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './res/_StalkCDYamls/test.yml';

    //target name + location
    // let target = req.body.target;
    let target = './res/_JenkinsFiles/';

    // let fileName = req.body.fileName;
    let fileName = 'test.Jenkinsfile';


    let config: any = {
        source: source,
        target: target + fileName
    };
    console.log(config);

    await new Runner().stalkCd2jenkinsfile(config);

    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

const convertStalkCdToBPMN = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './res/_StalkCDYamls/test.yml';

    //target name + location
    // let target = req.body.target;
    let target = './res/_BPMNFiles/';

    // let fileName = req.body.fileName;
    let fileName = 'test.bpmn';


    let config: any = {
        source: source,
        target: target + fileName
    };
    console.log(config);

    await new Runner().stalkCd2bpmn(config);

    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

const convertBPMNToStalkCd = async (req: Request, res: Response) => {
//source location
    // let source = req.body.source;
    let source = './res/_BPMNFiles/test.bpmn';

    //target name + location
    // let target = req.body.target;
    let target = './res/_StalkCDYamls/';

    // let fileName = req.body.fileName;
    let fileName = 'testFromBPMN.yml';


    let config: any = {
        source: source,
        target: target + fileName
    };
    console.log(config);

    await new Runner().bpmn2stalkCd(config);

    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

const convertBPMNToJenkins = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './res/_BPMNFiles/test.bpmn';

    //target name + location
    // let target = req.body.target;
    let target = './res/_JenkinsFiles/';

    // let fileName = req.body.fileName;
    let fileName = 'testFromBPMN.Jenkinsfile';


    let config: any = {
        source: source,
        target: target + fileName
    };
    console.log(config);

    await new Runner().bpmn2jenkins(config);

    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

const convertJenkinsToGitHubActions = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './res/_JenkinsFiles/test.Jenkinsfile';

    //target name + location
    // let target = req.body.target;
    let target = './res/_GitHubActionsFiles/';

    // let fileName = req.body.fileName;
    let fileName = 'test.yml';

    // let singleFileTransformation: Boolean = req.body.singleFileTransformation;
    let singleFileTransformation = true;

    // let evaluationCreateYaml: Boolean = req.body.evaluationCreateYaml;

    let config: any = {
        source: source,
        target: target + fileName
    };
    console.log(config);

    await new Runner().jenkinsfile2ghaFile(config, singleFileTransformation);

    return res.status(200).json({
        message: 'Konverting complete.'
    });
}

export default { convertJenkinsToStalkCd, convertStalkCdToJenkins, convertStalkCdToBPMN, convertBPMNToStalkCd, convertBPMNToJenkins, convertJenkinsToGitHubActions };