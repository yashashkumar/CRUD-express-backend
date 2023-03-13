"use strict";
exports.__esModule = true;
// let database1 = require("./newConnection");
var newConnection_1 = require("./newConnection");
var query_1 = require("../queries/query");
var dbErrHelperObj_1 = require("./dbErrHelperObj");
var getRecordById = function (req, res) {
    var id = req.query.id;
    // console.log(id);
    var resultMessage = {
        status: 400,
        result: "the record with the id '".concat(id, "' is not present")
    };
    newConnection_1["default"].query(query_1.getRecordByIdQuery + "'".concat(id, "'"), function (err, result) {
        if (err) {
            res.status(500).send(dbErrHelperObj_1["default"]);
        }
        else if (result.rowCount != 0) {
            var resultObjByID = {
                message: "the record associated with the id '".concat(id, "' is"),
                record: result.rows
            };
            res.send(resultObjByID);
        }
        else {
            res.status(400).send(resultMessage);
        }
    });
    newConnection_1["default"].end;
};
exports["default"] = getRecordById;
