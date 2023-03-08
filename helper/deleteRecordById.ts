let database1 = require("./newConnection");

let deleteById = (req: any, res: any) => {
  //WORKING
  let id: string = req.query.id;

  let deleteMessage: object = {
    response: `the record with the id '${id}' deleted successfully`,
  };
  
  let deleteResObj: object = {
    message: `the record with the id '${id}' is not present`,
    // record: result.rows
  };
  database1.query(
    `DELETE FROM datasets WHERE id = '${id}'`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      } else if (result.rowCount === 0) {
        res.send(deleteResObj);
      } else {
        // let data = req.body;
        // console.log(JSON.stringify(data));
        res.send(deleteMessage);
      }
    }
  );
  database1.end;
};

export default deleteById;
