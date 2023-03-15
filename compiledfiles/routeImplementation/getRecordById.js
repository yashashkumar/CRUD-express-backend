"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const dbErrHelperObj_1 = __importDefault(require("./dbErrHelperObj"));
let getRecordById = (req, res) => {
    let id = req.query.id;
    // console.log(id);
    let resultMessage = {
        status: 400,
        result: `the record with the id '${id}' is not present`,
    };
    newConnection_1.default.query(query_1.getRecordByIdQuery + `'${id}'`, (err, result) => {
        if (err) {
            res.status(500).send(dbErrHelperObj_1.default);
        }
        else if (result.rowCount != 0) {
            let resultObjByID = {
                message: `the record associated with the id '${id}' is`,
                record: result.rows,
            };
            res.send(resultObjByID);
        }
        else {
            res.status(400).send(resultMessage);
        }
    });
    newConnection_1.default.end;
};
exports.default = getRecordById;
