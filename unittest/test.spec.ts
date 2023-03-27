//Require the dev-dependencies
let chai1 = require('chai');
let chaiHttp = require('chai-http');

import deleteRecordByIdTest from "./testimpl/deleteRecordByIdTest";
import getrecordbyid from "./testimpl/getrecordbyidtest";
import getrecordstest from "./testimpl/getrecordstest";
import postnewrecord from "./testimpl/postnewrecord";
import updateByIdTest from "./testimpl/updateByIdTest";
import updateUsingPatchTest from "./testimpl/updateUsingPatchTest";

chai1.use(chaiHttp);

describe('/GET records', getrecordstest);

describe('/POST new record' , postnewrecord);

describe('/GET records by id' , getrecordbyid);

describe('/DELETE record by id' , deleteRecordByIdTest);

describe('/UPDATE record by id' , updateByIdTest)

describe('/PATCH ', updateUsingPatchTest)

  