var mariadb = require ("mariadb");

const getConnection = async () => {
  var pool = mariadb.createPool({
    host: process.env.Database_HOST,
    database: process.env.Database,
    user: process.env.Database_USERNAME,
    password: process.env.Database_PASSWORD,
    connectionLimit: 5,
    port: process.env.Database_PORT,  
  });

  return await pool.getConnection();
};

module.exports={
  getConnection
}