// let database1 = require("./newConnection");
import datasetsDB from "./newConnection";
import { selectAllQuery } from "../queries/query";

const getAllRecords = (req: any, res: any) => {
  //WORKING
  datasetsDB.query(selectAllQuery, (err: any, result: any) => {
    err ? console.log(err) : res.send(result.rows);
  });
  datasetsDB.end;
};

export default getAllRecords;
