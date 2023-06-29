import { Application, Request, Response } from "express";
import express = require("express");
import morgan =  require("morgan");
import swaggerUI = require("swagger-ui-express");

import Router from "./routes";

var cors = require("cors");
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors({
    origin: "http://localhost:4200",
}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs", 
    swaggerUI.serve, 
    swaggerUI.setup(undefined, { 
        swaggerOptions: { 
            url: "/swagger.json",
        }, 
    })
);

app.use(Router);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});