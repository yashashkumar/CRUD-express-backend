const { Client } = require("pg");

const datasetsDB = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Yashas@200116",
  database: "dataset",
});

try {
  datasetsDB.connect();
  console.log("connected");
} 
catch (err) {
  throw err;
}

module.exports = datasetsDB;

//changing password now to check
