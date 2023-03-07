let database1 = require("./newConnection");

let addRecord = (req: any, res: any) => {  
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
  
    database1.query(`SELECT * FROM datasets WHERE id = '${id}'`,(err :any,result:any)=>{
      // console.log(result);
      if(result.rowCount === 0){
        database1.query(
          `INSERT INTO datasets VALUES('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`,
          (error: any, result: any) => {
            //PRIMARY KEY VALIDATION
            if (error) {
              console.log(error.message);
            } 
          else {
              // let data = req.body;
              // res.send('Data Received: ' + JSON.stringify(data));
              res.send(result);
            }
          }
        );
      }
      else{
        console.log(`id '${id}' already present`);
      }
    })
    database1.end;
  
    //INSERTING EMP DETAILS
    
  }

  export default addRecord;