//Require the dev-dependencies
let chai1 = require('chai');
let chaiHttp = require('chai-http');

import deleteRecordById from "./testimpl/deleteRecordByIdTest";
import getrecordbyid from "./testimpl/getrecordbyidtest";
import getrecordstest from "./testimpl/getrecordstest";
import postexistingrecord from "./testimpl/postexistingrecord";
import postnewrecord from "./testimpl/postnewrecord";

chai1.use(chaiHttp);

describe('/GET records', getrecordstest);

describe('/POST record', postexistingrecord);

describe('/POST new record' , postnewrecord);

describe('/GET records by id' , getrecordbyid);

describe('/DELETE record by id' , deleteRecordById);

  