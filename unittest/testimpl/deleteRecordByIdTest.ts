let chai1 = require("chai");
let chaiHttp = require("chai-http");
import app from "../../server";
let should = chai1.should();
import datasetsDB from "../../routeImplementation/newConnection";
import { expect } from "chai";


let deleteRecordById = () =>{
    let id = "db00"
    it("id not present", (done) => {
        let id = "1110"
      chai1
        .request(app)
        .delete(`/datasets/delete/${id}`)
        .end((err: any, result: any) => {
          result.should.have.status(400);
          result.body.should.be.a("object");
          done(err);
        });
    });
}
export default deleteRecordById;