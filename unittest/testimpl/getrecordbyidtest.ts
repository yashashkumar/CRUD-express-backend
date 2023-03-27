let chai1 = require("chai");
import app from "../../server";

let getrecordbyid = () => {
  let id = "db123";
  it("should get record with ID", (done) => {
    chai1
      .request(app)
      .get(`/datasets/getrecord/${id}`)
      .end((err: any, res: any) => {
        // console.log(res.body);
        if (res.body != 400) {
          res.should.have.status(400);
          done(err);
        } else {
          res.should.have.status(200);
        }
      });
  });
  
};
export default getrecordbyid;
