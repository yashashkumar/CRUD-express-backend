let database1 = require("./newConnection");

let deleteById = (req:any,res:any)=>{ //WORKING
    let id:string = req.query.id;
    database1.query(`DELETE FROM datasets WHERE id = '${id}'`,(err:any , result:any)=>{
        // let data = req.body;
        // let resObj = JSON.stringify(data);
        if(res.json(null)){
            console.log(`data with id '${id}' not present`);
        }
        else{
            let data = req.body;
            console.log(JSON.stringify(data));
            res.send('Data Received: ' + JSON.stringify(data));
        }
    })
    database1.end;
}

export default deleteById;