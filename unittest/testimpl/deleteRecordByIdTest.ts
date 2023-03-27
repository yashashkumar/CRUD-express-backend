let chai1 = require("chai");
import app from "../../server";
import { expect } from "chai";


let deleteRecordById = () =>{
    let id = "d101"
    it("should delete record with ID if present", (done) => {
      chai1
        .request(app)
        .get(`/datasets/getrecord/${id}`)
        .end((err: any, res: any) => {
        // console.log(res.body);
          if (res.body.status != 400) {
            chai1
              .request(app)
              .delete(`/datasets/delete/${id}`)
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

    it("unable to find id",(done)=>{
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
}
export default deleteRecordById;