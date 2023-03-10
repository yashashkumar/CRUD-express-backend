// const {postData} = require("./data.schema");
import data from "./data.schema";


    const addDataValidation = (req:any ,res:any,next:any)=>{
        let validation = data.postData.validate(req.body);
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

    export default addDataValidation;