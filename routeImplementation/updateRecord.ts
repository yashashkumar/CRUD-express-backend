// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import dbErr from "./dbErrHelperObj";

let updateRecord = (req: any, res: any) => {
  let id: string = req.query.id;
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  let status: string = req.body.status;
  let updatedBy: string = req.body.updatedBy;

  const today = new Date();
  //console.log(today.toLocaleDateString());
  let updatedDate: any = today.toLocaleString('en-GB');

  let updatedMessage = {
    status: "updated",
    message: `id with '${id}' updated successfully`,
  };

  let unsuccessfulUpdate = {
    status: 400,
    message: `data with specified id '${id}' is not present`,
  };

  datasetsDB.query(
    `UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
       WHERE id = '${id}'`,
    (err: any, result: any) => {
      err
        ? res.status(500).send(dbErr)
        : result.rowCount != 0
        ? res.send(updatedMessage)
        : res.status(400).send(unsuccessfulUpdate);
    }
  );
  datasetsDB.end;
};

export default updateRecord;
