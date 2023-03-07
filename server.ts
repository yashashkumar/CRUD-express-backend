const express = require("express");
const app = express();
const port = 3000;

let database1 = require("./newConnection");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req: any, res: any) => {  //WORKING
  // res.send("yey your server setup is successful")
  // res.sendFile( __dirname+"/index.html")
  res.send("Hello World!")
});

//GET ALL RECORDS - WORKING PROPERLY
app.get("/get", (req: any, res: any) => { //WORKING
    database1.query(`SELECT * FROM datasets`, (err: any, result: any) => {
      if(err){
          console.log(err.message);
      }
      else{
          res.send(result.rows);
        // let data = req.body;
        // res.send('Data Received: ' + JSON.stringify(data));
      }
    });
    database1.end;
  });


//GET RECORD BY ID - WORKING PROPERLY
app.get("/get/:id", (req:any ,res:any)=>{ 
    let id:string = req.query.id;
    database1.query(`SELECT * FROM datasets WHERE id= '${id}'`,(err:any , result:any)=>{
        if(err){
            console.log(err);
        }
        else{
            // let data = req.body;
            res.send(result);
        }
    })
    database1.end;
})
//hardcoding new employee
// database1.query(`INSERT INTO emp VALUES(2,'hello','{"fname":"hello","lname":"world"}',123456789,'banglore','2023-03-06 10:38:20.768541','null')` ,(error:any ,result:any)=>{
//     console.log(result);
//     // let data = req.body;
//     // res.send('Data Received: ' + JSON.stringify(data));
//     database1.end;
// })

//ADDING NEW RECORD-WORKING PROPERLY
app.post("/datasets/create", (req: any, res: any) => {  
  let id: string = req.body.id;
  let fname: string = req.body.fname;
  let lname: string = req.body.lname;
  let dataschema: any = {
    fname: `${fname}`,
    lname: `${lname}`,
  };
  let method:string = req.body.method;
  let routerconfig:any = {
      method : `${method}`
  }
  let status:string = req.body.status; 
  let createdBy: string = req.body.createdBy;
  let updatedBy:string = req.body.updatedBy

  // to generate date
  const today = new Date();
//   console.log(today.toLocaleDateString()); // 3/28/2022 (depending on locale)
  let createdDate: any = today.toLocaleString();
  let updatedDate: any = today.toLocaleString();

  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  //INSERTING EMP DETAILS
  database1.query(
    `INSERT INTO datasets VALUES('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`,
    (error: any, result: any) => {
      //PRIMARY KEY VALIDATION
      if (error && error.code === "23505") {
        console.log(error.message);
      } 
    else {
        // let data = req.body;
        // res.send('Data Received: ' + JSON.stringify(data));
        res.send(result);
      }
    }
  );
  database1.end;
});

//UPDATING USER - WORKING PROPERLY
app.put("/datasets/id/:id", (req: any, res: any) => {
  let id = req.query.id;
  console.log(id);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let dataschema: any = {
    fname: `${fname}`,
    lname: `${lname}`,
  };
  let method:string = req.body.method;
  let routerconfig = {
    method : `${method}`
  }
  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  let status = req.body.status;
  let updatedBy = req.body.updatedBy;

  const today = new Date();
//   console.log(today.toLocaleDateString());
  let updatedDate: any = today.toLocaleString();

  database1.query(
    `UPDATE datasets 
     SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
     WHERE id = '${id}'`,
    (err: any, result: any) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
  database1.end;
});
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

//DELETING RECORD BY ID
app.delete("/datasets/delete/:id", (req:any,res:any)=>{ //WORKING
    let id:string = req.query.id;
    database1.query(`DELETE FROM datasets WHERE id = '${id}'`,(err:any , result:any)=>{
        // let data = req.body;
        // let resObj = JSON.stringify(data);
        if(res.json(null)){
            console.log(`data with id '${id}' not present`);
        }
        else{
            let data = req.body;
            console.log(JSON.stringify(data));
            res.send('Data Received: ' + JSON.stringify(data));
        }
    })
    database1.end;
})

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

database1.connect();
