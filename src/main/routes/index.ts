import express = require("express");
import PingController from "../controllers/ping.controller";
import ConverterRouter from "./converter.router";
import { IConverterResponse } from "../interfaces";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use("/converter", ConverterRouter);

router.post("/download", async (req, res) => {
    var filePath = req.body.path;
    var response: IConverterResponse = {
        message: "",
    }

    res.download(
        filePath, 
        "archive.zip"
    );
});


export default router;