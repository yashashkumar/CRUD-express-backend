"use strict";
exports.__esModule = true;
// const {postData} = require("./data.schema");
var data_schema_1 = require("./data.schema");
var addDataValidation = function (req, res, next) {
    var validation = data_schema_1["default"].postData.validate(req.body);
    if (validation.error) {
        res.status(400).json({
            error: "unable to post data",
            message: validation.error.details[0].message
        });
    }
    else {
        next();
    }
};
exports["default"] = addDataValidation;
