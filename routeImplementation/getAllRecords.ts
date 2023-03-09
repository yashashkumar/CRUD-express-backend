let database1 = require("./newConnection");
import { selectAllQuery } from "../queries/query";

const getAllRecords = (req: any, res: any) => {
  //WORKING
  database1.query(selectAllQuery, (err: any, result: any) => {
    err ? err : res.send(result.rows);
  });
  database1.end;
};

export default getAllRecords;
