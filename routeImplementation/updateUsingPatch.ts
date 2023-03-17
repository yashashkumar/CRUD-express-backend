import { updatedDate } from "../helper/cddate";
import { getRecordByIdQuery } from "../helper/query";
import dbErr from "./dbErrHelperObj";
import datasetsDB from "./newConnection";

let updateByPatch = (req: any, res: any) => {
  let id: string = req.params["id"];
  let unsuccessfulUpdate = {
    status: 400,
    message: `data with specified id '${id}' is not present`,
  };
  datasetsDB.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else if (result.rowCount === 0) {
      res.status(400).send(unsuccessfulUpdate);
    } else {
      // console.log(result.rows[0]);
      let dataschema: object =
        req.body.dataschema || result.rows[0].data_schema;
      let routerconfig: object =
        req.body.routerconfig || result.rows[0].router_config;
      //parsing the json values to string
      let dataSchema = JSON.stringify(dataschema);
      let routerConfig = JSON.stringify(routerconfig);

      let status: string = req.body.status || result.rows[0].status;
      let updatedBy: string = req.body.updatedBy || result.rows[0].updated_by;

      let updatedMessage = {
        status: "updated",
        message: `id with '${id}' updated successfully`,
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
    }
  });
  datasetsDB.end;
};
export default updateByPatch;
