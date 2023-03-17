"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const dbErrHelperObj_1 = __importDefault(require("./dbErrHelperObj"));
//WORKING
let deleteById = (req, res) => {
    let id = req.params['id'];
    let deleteMessage = {
        status: 200,
        response: `the record with the id '${id}' deleted successfully`,
    };
    let deleteResObj = {
        status: 400,
        message: `the record with the id '${id}' is not present`,
        // record: result.rows
    };
    newConnection_1.default.query(query_1.deleteQuery + `'${id}'`, (err, result) => {
        err
            ? res.status(500).send(dbErrHelperObj_1.default)
            : result.rowCount === 0
                ? res.status(400).send(deleteResObj)
                : res.send(deleteMessage);
    });
    newConnection_1.default.end;
};
exports.default = deleteById;
