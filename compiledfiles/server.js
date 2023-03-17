"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
let express = require("express");
const app = express();
const port = 2000;
const home_1 = __importDefault(require("./routeImplementation/home"));
const getAllRecords_1 = __importDefault(require("./routeImplementation/getAllRecords"));
const getRecordById_1 = __importDefault(require("./routeImplementation/getRecordById"));
const addRecord_1 = __importDefault(require("./routeImplementation/addRecord"));
const updateRecord_1 = __importDefault(require("./routeImplementation/updateRecord"));
const deleteRecordById_1 = __importDefault(require("./routeImplementation/deleteRecordById"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const data_validation_1 = __importDefault(require("./validation/data.validation"));
const updateUsingPatch_1 = __importDefault(require("./routeImplementation/updateUsingPatch"));
app.get("/", home_1.default);
app.get("/datasets/get", getAllRecords_1.default);
app.get("/datasets/getrecord/:id", getRecordById_1.default);
app.post("/datasets/create", data_validation_1.default, addRecord_1.default);
app.put("/datasets/update/:id", data_validation_1.default, updateRecord_1.default);
app.delete("/datasets/delete/:id", deleteRecordById_1.default);
app.patch("/datasets/partialupdate/:id", data_validation_1.default, updateUsingPatch_1.default);
//IF USER WILLINGLY CHANGES PATH
app.all("*", (req, res) => {
    res.status(404).send("404! Page not found");
});
app.listen(port, () => {
    console.log("changes are done!");
    console.log(`server running in port ${port}!`);
});
// database1.connect();
exports.default = app;
