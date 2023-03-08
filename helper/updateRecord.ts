let database1 = require("./newConnection");

let updateRecord =(req: any, res: any) => {
    let id:string = req.query.id;
    console.log(id);
    let dataschema:object = req.body.dataschema;
    let routerconfig:object = req.body.routerconfig;
    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);
  
    let status:string = req.body.status;
    let updatedBy:string = req.body.updatedBy;
  
    const today = new Date();
  //   console.log(today.toLocaleDateString());
    let updatedDate: any = today.toLocaleString();
  
    let updatedMessage = {
      status : "updated",
      message : `id with '${id}' updated successfully`
    }

    let unsuccessfulUpdate = {
      status : "update unsuccessful",
      message : `data with specified id '${id}' is not present`
    }

    database1.query(
      `UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
       WHERE id = '${id}'`,
      (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } 
        else if(result.rowCount != 0){
          res.send(updatedMessage);
        }
        else{
          res.send(unsuccessfulUpdate)
        }
      }
    );
    database1.end;
  }

export default updateRecord;