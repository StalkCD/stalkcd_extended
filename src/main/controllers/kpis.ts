import { Request, Response } from "express";
import { GetKPIs } from "../GHAFilesAndCharacteristics/GetKPIs";
import { Kpis } from "../DTOs/kpis";

const getKPIs = async (req: Request, res: Response) => {
    let repoNameForKPIs: string = req.params.repoName;
    let workflowNameForKPIs: string = req.params.workflowName;
  
    let kpis: Kpis = await new GetKPIs(repoNameForKPIs, workflowNameForKPIs).getKPIs();
  
    return res.status(200).json({kpis});
  };
  
  export default { getKPIs };