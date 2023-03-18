import datasetsDB from "./newConnection";
import { getRecordByIdQuery } from "../helper/query";
import { dbErr, idNotFound } from "../helper/responses";

let getRecordById = (req: any, res: any) => {
  let id: string = req.params['id'];

  

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
      res.status(400).send(idNotFound);
    }
  });
  datasetsDB.end;
};

export default getRecordById;
