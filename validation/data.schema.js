"use strict";
exports.__esModule = true;
// import joi from "joi";
var joi = require("joi");
var data = {
    postData: joi.object({
        id: joi.string(),
        dataschema: joi.object(),
        routerconfig: joi.object(),
        status: joi.string(),
        createdBy: joi.string(),
        updatedBy: joi.string()
    })
};
// module.exports = data;
exports["default"] = data;
