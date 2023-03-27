"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require('chai');
let chaiHttp = require('chai-http');
const server_1 = __importDefault(require("../../server"));
let should = chai1.should();
let getrecordstest = () => {
    it('it should GET all the records', (done) => {
        chai1.request(server_1.default)
            .get('/datasets/get')
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
};
exports.default = getrecordstest;
