"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cddate_1 = require("../helper/cddate");
const query_1 = require("../helper/query");
const dbErrHelperObj_1 = __importDefault(require("./dbErrHelperObj"));
const newConnection_1 = __importDefault(require("./newConnection"));
let updateByPatch = (req, res) => {
    let id = req.params["id"];
    let unsuccessfulUpdate = {
        status: 400,
        message: `data with specified id '${id}' is not present`,
    };
    newConnection_1.default.query(query_1.getRecordByIdQuery + `'${id}'`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.rowCount === 0) {
            res.status(400).send(unsuccessfulUpdate);
        }
        else {
            // console.log(result.rows[0]);
            let dataschema = req.body.dataschema || result.rows[0].data_schema;
            let routerconfig = req.body.routerconfig || result.rows[0].router_config;
            //parsing the json values to string
            let dataSchema = JSON.stringify(dataschema);
            let routerConfig = JSON.stringify(routerconfig);
            let status = req.body.status || result.rows[0].status;
            let updatedBy = req.body.updatedBy || result.rows[0].updated_by;
            let updatedMessage = {
                status: "updated",
                message: `id with '${id}' updated successfully`,
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
        }
    });
    newConnection_1.default.end;
};
exports.default = updateByPatch;
