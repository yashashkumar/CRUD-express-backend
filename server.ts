const express = require("express");
const app = express();
const port = 2000;

import home from "./helper/home";
import getAllRecords from "./helper/getAllRecords";
import getRecordById from "./helper/getRecordById";
import addRecord from "./helper/AddRecord";
import updateRecord from "./helper/updateRecord";
import deleteById from "./helper/deleteRecordById";

let database1 = require("./helper/newConnection");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {addDataValidation} = require("./validation/data.validation")

//HOME ROUTE
app.get("/", home);

//GET ALL RECORDS - WORKING PROPERLY
app.get("/get", getAllRecords);

//GET RECORD BY ID - WORKING PROPERLY
app.get("/get/id/:id", getRecordById)

//ADDING NEW RECORD-WORKING PROPERLY
app.post("/datasets/create",addDataValidation, addRecord );

//UPDATING USER - WORKING PROPERLY
app.put("/datasets/id/:id",addDataValidation, updateRecord);

//DELETING RECORD BY ID
app.delete("/datasets/delete/:id", deleteById)

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

database1.connect();

