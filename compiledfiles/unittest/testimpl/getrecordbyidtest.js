"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
const server_1 = __importDefault(require("../../server"));
let getrecordbyid = () => {
    let id = "db123";
    it("should get record with ID", (done) => {
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, res) => {
            // console.log(res.body);
            if (res.body != 400) {
                res.should.have.status(400);
                done(err);
            }
            else {
                res.should.have.status(200);
            }
        });
    });
};
exports.default = getrecordbyid;
