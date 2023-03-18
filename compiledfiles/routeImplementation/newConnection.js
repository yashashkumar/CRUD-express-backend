"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require("pg");
const datasetsDB = new Client({
    host: "localhost",
    //host.docker.internal
    user: "postgres",
    port: 5432,
    password: "Yashas@200116",
    database: "dataset",
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
