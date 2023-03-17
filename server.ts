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
import updateByPatch from "./routeImplementation/updateUsingPatch";

app.get("/", home);

app.get("/datasets/get", getAllRecords);

app.get("/datasets/getrecord/:id", getRecordById);

app.post("/datasets/create",addDataValidation, addRecord);

app.put("/datasets/update/:id",addDataValidation, updateRecord);

app.delete("/datasets/delete/:id", deleteById);

app.patch("/updatebypatch/:id",addDataValidation,updateByPatch)

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