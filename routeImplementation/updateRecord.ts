// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { dbErr, unsuccessfulUpdate, updatedMessage } from "../helper/responses";
import { updatedDate } from "../helper/cddate";

let updateRecord = (req: any, res: any) => {
  let id: string = req.params["id"];
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  let status: string = req.body.status;
  let updatedBy: string = req.body.updatedBy;

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
