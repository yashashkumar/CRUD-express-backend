let chai1 = require("chai");
let chaiHttp = require("chai-http");
import app from "../../server";
let should = chai1.should();


let getrecordbyid = () => {
    it("it should get a record", (done) => {
        let id = "db100"
      chai1
        .request(app)
        .get(`/datasets/getrecord/${id}`)
        .end((err: any, result: any) => {
          result.should.have.status(200);
          result.body.should.be.a("object");
          done();
        });
    });
    
    it("it should not get a record", (done) => {
        let id = "1110"
      chai1
        .request(app)
        .get(`/datasets/getrecord/${id}`)
        .end((err: any, result: any) => {
          result.should.have.status(400);
          result.body.should.be.a("object");
          done(err);
        });
    });
  };

  export default getrecordbyid;