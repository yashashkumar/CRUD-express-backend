let database1 = require("./newConnection");

let getRecordById = (req:any ,res:any)=>{ 
    let id:string = req.query.id;
    console.log(id);
    database1.query(`SELECT * FROM datasets WHERE id= '${id}'`,(err:any , result:any)=>{
        if(err){
            console.log(err);
        }
        else{
            // let data = req.body;
            res.send(result);
        }
    })
    database1.end;
}

export default getRecordById;