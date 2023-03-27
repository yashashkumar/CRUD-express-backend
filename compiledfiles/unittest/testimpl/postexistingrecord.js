"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let chai1 = require("chai");
let chaiHttp = require("chai-http");
let should = chai1.should();
let postexistingrecord = () => {
    // it("it should not POST a record ,PRIMARY KEY VIOLATION", (done) => {
    //   let record = {
    //     id: "db100",
    //     dataschema: {
    //       name: "himagirish",
    //       lname: "nd",
    //     },
    //     routerconfig: {
    //       method: "post",
    //     },
    //     status: "active",
    //     createdBy: "himagirish",
    //     updatedBy: "himagirish",
    //   };
    //   chai1
    //     .request(app)
    //     .post("/datasets/create")
    //     .send(record)
    //     .end((err: any, res: any) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a("object");
    //       done(err);
    //     });
    // });
};
exports.default = postexistingrecord;
