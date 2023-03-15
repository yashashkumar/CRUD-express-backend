"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let database1 = require("./newConnection");
const newConnection_1 = __importDefault(require("./newConnection"));
const query_1 = require("../helper/query");
const getAllRecords = (req, res) => {
    //WORKING
    newConnection_1.default.query(query_1.selectAllQuery, (err, result) => {
        err ? res.status(500).send({ error: "database error", status: 500 }) : res.send(result.rows);
    });
    newConnection_1.default.end;
};
exports.default = getAllRecords;
