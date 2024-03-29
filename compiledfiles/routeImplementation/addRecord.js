"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const query_2 = require("../helper/query");
const cddate_1 = require("../helper/cddate");
const responses_1 = require("../helper/responses");
let addRecord = (req, res) => {
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
    newConnection_1.default.query(query_1.getRecordByIdQuery + `'${id}'`, (err, result) => {
        // console.log(result);
        if (result.rowCount === 0) {
            newConnection_1.default.query(query_2.insertQuery +
                `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${cddate_1.createdDate}','${cddate_1.updatedDate}')`, (error, result) => {
                error ? res.send(responses_1.dbErr) : res.status(201).send(responses_1.insertSuccessful);
            });
        }
        else {
            res.status(400).send(responses_1.primaryKeyViolation);
        }
    });
    newConnection_1.default.end;
};
exports.default = addRecord;
