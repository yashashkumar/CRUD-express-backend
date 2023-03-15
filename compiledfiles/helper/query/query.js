"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQuery = exports.getRecordByIdQuery = exports.selectAllQuery = exports.deleteQuery = void 0;
exports.deleteQuery = `DELETE FROM datasets WHERE id =`;
exports.selectAllQuery = `SELECT * FROM datasets`;
exports.getRecordByIdQuery = `SELECT * FROM datasets WHERE id =`;
exports.insertQuery = `INSERT INTO datasets VALUES`;
