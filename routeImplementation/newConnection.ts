const { Client } = require("pg");

const datasetsDB = new Client({
  host: "localhost",
  //host.docker.internal
  user: "postgres",
  port:5432,
  password: "Yashas@200116",
  database: "dataset",
});

datasetsDB.connect((err : any , res:any)=>{
  if(err){
    // throw err.message;
    console.log(err);
  }
  else{
    console.log("connected");
  }
});
// module.exports = datasetsDB;
export default datasetsDB;