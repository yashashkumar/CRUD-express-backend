const express = require("express");
const app = express();
const port = 3000;

let database1 = require("./connection");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req: any, res: any) => {
  // res.send("yey your server setup is successful")
  // res.sendFile( __dirname+"/index.html")
  res.send("Hello World!");
});

// let getAllData = "SELECT * FROM emp"; //query to get all users
app.get("/getemp", (req: any, res: any) => { //WORKING
    database1.query(`SELECT * FROM emp`, (err: any, result: any) => {
      if(err){
          console.log(err.message);
      }
      else{
          res.send(result);
        // let data = req.body;
        // res.send('Data Received: ' + JSON.stringify(data));
      }
    });
    database1.end;
  });


//GET RECORD BY ID
app.get("/:id", (req:any ,res:any)=>{ //   WORKING
    let eid = req.query.eid;
    database1.query(`SELECT * FROM emp WHERE empid= ${eid}`,(err:any , result:any)=>{
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

//adding new employee
app.post("/addemp", (req: any, res: any) => {  //WORKING
  let eid: number = req.body.eid;
  let ename: string = req.body.ename;
  let fname: string = req.body.fname;
  let lname: string = req.body.lname;
  let subname: any = {
    fname: `${fname}`,
    lname: `${lname}`,
  };
  let phno: number = req.body.phno;
  let location: string = req.body.location;

  // to generate date
  const today = new Date();
//   console.log(today.toLocaleDateString()); // 3/28/2022 (depending on locale)
  let createdDate: any = today.toLocaleDateString();

  //parsing the json values to string
  let subnameJson = JSON.stringify(subname);

  //INSERTING EMP DETAILS
  database1.query(
    `INSERT INTO emp VALUES(${eid},'${ename}','${subnameJson}',${phno},'${location}','${createdDate}')`,
    (error: any, result: any) => {
      if (error && error.code === "23505") {
        console.log(error.message);
      } 
    // if(error){
    //     // throw Error(`user with id ${eid} is already present`);
    //     console.log(error);
    // }
    else {
        // let data = req.body;
        // res.send('Data Received: ' + JSON.stringify(data));
        res.send(result);
      }
    }
  );
  database1.end;
});

//UPDATING USER
app.put("/emp/id/:id", (req: any, res: any) => {
  let eid = req.query.eid;
  console.log(eid);
  let ename = req.body.ename;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let subname: any = {
    fname: `${fname}`,
    lname: `${lname}`,
  };
  //parsing the json values to string
  let subnameJson = JSON.stringify(subname);

  let phno = req.body.phno;
  let location = req.body.location;

  const today = new Date();
//   console.log(today.toLocaleDateString());
  let updatedDate: any = today.toLocaleString();

  database1.query(
    `UPDATE emp 
     SET ename = '${ename}' ,subname = '${subnameJson}',phno = ${phno} ,location = '${location}',updated_date = '${updatedDate}' 
     WHERE empid = ${eid}`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
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

app.delete("/delete/:id", (req:any,res:any)=>{ //WORKING
    let eid = req.query.eid;
    database1.query(`DELETE FROM emp WHERE empid = ${eid}`,(err:any , result:any)=>{
        // let data = req.body;
        // let resObj = JSON.stringify(data);
        if(res.json(null)){
            console.log(`data with id ${eid} not present`);
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
