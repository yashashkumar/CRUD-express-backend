"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const responses_1 = require("../helper/responses");
const cddate_1 = require("../helper/cddate");
let updateRecord = (req, res) => {
    let id = req.params["id"];
    let dataschema = req.body.dataschema;
    let routerconfig = req.body.routerconfig;
    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);
    let status = req.body.status;
    let updatedBy = req.body.updatedBy;
    newConnection_1.default.query(`UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${cddate_1.updatedDate}' 
       WHERE id = '${id}'`, (err, result) => {
        err
            ? res.status(500).send(responses_1.dbErr)
            : result.rowCount != 0
                ? res.send(responses_1.updatedMessage)
                : res.status(400).send(responses_1.unsuccessfulUpdate);
    });
    newConnection_1.default.end;
};
exports.default = updateRecord;
