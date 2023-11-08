import express = require("express");
import ConverterController from "../controllers/converter.controller";

const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })
const fs = require("fs");
const router = express.Router();

router.post("/jenkinstostalkcd", async (req, res) => {
    try {
        const controller = new ConverterController();
        const response = await controller.convertJenkinsToStalkCd(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/stalkcdtojenkins", async (req, res) => {
    try {   
        const controller = new ConverterController();
        const response = await controller.convertStalkCdToJenkins(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/stalkcdtobpmn", async (req, res) => {
    try {    
        const controller = new ConverterController();
        const response = await controller.convertStalkCdToBPMN(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/bpmntostalkcd", async (req, res) => {
    try {    
        const controller = new ConverterController();
        const response = await controller.convertBPMNToStalkCd(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/bpmntojenkins", async (req, res) => {
    try {    
        const controller = new ConverterController();
        const response = await controller.convertBPMNToJenkins(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/jenkinstogithubactions", async (req, res) => {
    try {    
        const controller = new ConverterController();
        const response = await controller.convertJenkinsToGitHubActions(req.body);
        return res.send(response);
    } catch (error) {
        console.log(error);
    } finally {
        cleanFile(req.body['source']);
    }
});

router.post("/upload", upload.single('file'), async (req, res) => {
    var tmp_path = req.file?.path;
    var fullName = req.body['fileName'];
    var target_path = "public/uploads/" + fullName;

    var name = fullName.split(".")[0];
    var format = fullName.split(".")[1];

    fs.rename(tmp_path, target_path, function (err: any) {
        if(err) throw err;
        fs.unlink(tmp_path, function () {
            if(err) throw err;
        });
    });

    res.status(200).json({
        path: "public/uploads/",
        name: name,
        format: format
    })
});

router.post("/getFile", async (req, res) => {
    var path = req.body['path'];

    res.download(path, function (err: any) {
        if (err) {
            console.log(err);
        } else {
            cleanFile(path);
            console.log("File downloaded");
        }
    });
});

router.get("/test", async (req, res) => {
    const controller = new ConverterController();
    const response = await controller.test();
    return res.send(response);
});


function cleanFile(path: string) {
    fs.unlink(path, function (err: any) {
        if(err) throw err;
    });
}

export default router;