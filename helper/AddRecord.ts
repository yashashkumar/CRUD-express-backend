let database1 = require("./newConnection");

let addRecord = (req: any, res: any) => {
  let id: string = req.body.id;
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  // console.log(routerconfig);
  let status: string = req.body.status;
  let createdBy: string = req.body.createdBy;
  let updatedBy: string = req.body.updatedBy;

  // to generate date
  const today = new Date();
  // console.log(today.toLocaleDateString()); // 3/28/2022 (depending on locale)
  let createdDate: any = today.toLocaleString();
  let updatedDate: any = today.toLocaleString();

  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);
  // console.log(routerConfig);

  let errObj: object = {
    error: "PRIMARY_KEY_VIOLATION",
    ststus: "",
    message: `the id '${id}' already present in database'`,
  };

  let invalidIp = {
    error: "SYNTAX_FOR_TYPE_JSON",
    status: "",
    "err-message": "invalid input syntax for type json",
  };

  //PRIMARY KEY VALIDATION
  database1.query(
    `SELECT * FROM datasets WHERE id = '${id}'`,
    (err: any, result: any) => {
      // console.log(result);
      if (result.rowCount === 0) {
        database1.query(
          `INSERT INTO datasets VALUES('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`,
          (error: any, result: any) => {
            if (error) {
              console.log(error);
            } else {
              // let data = req.body;
              // res.send('Data Received: ' + JSON.stringify(data));
              res.send(result);
            }
          }
        );
      } else {
        res.send(errObj);
        console.log(`id '${id}' already present`);
      }
    }
  );
  database1.end;

  //INSERTING EMP DETAILS
};

export default addRecord;
// module.exports = addRecord;
