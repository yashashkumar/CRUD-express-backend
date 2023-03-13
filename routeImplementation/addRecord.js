"use strict";
exports.__esModule = true;
// let database1 = require("./newConnection");
var newConnection_1 = require("./newConnection");
var query_1 = require("../queries/query");
var query_2 = require("../queries/query");
var dbErrHelperObj_1 = require("./dbErrHelperObj");
var addRecord = function (req, res) {
    var id = req.body.id;
    var dataschema = req.body.dataschema;
    var routerconfig = req.body.routerconfig;
    var status = req.body.status;
    var createdBy = req.body.createdBy;
    var updatedBy = req.body.updatedBy;
    // to generate date
    var today = new Date();
    // console.log(today.toLocaleDateString()); // 3/28/2022 (depending on locale)
    var createdDate = today.toLocaleString("en-GB");
    var updatedDate = today.toLocaleString("en-GB");
    //parsing the json values to string
    var dataSchema = JSON.stringify(dataschema);
    var routerConfig = JSON.stringify(routerconfig);
    var errObj = {
        error: "PRIMARY_KEY_VIOLATION",
        status: 400,
        message: "the id '".concat(id, "' already present in database'")
    };
    //PRIMARY KEY VALIDATION
    newConnection_1["default"].query(query_1.getRecordByIdQuery + "'".concat(id, "'"), function (err, result) {
        // console.log(result);
        if (result.rowCount === 0) {
            newConnection_1["default"].query(query_2.insertQuery +
                "('".concat(id, "','").concat(dataSchema, "','").concat(routerConfig, "','").concat(status, "','").concat(createdBy, "','").concat(updatedBy, "','").concat(createdDate, "','").concat(updatedDate, "')"), function (error, result) {
                error ? res.status(500).send(dbErrHelperObj_1["default"]) : res.send(result);
            });
        }
        else {
            res.status(400).send(errObj);
        }
    });
    newConnection_1["default"].end;
};
exports["default"] = addRecord;
