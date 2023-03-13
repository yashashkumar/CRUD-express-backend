"use strict";
exports.__esModule = true;
// let database1 = require("./newConnection");
var newConnection_1 = require("./newConnection");
var query_1 = require("../queries/query");
var getAllRecords = function (req, res) {
    //WORKING
    newConnection_1["default"].query(query_1.selectAllQuery, function (err, result) {
        err ? res.status(500).send({ error: "database error", status: 500 }) : res.send(result.rows);
    });
    newConnection_1["default"].end;
};
exports["default"] = getAllRecords;
