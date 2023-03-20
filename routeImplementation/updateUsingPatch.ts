import { updatedDate } from "../helper/cddate";
import { getRecordByIdQuery } from "../helper/query";
import { dbErr, unsuccessfulUpdate, updatedMessage } from "../helper/responses";
import datasetsDB from "./newConnection";

let updateByPatch = (req: any, res: any) => {
  let id: string = req.params["id"];
  datasetsDB.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else if (result.rowCount === 0) {
      res.status(400).send(unsuccessfulUpdate);
    } else {
      // console.log(result.rows[0]);
      let dataschema: object = req.body.dataschema || result.rows[0].data_schema;
      let routerconfig: object = req.body.routerconfig || result.rows[0].router_config;
      let status: string = req.body.status || result.rows[0].status;
      let updatedBy: string = req.body.updatedBy || result.rows[0].updated_by;

      //parsing the json values to string
      let dataSchema = JSON.stringify(dataschema);
      let routerConfig = JSON.stringify(routerconfig);

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
    }
  });
  datasetsDB.end;
};
export default updateByPatch;
