let database1 = require("./newConnection");
import { getRecordByIdQuery } from "../queries/query";

let getRecordById = (req: any, res: any) => {
  let id: string = req.query.id;
  // console.log(id);

  let resultMessage: object = {
    status: 400,
    result: `the record with the id '${id}' is not present`,
  };

  database1.query(getRecordByIdQuery + `'${id}'`, (err: any, result: any) => {
    if (err) {
      console.log(err);
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
  database1.end;
};

export default getRecordById;