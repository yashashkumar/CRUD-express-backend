"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
let chaiHttp = require("chai-http");
const server_1 = __importDefault(require("../../server"));
let should = chai1.should();
let getrecordbyid = () => {
    it("it should get a record", (done) => {
        let id = "db100";
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, result) => {
            result.should.have.status(200);
            result.body.should.be.a("object");
            done();
        });
    });
    it("it should not get a record", (done) => {
        let id = "1110";
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, result) => {
            result.should.have.status(400);
            result.body.should.be.a("object");
            done(err);
        });
    });
};
exports.default = getrecordbyid;
