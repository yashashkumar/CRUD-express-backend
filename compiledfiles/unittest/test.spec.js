"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Require the dev-dependencies
let chai1 = require('chai');
let chaiHttp = require('chai-http');
const server_1 = __importDefault(require("../server"));
let should = chai1.should();
chai1.use(chaiHttp);
describe('get records', () => {
    it('it should GET all the records', (done) => {
        chai1.request(server_1.default)
            .get('/get')
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
describe('/POST record', () => {
    it('it should not POST a record', (done) => {
        let record = {
            "id": "db100",
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
        chai1.request(server_1.default)
            .post('/datasets/create')
            .send(record)
            .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('object');
            done();
        });
    });
});
