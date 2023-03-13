"use strict";
exports.__esModule = true;
// let database1 = require("./newConnection");
var newConnection_1 = require("./newConnection");
var dbErrHelperObj_1 = require("./dbErrHelperObj");
var updateRecord = function (req, res) {
    var id = req.query.id;
    var dataschema = req.body.dataschema;
    var routerconfig = req.body.routerconfig;
    //parsing the json values to string
    var dataSchema = JSON.stringify(dataschema);
    var routerConfig = JSON.stringify(routerconfig);
    var status = req.body.status;
    var updatedBy = req.body.updatedBy;
    var today = new Date();
    //console.log(today.toLocaleDateString());
    var updatedDate = today.toLocaleString('en-GB');
    var updatedMessage = {
        status: "updated",
        message: "id with '".concat(id, "' updated successfully")
    };
    var unsuccessfulUpdate = {
        status: 400,
        message: "data with specified id '".concat(id, "' is not present")
    };
    newConnection_1["default"].query("UPDATE datasets \n       SET data_schema = '".concat(dataSchema, "' ,router_config = '").concat(routerConfig, "',status = '").concat(status, "' ,updated_by = '").concat(updatedBy, "',updated_date = '").concat(updatedDate, "' \n       WHERE id = '").concat(id, "'"), function (err, result) {
        err
            ? res.status(500).send(dbErrHelperObj_1["default"])
            : result.rowCount != 0
                ? res.send(updatedMessage)
                : res.status(400).send(unsuccessfulUpdate);
    });
    newConnection_1["default"].end;
};
exports["default"] = updateRecord;
