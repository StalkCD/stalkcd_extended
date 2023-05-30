import { Request, Response } from "express";
import { DownloadGHAFilesAndLogs } from "../DownloadGHAFilesAndLogs";

const downloadGHAFilesAndLogs = async (req: Request, res: Response) => {
  return res.json({ message: "Hello World" });
  // let repoName: string = req.params.repoName;
  // let repoOwner: string = req.params.repoOwner;
  // let workflowName: string = req.params.workflowName;
  // let gitHubToken: string = req.params.gitHubToken;

  // new DownloadGHAFilesAndLogs(repoOwner, repoName, workflowName).downloadFiles();

  // return res.status(200).json({
  //     message: 'Download complete'
  // });
};

export default { downloadGHAFilesAndLogs };
