"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Require the dev-dependencies
let chai1 = require('chai');
let chaiHttp = require('chai-http');
const deleteRecordByIdTest_1 = __importDefault(require("./testimpl/deleteRecordByIdTest"));
const getrecordbyidtest_1 = __importDefault(require("./testimpl/getrecordbyidtest"));
const getrecordstest_1 = __importDefault(require("./testimpl/getrecordstest"));
const postnewrecord_1 = __importDefault(require("./testimpl/postnewrecord"));
const updateByIdTest_1 = __importDefault(require("./testimpl/updateByIdTest"));
const updateUsingPatchTest_1 = __importDefault(require("./testimpl/updateUsingPatchTest"));
chai1.use(chaiHttp);
describe('/GET records', getrecordstest_1.default);
describe('/POST new record', postnewrecord_1.default);
describe('/GET records by id', getrecordbyidtest_1.default);
describe('/DELETE record by id', deleteRecordByIdTest_1.default);
describe('/UPDATE record by id', updateByIdTest_1.default);
describe('/PATCH ', updateUsingPatchTest_1.default);
