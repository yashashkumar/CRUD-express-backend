"use strict";
exports.__esModule = true;
// import express from "express";
var express = require("express");
var app = express();
var port = 2000;
var home_1 = require("./routeImplementation/home");
var getAllRecords_1 = require("./routeImplementation/getAllRecords");
var getRecordById_1 = require("./routeImplementation/getRecordById");
var addRecord_1 = require("./routeImplementation/addRecord");
var updateRecord_1 = require("./routeImplementation/updateRecord");
var deleteRecordById_1 = require("./routeImplementation/deleteRecordById");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var data_validation_1 = require("./validation/data.validation");
//HOME ROUTE
app.get("/", home_1["default"]);
//GET ALL RECORDS - WORKING PROPERLY
app.get("/getallrecords", getAllRecords_1["default"]);
//GET RECORD BY ID - WORKING PROPERLY
app.get("/getrecord/:id", getRecordById_1["default"]);
//ADDING NEW RECORD - WORKING PROPERLY
app.post("/datasets/create", data_validation_1["default"], addRecord_1["default"]);
//UPDATING USER - WORKING PROPERLY
app.put("/datasets/update/:id", data_validation_1["default"], updateRecord_1["default"]);
//DELETING RECORD BY ID - WORKING PROPERLY
app["delete"]("/datasets/delete/:id", deleteRecordById_1["default"]);
//IF USER WILLINGLY CHANGES PATH
app.all("*", function (req, res) {
    res.status(404).send("404! Page not found");
});
app.listen(port, function () {
    console.log("changes are done!");
    console.log("server running in port ".concat(port, "!"));
});
// database1.connect();
exports["default"] = app;
