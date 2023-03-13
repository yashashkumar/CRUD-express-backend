"use strict";
exports.__esModule = true;
// let database1 = require("./newConnection");
var newConnection_1 = require("./newConnection");
var query_1 = require("../queries/query");
var dbErrHelperObj_1 = require("./dbErrHelperObj");
//WORKING
var deleteById = function (req, res) {
    var id = req.query.id;
    var deleteMessage = {
        status: 200,
        response: "the record with the id '".concat(id, "' deleted successfully")
    };
    var deleteResObj = {
        status: 400,
        message: "the record with the id '".concat(id, "' is not present")
    };
    newConnection_1["default"].query(query_1.deleteQuery + "'".concat(id, "'"), function (err, result) {
        err
            ? res.status(500).send(dbErrHelperObj_1["default"])
            : result.rowCount === 0
                ? res.status(400).send(deleteResObj)
                : res.send(deleteMessage);
    });
    newConnection_1["default"].end;
};
exports["default"] = deleteById;
