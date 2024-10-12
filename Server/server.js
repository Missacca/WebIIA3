/**
 * This file is the entrance of the backend server
 * the file will call the controller api and start the server
 */

/* import modules */
const express = require("express"); // import express
const cors = require("cors"); // import cors
const bodyParser = require('body-parser');
const databaseAPI = require("./controllerAPI/api-controller.js"); // import controller api

/* initialize server */
// assign host and port
const host = 'localhost';
const port = 8888;
// initialize the server
const dataServer = express();
// let all access pass
dataServer.use(cors());
dataServer.use(bodyParser.json());
dataServer.use(bodyParser.urlencoded({ extended: true }));


dataServer.use("/api", databaseAPI); // call the controller api
// open the server on 8888
dataServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});