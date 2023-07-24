import express = require("express");
import ConverterController from "../controllers/converter.controller";

const multer  = require('multer')
const upload = multer({ dest: './src/main/uploads' })
const fs = require("fs");
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

router.post("/upload", upload.single('file'), async (req, res) => {
    var tmp_path = req.file?.path;
    var name = req.body['fileName'];
    var target_path = "./src/main/uploads/" + name;

    fs.rename(tmp_path, target_path, function (err: any) {
        if(err) throw err;
        fs.unlink(tmp_path, function () {
            if(err) throw err;
        });
    });

    res.status(200).json({
        path: "./src/main/uploads/",
        name: name,
    })
});

router.get("/test", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.test();
    return res.send(response);
});

export default router;