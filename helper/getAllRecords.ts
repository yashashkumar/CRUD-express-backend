let database1 = require("./newConnection");

const getAllRecords = (req: any, res: any) => { //WORKING
  let recordResult = {
    message : "no records found in the table"
  }
    database1.query(`SELECT * FROM datasets`, (err: any, result: any) => {
      if(err){
          console.log(err.message);
      }
      else if(result.rowCount === 0){
          res.send(recordResult);
      }
      else{
          res.send(result.rows);
      }
    });
    database1.end;
  }

  export default getAllRecords;