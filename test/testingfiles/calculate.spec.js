"use strict";
let server = require("../src/server");
let chai1 = require("chai");
let chaiHttp = require("chai-http");
chai1.should();
chai1.use(chaiHttp);
describe("get records", () => {
    it("should get all records", (done) => {
        chai1.request(server)
            .get('/')
            .end((err, res) => {
            res.should.have.status(200);
        });
        done();
    });
});
