"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const dbErrHelperObj_1 = __importDefault(require("./dbErrHelperObj"));
const cddate_1 = require("../helper/cddate");
let updateRecord = (req, res) => {
    let id = req.query.id;
    let dataschema = req.body.dataschema;
    let routerconfig = req.body.routerconfig;
    //parsing the json values to string
    let dataSchema = JSON.stringify(dataschema);
    let routerConfig = JSON.stringify(routerconfig);
    let status = req.body.status;
    let updatedBy = req.body.updatedBy;
    let updatedMessage = {
        status: "updated",
        message: `id with '${id}' updated successfully`,
    };
    let unsuccessfulUpdate = {
        status: 400,
        message: `data with specified id '${id}' is not present`,
    };
    newConnection_1.default.query(`UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${cddate_1.updatedDate}' 
       WHERE id = '${id}'`, (err, result) => {
        err
            ? res.status(500).send(dbErrHelperObj_1.default)
            : result.rowCount != 0
                ? res.send(updatedMessage)
                : res.status(400).send(unsuccessfulUpdate);
    });
    newConnection_1.default.end;
};
exports.default = updateRecord;
