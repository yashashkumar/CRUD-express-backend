let database1 = require("./newConnection");

let updateRecord =(req: any, res: any) => {
    let id = req.query.id;
    console.log(id);
    let dataschema:object = req.body.dataschema;
    let method:string = req.body.method;
    let routerconfig:object = req.body.routerconfig;
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
          res.send(req.body);
        }
      }
    );
    database1.end;
  }

export default updateRecord;