"use strict";
exports.__esModule = true;
//Require the dev-dependencies
var chai1 = require('chai');
var chaiHttp = require('chai-http');
var server_1 = require("../server");
var should = chai1.should();
chai1.use(chaiHttp);
describe('get records', function () {
    it('it should GET all the records', function (done) {
        chai1.request(server_1["default"])
            .get('/get')
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
describe('/POST record', function () {
    it('it should not POST a record', function (done) {
        var record = {
            "id": "yash161", //if unique accepts
            "dataschema": {
                "name": "himagirish",
                "lname": "nd"
            },
            "routerconfig": {
                "method": "post"
            },
            "status": "active",
            "createdBy": "himagirish",
            "updatedBy": "himagirish"
        };
        chai1.request(server_1["default"])
            .post('/datasets/create')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(400);
            // res.body.should.be.a('object');
            done();
        });
    });
});
