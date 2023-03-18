// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";

import { getRecordByIdQuery } from "../helper/query";
import { insertQuery } from "../helper/query";

import { createdDate, updatedDate } from "../helper/cddate";
import { primaryKeyViolation,dbErr, insertSuccessful } from "../helper/responses";

let addRecord = (req: any, res: any) => {
  let id: string = req.body.id;
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  let status: string = req.body.status;
  let createdBy: string = req.body.createdBy;
  let updatedBy: string = req.body.updatedBy;

  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  //PRIMARY KEY VALIDATION
  datasetsDB.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    // console.log(result);
    if (result.rowCount === 0) {
      datasetsDB.query(
        insertQuery +
          `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`,
        (error: any, result: any) => {
          error ? res.send(dbErr) : res.status(201).send(insertSuccessful);
        }
      );
    } else {
      res.status(400).send(primaryKeyViolation);
    }
  });
  datasetsDB.end;
};

export default addRecord;
