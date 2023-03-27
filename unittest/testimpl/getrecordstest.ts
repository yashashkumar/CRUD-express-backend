let chai1 = require('chai');
let chaiHttp = require('chai-http');
import app from "../../server";
let should = chai1.should();

let getrecordstest =()=>{
        it('it should GET all the records', (done) => {
          chai1.request(app)
              .get('/datasets/get')
              .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eql(0);
                done();
              });
        });
}

export default getrecordstest;
