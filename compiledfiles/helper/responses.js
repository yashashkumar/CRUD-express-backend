"use strict";
// import { id } from "./addRecord";
// console.log(id);
Object.defineProperty(exports, "__esModule", { value: true });
exports.idNotFound = exports.deleteMessage = exports.insertSuccessful = exports.dbErr = exports.primaryKeyViolation = void 0;
exports.primaryKeyViolation = {
    error: "PRIMARY_KEY_VIOLATION",
    status: 400,
    message: `id not present`,
};
exports.dbErr = {
    error: "database error",
    message: "unable to post or update data, check your fields correctly",
    status: "500",
};
exports.insertSuccessful = {
    status: 201,
    message: "data inserted"
};
exports.deleteMessage = {
    status: 200,
    response: `record deleted`,
};
exports.idNotFound = {
    status: 400,
    result: `id not found`,
};
