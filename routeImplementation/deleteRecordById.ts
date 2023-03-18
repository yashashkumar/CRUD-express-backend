import datasetsDB from "./newConnection";
import { deleteQuery } from "../helper/query";
import { dbErr, deleteMessage, idNotFound } from "../helper/responses";

//WORKING
let deleteById = (req: any, res: any) => {
  let id: string = req.params["id"];
  datasetsDB.query(deleteQuery + `'${id}'`, (err: any, result: any) => {
    err
      ? res.status(500).send(dbErr)
      : result.rowCount === 0
      ? res.status(400).send(idNotFound)
      : res.send(deleteMessage);
  });
  datasetsDB.end;
};

export default deleteById;
