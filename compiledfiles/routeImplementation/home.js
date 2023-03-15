"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let home = (req, res) => {
    // res.send("yey your server setup is successful")
    // res.sendFile( __dirname+"/index.html")
    res.send("Hello World!");
};
exports.default = home;
