import express = require("express");
import PingController from "../controllers/ping.controller";
import ConverterRouter from "./converter.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use("/converter", ConverterRouter);

export default router;