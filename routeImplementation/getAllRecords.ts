// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { selectAllQuery } from "../helper/query";

const getAllRecords = (req: any, res: any) => {
  //WORKING
  datasetsDB.query(selectAllQuery, (err: any, result: any) => {
    err ? res.status(500).send({error : "database error",status : 500}) : res.send(result.rows);
  });
  datasetsDB.end;
};

export default getAllRecords;
