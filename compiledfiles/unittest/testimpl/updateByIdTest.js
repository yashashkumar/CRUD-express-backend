"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
const code_1 = require("@hapi/code");
const server_1 = __importDefault(require("../../server"));
let updateByIdTest = () => {
    let id = "db101112";
    it("should update using ID if present", (done) => {
        let record = {
            dataschema: {
                hahaha: "none",
            },
            routerconfig: {
                "ip address": "192.168.1.40",
            },
            status: "active",
            updatedBy: "bharath",
        };
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, res) => {
            // console.log(res.body);
            if (res.status != 400) {
                chai1.request(server_1.default).put(`/datasets/update/${id}`).send(record);
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            }
            else {
                (0, code_1.expect)(res.status).to.equal(400);
                done();
            }
        });
    });
    it("unable to find id ", (done) => {
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
exports.default = updateByIdTest;
