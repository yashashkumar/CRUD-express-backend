// import { getEachRecords } from ".";

import * as db from "../routeImplementation/routeimpl";
// import addRecord from "../routeImplementation/addRecord";
// import deleteById from "../routeImplementation/deleteRecordById";
// import getAllRecords from "../routeImplementation/getAllRecords";
// import getRecordById from "../routeImplementation/getRecordById";
// // import updateRecord from "../routeImplementation/updateRecord";
// import updateRecord from "../routeImplementation/updateRecord";
// import updateByPatch from "../routeImplementation/updateUsingPatch";
// import pool from "../routeImplementation/newConnection";


let chai = require("chai");
let chaiHttp = require("chai-http");
import app from "../server";
let spies = require("chai-spies");
chai.use(spies);
chai.use(chaiHttp);
chai.should();
// import { should } from "chai";
let expect = chai.expect;

describe("get records", () => {
  it("should GET all the records", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rows: [{}] };
    });
    chai
      .request(app)
      .get("/datasets/get")
      .end((err: any, response: any) => {
        // if (err) {
        //   response.should.have.status(500);
        // }
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a("array");
        response.body.length.should.not.be.eql(0);
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});

describe("home", () => {
  it("home route", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err: any, response: any) => {
        // if (err) {
        //   response.should.have.status(500);
        // }
        console.log(response.body);
        response.should.have.status(200);
        // response.body.should.be.a("object");
        // response.body.length.should.not.be.eql(0);
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});



describe("get records by id", () => {
  it("should GET the records by id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rows: [{}] };
    });
    chai
      .request(app)
      .get("/datasets/getrecord/db12")
      .end((err: any, response: any) => {
        // if (err) {
        //   expect(response.body).to.be.an("strng");
        // }
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
  it("should give 400 when id not found", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });
    chai
      .request(app)
      .get("/datasets/getrecord/000")
      .end((err: any, response: any) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});

describe("delete record", () => {
  it("should delete a record if id is present", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return {};
    });

    chai
      .request(app)
      .delete("/datasets/delete/db62")
      .end((err: any, response: any) => {
        response.should.have.status(200);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });

  it("id not found if id is not present", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });
    chai
      .request(app)
      .delete("/datasets/delete/db62")
      .end((err: any, response: any) => {
        // if (err) {
        //   response.should.have.status(500);
        // }
        // console.log(response);
        response.should.have.status(400);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});

let record = {
  id: "xyz",
  dataschema: {
    name: "yashash",
    lname: "kumar",
  },
  routerconfig: {
    "ip address": "192.168.1.88",
  },
  status: "inactive",
  createdBy: "yashas",
  updatedBy: "yashas",
};

describe("create new record", () => {
  it("if data not present with id , insert record", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });
    chai
      .request(app)
      .get("/datasets/getrecord/xyz")
      .end((err: any, response: any) => {
        // console.log(response.body);
        // done();
        if (response.body.status === 400) {
          chai
            .request(app)
            .post("/datasets/create")
            .send(record)
            .end((err: any, response: any) => {
              // console.log(response.body);
              expect(response.status).to.be.equal(201);
              expect(response.body).to.be.an("object");
              chai.spy.restore(db.pool, "query");
              done();
            });
        }
        expect(response.status).to.be.equal(400);
      });
  });

  it("should give primary key violation", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });
    chai
      .request(app)
      .get("/datasets/getrecord/xyz")
      .end((err: any, response: any) => {
        console.log(response.status);
        if (response.body.status != 400) {
          chai
            .request(app)
            .post("/datasets/create")
            .send(record)
            .end((err: any, response: any) => {
              console.log(response.body);
              expect(response.status).to.be.equal(400);
              expect(response.body).to.be.an("object");
              chai.spy.restore(db.pool, "query");
              done();
            });
        }
      });
  });
});

let updateRecord = {
  dataschema: {
    name: "yashash",
    lname: "kumar",
  },
  routerconfig: {
    "ip address": "192.168.1.88",
  },
  status: "inactive",
  createdBy: "yashas",
  updatedBy: "yashas",
};

describe("update record", () => {
  it("should update the record for given id if present", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });
    chai
      .request(app)
      .put("/datasets/update/111")
      .send(updateRecord)
      .end((err: any, response: any) => {
        // console.log(response.body);
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});

let patchDataschema = {
  dataschema: {
    name: "yashash",
    lname: "kumar",
  },
};

describe("update record using patch", () => {
  it("should update individual data for given id if present", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });
    chai
      .request(app)
      .patch("/datasets/partialupdate/aaa")
      .send(patchDataschema)
      .end((err: any, response: any) => {
        // console.log(response.body);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.an("object");
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
  let obj = {
    status :200,
    message : "the record associated with the id '111' is"
  }
  it("should update individual data for given id if present", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });
    chai
      .request(app)
      .get("/datasets/getrecord/111")
      .end((err: any, response: any) => {
        console.log(response.body);
        if (response.body === obj) {
        chai
          .request(app)
          .patch("/datasets/partialupdate/111")
          .send(patchDataschema)
          .end((err: any, response: any) => {
            console.log(response.status);
              expect(response.status).to.be.equal(200);
              expect(response.body).to.be.an("object");
              chai.spy.restore(db.pool, "query");
              done();
          });
        }
      });
  });
});





