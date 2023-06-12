import { Router } from "express";
import controller from "../controllers/converter";

const router = Router();

router.get(
  "/JenkinsToStalkCd",
  controller.konvertJenkinsToStalkCd
);
export default router;