// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { deleteQuery } from "../queries/query";

//WORKING
let deleteById = (req: any, res: any) => {
  let id: string = req.query.id;

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
      ? console.log(err)
      : result.rowCount === 0
      ? res.status(400).send(deleteResObj)
      : res.send(deleteMessage);
  });
  datasetsDB.end;
};

export default deleteById;
