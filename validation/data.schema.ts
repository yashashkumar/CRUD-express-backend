import joi from "joi";

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

module.exports = data;