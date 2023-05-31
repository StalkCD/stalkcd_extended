import { Request, Response } from "express";
import { GetKPIs } from "../GetKPIs";

const getKPIs = async (req: Request, res: Response) => {
    let repoNameForKPIs: string = req.params.repoName;
    let workflowNameForKPIs: string = req.params.workflowName;
  
    let kPis = await new GetKPIs(repoNameForKPIs, workflowNameForKPIs).getKPIs();
  
    return res.status(200).json({
        message: 'We have KPIs.',
        kPis
    });
  };
  
  export default { getKPIs };