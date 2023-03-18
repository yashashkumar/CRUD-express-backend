"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const responses_1 = require("../helper/responses");
let getRecordById = (req, res) => {
    let id = req.params['id'];
    newConnection_1.default.query(query_1.getRecordByIdQuery + `'${id}'`, (err, result) => {
        if (err) {
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
    });
    newConnection_1.default.end;
};
exports.default = getRecordById;
