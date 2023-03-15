// import express from "express";
let express = require("express");
const app = express();
const port = 2000;

import home from "./routeImplementation/home";
import getAllRecords from "./routeImplementation/getAllRecords";
import getRecordById from "./routeImplementation/getRecordById";
import addRecord from "./routeImplementation/addRecord";
import updateRecord from "./routeImplementation/updateRecord";
import deleteById from "./routeImplementation/deleteRecordById";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

import addDataValidation from "./validation/data.validation";

//HOME ROUTE
app.get("/", home);

//GET ALL RECORDS - WORKING PROPERLY
app.get("/get", getAllRecords);

//GET RECORD BY ID - WORKING PROPERLY
app.get("/get/id/:id", getRecordById);

//ADDING NEW RECORD - WORKING PROPERLY
app.post("/datasets/create",addDataValidation, addRecord);

//UPDATING USER - WORKING PROPERLY
app.put("/datasets/id/:id",addDataValidation, updateRecord);

//DELETING RECORD BY ID - WORKING PROPERLY
app.delete("/datasets/delete/:id", deleteById);

//IF USER WILLINGLY CHANGES PATH
app.all("*", (req: any, res: any) => {
  res.status(404).send("404! Page not found");
});

app.listen(port, () => {
  console.log("changes are done!");
  console.log(`server running in port ${port}!`);
});

// database1.connect();
export default app;