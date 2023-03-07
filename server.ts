const express = require("express");
const app = express();
const port = 3000;

import home from "./helper/home";
import getAllRecords from "./helper/getAllRecords";
import getRecordById from "./helper/getRecordById";
import addRecord from "./helper/AddRecord";
import updateRecord from "./helper/updateRecord";
import deleteById from "./helper/deleteRecordById";

let database1 = require("./helper/newConnection");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", home);

//GET ALL RECORDS - WORKING PROPERLY
app.get("/get", getAllRecords);

//GET RECORD BY ID - WORKING PROPERLY
app.get("/get/:id", getRecordById)

//ADDING NEW RECORD-WORKING PROPERLY
app.post("/datasets/create", addRecord);

//UPDATING USER - WORKING PROPERLY
app.put("/datasets/id/:id", updateRecord);

//DELETING RECORD BY ID
app.delete("/datasets/delete/:id", deleteById)

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

database1.connect();


//hardcoding new employee
// database1.query(`INSERT INTO emp VALUES(2,'hello','{"fname":"hello","lname":"world"}',123456789,'banglore','2023-03-06 10:38:20.768541','null')` ,(error:any ,result:any)=>{
//     console.log(result);
//     // let data = req.body;
//     // res.send('Data Received: ' + JSON.stringify(data));
//     database1.end;
// })

// HARDCODING
// database1.query(
//     `UPDATE emp
//      SET ename = 'prajwal123' ,phno = 123456789 ,location = 'banglore',updated_date = '06-03-23'
//      WHERE empid = 3`,
//     (err: any, result: any) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
//DELETING USER BY ID
// database1.query(
//     `DELETE FROM emp
//      WHERE empid = 3`,
//     (err: any, result: any) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );

