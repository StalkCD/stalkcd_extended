import { Router } from "express";
import controller from "../controllers/converter";

const router = Router();

router.post(
  "/JenkinsToStalkCd",
  controller.convertJenkinsToStalkCd
);

router.post(
  "/StalkCdToJenkins",
  controller.convertStalkCdToJenkins
);

router.post(
  "/StalkCdToBPMN",
  controller.convertStalkCdToBPMN
);

router.post(
  "/BPMNToStalkCd",
  controller.convertBPMNToStalkCd
);

router.post(
  "/BPMNToJenkins",
  controller.convertBPMNToJenkins
);

router.post(
  "/JenkinsToGitHubActions",
  controller.convertJenkinsToGitHubActions
)

export default router;