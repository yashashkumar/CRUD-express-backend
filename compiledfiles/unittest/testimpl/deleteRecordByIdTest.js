"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
const server_1 = __importDefault(require("../../server"));
const chai_1 = require("chai");
let deleteRecordById = () => {
    let id = "d101";
    it("should delete record with ID if present", (done) => {
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, res) => {
            // console.log(res.body);
            if (res.body.status != 400) {
                chai1
                    .request(server_1.default)
                    .delete(`/datasets/delete/${id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });
            }
            else {
                (0, chai_1.expect)(res.status).to.equal(400);
                done();
            }
        });
    });
    it("unable to find id", (done) => {
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, res) => {
            // console.log(res.body);
            if (res.status === 400) {
                res.should.have.status(400);
                res.body.should.be.an("object");
            }
            done();
        });
    });
};
exports.default = deleteRecordById;
