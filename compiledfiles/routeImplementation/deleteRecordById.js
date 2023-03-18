"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const responses_1 = require("../helper/responses");
//WORKING
let deleteById = (req, res) => {
    let id = req.params["id"];
    newConnection_1.default.query(query_1.deleteQuery + `'${id}'`, (err, result) => {
        err
            ? res.status(500).send(responses_1.dbErr)
            : result.rowCount === 0
                ? res.status(400).send(responses_1.idNotFound)
                : res.send(responses_1.deleteMessage);
    });
    newConnection_1.default.end;
};
exports.default = deleteById;
