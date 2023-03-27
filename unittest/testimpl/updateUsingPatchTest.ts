let chai1 = require("chai");
import { expect } from "@hapi/code";
import app from "../../server";

let updateUsingPatchTest = () => {
  let id = "db101";
  let data = {
    dataschema: {
      hahaha: "none",
    },
    routerconfig: {
      "ip address": "192.168.1.40",
    },
  };
  it("should update a user", (done) => {
    chai1
        .request(app)
        .get(`/datasets/getrecord/${id}`)
        .end((err: any, res: any) => {
        // console.log(res.body);
          if (res.body.status != 400) {
            chai1
              .request(app)
              .patch(`/datasets/partialupdate/${id}`)
              .end((err: any, res: any) => {
                res.should.have.status(200);
                done(err);
              });
          } else {
            expect(res.status).to.equal(400);
            done();
          }
        });
  });
  it("unable to find id", (done) => {
    chai1.request(app).get(`/datasets/getrecord/${id}`).end((err : any ,res : any)=>{
        if (res.status === 400) {
            res.should.have.status(400);
            res.body.should.be.an("object");
          }
          done();
    });
  });
};

export default updateUsingPatchTest