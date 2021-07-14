var mariadb = require ("mariadb/callback");

const getConnection = async () => {
  var pool = mariadb.createConnection({
    host: process.env.Database_HOST,
    database: process.env.Database,
    user: process.env.Database_USERNAME,
    password: process.env.Database_PASSWORD,
    connectionLimit: 5,
    port: process.env.Database_PORT,  
  });

  return await pool;
};

const getSlaveConnection = async () => {
  var pool = mariadb.createConnection({
    host: process.env.Slave_HOST,
    database: process.env.Slave,
    user: process.env.Slave_USERNAME,
    password: process.env.Slave_PASSWORD,
    connectionLimit: 5,
    port: process.env.Slave_PORT,  
  });

  return await pool;
};

module.exports={
  getConnection, getSlaveConnection
}