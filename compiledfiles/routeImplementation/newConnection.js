"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { Client } = require("pg");
const datasetsDB = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
datasetsDB.connect((err, res) => {
    if (err) {
        // throw err.message;
        console.log(err);
    }
    else {
        console.log("connected");
    }
});
// module.exports = datasetsDB;
exports.default = datasetsDB;
