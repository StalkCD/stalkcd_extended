import morgan =  require("morgan");
import Router from "./routes";
import swaggerUI = require("swagger-ui-express");

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Erlaube Cookies und andere Anmeldeinformationen
    optionsSuccessStatus: 204, // Einige Legacy-Browser (IE11) erfordern 204
};
  
app.use(cors(corsOptions));
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});