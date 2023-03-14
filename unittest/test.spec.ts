//Require the dev-dependencies
let chai1 = require('chai');
let chaiHttp = require('chai-http');
import app from "../server";
let should = chai1.should();


chai1.use(chaiHttp);

describe('get records', () => {
    it('it should GET all the records', (done) => {
      chai1.request(app)
          .get('/get')
          .end((err:any, res:any) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
            done();
          });
    });
});

describe('/POST record', () => {
    it('it should not POST a record', (done) => {
        let record = {
            "id" : "yash1212",
            "dataschema" : {
                "name" : "himagirish",
                "lname" : "nd"
            },
            "routerconfig" : {
                "method" : "post"
            },
            "status" : "active",
            "createdBy" : "himagirish",
            "updatedBy" : "himagirish"
        }
      chai1.request(app)
          .post('/datasets/create')
          .send(record)
          .end((err:any, res:any) => {
                res.should.have.status(200);
                // res.body.should.be.a('object');
            done();
          });
    });

});

  