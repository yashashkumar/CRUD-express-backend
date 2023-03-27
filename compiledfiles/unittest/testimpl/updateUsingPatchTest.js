"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
const code_1 = require("@hapi/code");
const server_1 = __importDefault(require("../../server"));
let updateUsingPatchTest = () => {
    let id = "db101";
    let data = {
        dataschema: {
            hahaha: "none",
        },
        routerconfig: {
            "ip address": "192.168.1.40",
        },
    };
    it("should update a user", (done) => {
        chai1
            .request(server_1.default)
            .get(`/datasets/getrecord/${id}`)
            .end((err, res) => {
            // console.log(res.body);
            if (res.body.status != 400) {
                chai1
                    .request(server_1.default)
                    .patch(`/datasets/partialupdate/${id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });
            }
            else {
                (0, code_1.expect)(res.status).to.equal(400);
                done();
            }
        });
    });
    it("unable to find id", (done) => {
        chai1.request(server_1.default).get(`/datasets/getrecord/${id}`).end((err, res) => {
            if (res.status === 400) {
                res.should.have.status(400);
                res.body.should.be.an("object");
            }
            done();
        });
    });
};
exports.default = updateUsingPatchTest;
