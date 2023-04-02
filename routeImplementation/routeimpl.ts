require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// const client = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: 5432,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
// });

// pool.connect(function (err: any, res: any) {
//   if (err) {
//     console.error("Bad connection");
//     console.log(err);
//     try {
//       throw err;
//     } catch (err) {
//       console.error({
//         "error code": 502,
//         "error message": "Bad gateway",
//       });
//     }
//   } else {
//     console.log("Connected!");
//   }
// });

import {
  selectAllQuery,
  insertQuery,
  getRecordByIdQuery,
  deleteQuery,
} from "../helper/query";

import { updatedDate, createdDate } from "../helper/cddate";
console.log(updatedDate);

import {
  primaryKeyViolation,
  insertSuccessful,
  idNotFound,
  dbErr,
  unsuccessfulUpdate,
  updatedMessage,
  deleteMessage,
} from "../helper/responses";

const getAllRecords = async (req: any, res: any) => {
  //WORKING
  let result = await pool.query("SELECT * FROM datasets");
  console.log(result);
  result.err
    ? res.status(500).send({ error: "database error", status: 500 })
    : result.rowCount === 0
    ? res.status(204).send()
    : res.send(result.rows);

  // pool.end;
};

let getRecordById = async (req: any, res: any) => {
  let id: string = req.params["id"];
  let result = await pool.query(getRecordByIdQuery + `'${id}'`);
  if (result.err) {
    res.status(500).send(dbErr);
  } else if (result.rowCount != 0) {
    let resultObjByID: object = {
      message: `the record associated with the id '${id}' is`,
      record: result.rows,
    };
    res.send(resultObjByID);
  } else {
    res.status(400).send(idNotFound);
  }
  // pool.end;
};

// // pool.connect();

let addRecord = async (req: any, res: any) => {
  let id: string = req.body.id;
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  let status: string = req.body.status;
  let createdBy: string = req.body.createdBy;
  let updatedBy: string = req.body.updatedBy;

  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  //PRIMARY KEY VALIDATION
  let selectResult = await pool.query(getRecordByIdQuery + `'${id}'`);
  // console.log(result);
  if (selectResult.rowCount === 0) {
    let result = await pool.query(
      insertQuery +
        `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`
    );
    result.error
      ? res.status(500).send(dbErr)
      : res.status(201).send(insertSuccessful);
  } else {
    res.status(400).send(primaryKeyViolation);
  }
  // pool.end;
};

// //WORKING
let deleteById = async (req: any, res: any) => {
  let id: string = req.params["id"];
  let result = await pool.query(deleteQuery + `'${id}'`);
  result.err
    ? res.status(500).send(dbErr)
    : result.rowCount === 0
    ? res.status(400).send(idNotFound)
    : res.send(deleteMessage);
  // pool.end;
};

let updateRecord = async (req: any, res: any) => {
  let id: string = req.params["id"];
  let dataschema: object = req.body.dataschema;
  let routerconfig: object = req.body.routerconfig;
  //parsing the json values to string
  let dataSchema = JSON.stringify(dataschema);
  let routerConfig = JSON.stringify(routerconfig);

  let status: string = req.body.status;
  let updatedBy: string = req.body.updatedBy;

  let result = await pool.query(
    `UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
       WHERE id = '${id}'`
  );

  result.err
    ? res.status(500).send(dbErr)
    : result.rowCount != 0
    ? res.send(updatedMessage)
    : res.status(400).send(unsuccessfulUpdate);
  // pool.end;
};

let updateByPatch = async (req: any, res: any) => {
  let id: string = req.params["id"];
  let result = await pool.query(getRecordByIdQuery + `'${id}'`);
  if (result.err) {
    console.log(result.err);
  } else if (result.rowCount === 0) {
    res.status(400).send(unsuccessfulUpdate);
  } else {
    // console.log(result.rows[0]);
    let dataschema: object = req.body.dataschema || result.rows[0].data_schema;
    let routerconfig: object =
      req.body.routerconfig || result.rows[0].router_config;
    let status: string = req.body.status || result.rows[0].status;
    let updatedBy: string = req.body.updatedBy || result.rows[0].updated_by;

    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);

    let responseResult = await pool.query(
      `UPDATE datasets 
             SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
             WHERE id = '${id}'`
    );
    responseResult.err
      ? res.status(500).send(dbErr)
      : responseResult.rowCount != 0
      ? res.send(updatedMessage)
      : res.status(400).send(unsuccessfulUpdate);
  }
  // pool.end;
};

export {
  getAllRecords,
  pool,
  getRecordById,
  addRecord,
  deleteById,
  updateRecord,
  updateByPatch,
};
