// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { getRecordByIdQuery } from "../helper/query";
import dbErr from "./dbErrHelperObj";

let getRecordById = (req: any, res: any) => {
  let id: string = req.query.id;
  // console.log(id);

  let resultMessage: object = {
    status: 400,
    result: `the record with the id '${id}' is not present`,
  };

  datasetsDB.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    if (err) {
      res.status(500).send(dbErr)
    } else if (result.rowCount != 0) {
      let resultObjByID: object = {
        message: `the record associated with the id '${id}' is`,
        record: result.rows,
      };
      res.send(resultObjByID);
    } else {
      res.status(400).send(resultMessage);
    }
  });
  datasetsDB.end;
};

export default getRecordById;
