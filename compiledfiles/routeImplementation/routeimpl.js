"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateByPatch = exports.updateRecord = exports.deleteById = exports.addRecord = exports.getRecordById = exports.pool = exports.getAllRecords = void 0;
require("dotenv").config();
const { Pool, Client } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
exports.pool = pool;
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
const query_1 = require("../helper/query");
const cddate_1 = require("../helper/cddate");
console.log(cddate_1.updatedDate);
const responses_1 = require("../helper/responses");
const getAllRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //WORKING
    let result = yield pool.query("SELECT * FROM datasets");
    console.log(result);
    result.err
        ? res.status(500).send({ error: "database error", status: 500 })
        : result.rowCount === 0
            ? res.status(204).send()
            : res.send(result.rows);
    // pool.end;
});
exports.getAllRecords = getAllRecords;
let getRecordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params["id"];
    let result = yield pool.query(query_1.getRecordByIdQuery + `'${id}'`);
    if (result.err) {
        res.status(500).send(responses_1.dbErr);
    }
    else if (result.rowCount != 0) {
        let resultObjByID = {
            message: `the record associated with the id '${id}' is`,
            record: result.rows,
        };
        res.send(resultObjByID);
    }
    else {
        res.status(400).send(responses_1.idNotFound);
    }
    // pool.end;
});
exports.getRecordById = getRecordById;
// // pool.connect();
let addRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.body.id;
    let dataschema = req.body.dataschema;
    let routerconfig = req.body.routerconfig;
    let status = req.body.status;
    let createdBy = req.body.createdBy;
    let updatedBy = req.body.updatedBy;
    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);
    //PRIMARY KEY VALIDATION
    let selectResult = yield pool.query(query_1.getRecordByIdQuery + `'${id}'`);
    // console.log(result);
    if (selectResult.rowCount === 0) {
        let result = yield pool.query(query_1.insertQuery +
            `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${cddate_1.createdDate}','${cddate_1.updatedDate}')`);
        result.error
            ? res.status(500).send(responses_1.dbErr)
            : res.status(201).send(responses_1.insertSuccessful);
    }
    else {
        res.status(400).send(responses_1.primaryKeyViolation);
    }
    // pool.end;
});
exports.addRecord = addRecord;
// //WORKING
let deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params["id"];
    let result = yield pool.query(query_1.deleteQuery + `'${id}'`);
    result.err
        ? res.status(500).send(responses_1.dbErr)
        : result.rowCount === 0
            ? res.status(400).send(responses_1.idNotFound)
            : res.send(responses_1.deleteMessage);
    // pool.end;
});
exports.deleteById = deleteById;
let updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params["id"];
    let dataschema = req.body.dataschema;
    let routerconfig = req.body.routerconfig;
    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);
    let status = req.body.status;
    let updatedBy = req.body.updatedBy;
    let result = yield pool.query(`UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${cddate_1.updatedDate}' 
       WHERE id = '${id}'`);
    result.err
        ? res.status(500).send(responses_1.dbErr)
        : result.rowCount != 0
            ? res.send(responses_1.updatedMessage)
            : res.status(400).send(responses_1.unsuccessfulUpdate);
    // pool.end;
});
exports.updateRecord = updateRecord;
let updateByPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params["id"];
    let result = yield pool.query(query_1.getRecordByIdQuery + `'${id}'`);
    if (result.err) {
        console.log(result.err);
    }
    else if (result.rowCount === 0) {
        res.status(400).send(responses_1.unsuccessfulUpdate);
    }
    else {
        // console.log(result.rows[0]);
        let dataschema = req.body.dataschema || result.rows[0].data_schema;
        let routerconfig = req.body.routerconfig || result.rows[0].router_config;
        let status = req.body.status || result.rows[0].status;
        let updatedBy = req.body.updatedBy || result.rows[0].updated_by;
        //parsing the json values to string
        let dataSchema = JSON.stringify(dataschema);
        let routerConfig = JSON.stringify(routerconfig);
        let responseResult = yield pool.query(`UPDATE datasets 
             SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${cddate_1.updatedDate}' 
             WHERE id = '${id}'`);
        responseResult.err
            ? res.status(500).send(responses_1.dbErr)
            : responseResult.rowCount != 0
                ? res.send(responses_1.updatedMessage)
                : res.status(400).send(responses_1.unsuccessfulUpdate);
    }
    // pool.end;
});
exports.updateByPatch = updateByPatch;
