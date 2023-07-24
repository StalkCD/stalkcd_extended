import express = require("express");
import ConverterController from "../controllers/converter.controller";
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./src/main/uploads" });

const router = express.Router();

router.post("/jenkinstostalkcd", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertJenkinsToStalkCd(req.body);
    return res.send(response);
});

router.post("/stalkcdtojenkins", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertStalkCdToJenkins(req.body);
    return res.send(response);
});

router.post("/stalkcdtobpmn", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertStalkCdToBPMN(req.body);
    return res.send(response);
});

router.post("/bpmntostalkcd", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertBPMNToStalkCd(req.body);
    return res.send(response);
});

router.post("/bpmntojenkins", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertBPMNToJenkins(req.body);
    return res.send(response);
});

router.post("/jenkinstogithubactions", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.convertJenkinsToGitHubActions(req.body);
    return res.send(response);
});

router.post("/upload", multipartMiddleware, async (req, res) => {
    console.log();
    res.status(200).json({
        message: "File uploaded successfully",
    })
});

router.get("/test", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.test();
    return res.send(response);
});

export default router;