// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";

import { getRecordByIdQuery } from "../queries/query";
import { insertQuery } from "../queries/query";

import dbErr from "./dbErrHelperObj";

let addRecord = (req: any, res: any) => {
  let id: string = req.body.id;
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  let status: string = req.body.status;
  let createdBy: string = req.body.createdBy;
  let updatedBy: string = req.body.updatedBy;

  // to generate date
  const today = new Date();
  // console.log(today.toLocaleDateString()); // 3/28/2022 (depending on locale)
  let createdDate: any = today.toLocaleString("en-GB");
  let updatedDate: any = today.toLocaleString("en-GB");

  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  let errObj: object = {
    error: "PRIMARY_KEY_VIOLATION",
    status: 400,
    message: `the id '${id}' already present in database'`,
  };
  
  //PRIMARY KEY VALIDATION
  datasetsDB.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    // console.log(result);
    if (result.rowCount === 0) {
      datasetsDB.query(
        insertQuery +
          `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`,
        (error: any, result: any) => {
          error ? res.status(500).send(dbErr) : res.send(result);
        }
      );
    } else {
      res.status(400).send(errObj);
    }
  });
  datasetsDB.end;
};

export default addRecord;
