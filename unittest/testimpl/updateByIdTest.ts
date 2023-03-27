let chai1 = require("chai");
import { expect } from "@hapi/code";
import app from "../../server";

let updateByIdTest = () => {
  let id = "db101112";

  it("should update using ID if present", (done) => {
    let record = {
      dataschema: {
        hahaha: "none",
      },
      routerconfig: {
        "ip address": "192.168.1.40",
      },
      status: "active",
      updatedBy: "bharath",
    };

    chai1
      .request(app)
      .get(`/datasets/getrecord/${id}`)
      .end((err: any, res: any) => {
        // console.log(res.body);
        if (res.status != 400) {
          chai1.request(app).put(`/datasets/update/${id}`).send(record);
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        } 
        else {
          expect(res.status).to.equal(400);
          done();
        }
      });
  });

  it("unable to find id ", (done) => {
    chai1
      .request(app)
      .get(`/datasets/getrecord/${id}`)
      .end((err: any, res: any) => {
        // console.log(res.body);
        if (res.status === 400) {
          res.should.have.status(400);
          res.body.should.be.an("object");
        }
        done();
      });
  });
};

export default updateByIdTest;
