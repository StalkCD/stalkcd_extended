import { Application } from "express";
import express = require("express");
import morgan =  require("morgan");
import swaggerUI = require("swagger-ui-express");

import Router from "./routes";
const bodyParser = require("body-parser");
var cors = require("cors");
const PORT = process.env.PORT || 8081;

const app: Application = express();

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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