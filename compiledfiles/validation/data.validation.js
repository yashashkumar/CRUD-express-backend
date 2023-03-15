"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const {postData} = require("./data.schema");
const data_schema_1 = __importDefault(require("./data.schema"));
const addDataValidation = (req, res, next) => {
    let validation = data_schema_1.default.postData.validate(req.body);
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
exports.default = addDataValidation;
