"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
let chaiHttp = require("chai-http");
const chai_1 = require("chai");
const server_1 = __importDefault(require("../../server"));
let should = chai1.should();
let postnewrecord = () => {
    let record = {
        id: "hello123",
        dataschema: {
            name: "himagirish",
            lname: "nd",
        },
        routerconfig: {
            method: "post",
        },
        status: "active",
        createdBy: "himagirish",
        updatedBy: "himagirish",
    };
    describe('POST ', () => {
        it('should post data with ID if not present in database', (done) => {
            chai1.request(server_1.default)
                .get(`/datasets/getrecord/${record.id}`)
                .end((err, res) => {
                console.log(res.body);
                if (res.body.status === 400) {
                    chai1.request(server_1.default)
                        .post('/datasets/create')
                        .send(record)
                        .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
                }
                else {
                    (0, chai_1.expect)(res.status).to.equal(200);
                    done();
                }
            });
        });
    });
};
exports.default = postnewrecord;
