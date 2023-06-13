import { Request, Response } from "express";
import { Runner } from "../Runner";

const konvertJenkinsToStalkCd = async (req: Request, res: Response) => {
    //source location
    // let source = req.body.source;
    let source = './testRes/jenkinsToGHA/azerbadjani_jenkins.Jenkinsfile';

    //target name + location
    // let target = req.body.target;
    let target = './res/StalkCDYamls/';

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

export default { konvertJenkinsToStalkCd };