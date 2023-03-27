let chai1 = require("chai");
let chaiHttp = require("chai-http");
import { expect } from "chai";
import app from "../../server";
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

    it("should post data with ID if not present in database", (done) => {
      chai1
        .request(app)
        .get(`/datasets/getrecord/${record.id}`)
        .end((err: any, res: any) => {
        //   console.log(res.body);
          if (res.body.status === 400) {
            chai1
              .request(app)
              .post("/datasets/create")
              .send(record)
              .end((err: any, res: any) => {
                res.should.have.status(201);
                done();
              });
          } 
          else {
            expect(res.status).to.equal(200);
            done();
          }
        });
    });
};

export default postnewrecord;
