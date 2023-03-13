// import joi from "joi";
let joi = require("joi")

const data = {
    postData : joi.object({
        id:joi.string(),
        dataschema : joi.object(),
        routerconfig : joi.object(),
        status : joi.string(),
        createdBy : joi.string(),
        updatedBy : joi.string()
    })
}

// module.exports = data;
export default data;