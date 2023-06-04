import { Request, Response } from "express";
import { GetKPIs } from "../GetKPIs";

const getKPIs = async (req: Request, res: Response) => {
    let repoNameForKPIs: string = req.params.repoName;
    let workflowNameForKPIs: string = req.params.workflowName;
  
    let kpis = await new GetKPIs(repoNameForKPIs, workflowNameForKPIs).getKPIs();
  
    return res.status(200).json({
        kpis
    });
  };
  
  export default { getKPIs };