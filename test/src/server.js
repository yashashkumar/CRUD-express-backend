"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 2000;
const home_1 = __importDefault(require("./helper/home"));
const getAllRecords_1 = __importDefault(require("./helper/getAllRecords"));
const getRecordById_1 = __importDefault(require("./helper/getRecordById"));
const AddRecord_1 = __importDefault(require("./helper/AddRecord"));
const updateRecord_1 = __importDefault(require("./helper/updateRecord"));
const deleteRecordById_1 = __importDefault(require("./helper/deleteRecordById"));
let database1 = require("./helper/newConnection");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//HOME ROUTE
app.get("/", home_1.default);
//GET ALL RECORDS - WORKING PROPERLY
app.get("/get", getAllRecords_1.default);
//GET RECORD BY ID - WORKING PROPERLY
app.get("/get/:id", getRecordById_1.default);
//ADDING NEW RECORD-WORKING PROPERLY
app.post("/datasets/create", AddRecord_1.default);
//UPDATING USER - WORKING PROPERLY
app.put("/datasets/id/:id", updateRecord_1.default);
//DELETING RECORD BY ID
app.delete("/datasets/delete/:id", deleteRecordById_1.default);
app.listen(port, () => {
    console.log(`server running in port ${port}`);
});
database1.connect();
