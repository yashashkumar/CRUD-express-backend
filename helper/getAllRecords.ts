let database1 = require("./newConnection");

const getAllRecords = (req: any, res: any) => { //WORKING
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
  }

  export default getAllRecords;