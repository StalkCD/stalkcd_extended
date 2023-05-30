import { Router } from "express";
import controller from "../controllers/download";

const router = Router();

router.get(
  "/download/:repoOwner/:repoName/:workflowName/:gitHubToken",
  controller.downloadGHAFilesAndLogs
);
export default router;
