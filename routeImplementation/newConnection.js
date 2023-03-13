"use strict";
exports.__esModule = true;
var Client = require("pg").Client;
var datasetsDB = new Client({
    host: "localhost",
    user: "postgres",
    // port: 5432,
    password: "Yashas@200116",
    database: "dataset"
});
datasetsDB.connect(function (err, res) {
    if (err) {
        // throw err.message;
        console.log(err);
    }
    else {
        console.log("connected");
    }
});
// module.exports = datasetsDB;
exports["default"] = datasetsDB;
//changing password now to check
