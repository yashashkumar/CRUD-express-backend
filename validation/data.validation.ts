const {postData} = require("./data.schema");

module.exports = {
    addDataValidation : (req:any ,res:any,next:any)=>{
        let validation = postData.validate(req.body);
        if(validation.error){
            res.status(400).json({
                error : "unable to post data",
                message : validation.error.details[0].message
            })
        }
        else{
            next();
        }
    }
}