// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { deleteQuery } from "../helper/query";

import dbErr from "./dbErrHelperObj";

//WORKING
let deleteById = (req: any, res: any) => {
  let id: string = req.params['id'];

  let deleteMessage: object = {
    status: 200,
    response: `the record with the id '${id}' deleted successfully`,
  };

  let deleteResObj: object = {
    status: 400,
    message: `the record with the id '${id}' is not present`,
    // record: result.rows
  };
  datasetsDB.query(deleteQuery + `'${id}'`, (err: any, result: any) => {
    err
      ? res.status(500).send(dbErr)
      : result.rowCount === 0
      ? res.status(400).send(deleteResObj)
      : res.send(deleteMessage);
  });
  datasetsDB.end;
};

export default deleteById;
