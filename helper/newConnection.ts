const {Client} = require('pg');

const datasetsDB  = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Yashas@200116",
    database: "dataset"
})

module.exports = datasetsDB;
// export default datasetsDB;