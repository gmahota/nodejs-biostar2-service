var mariadb = require ("mariadb");

const getConnection = async () => {
  var pool = mariadb.createPool({
    host: process.env.MariaBd_HOST,
    database: process.env.MariaDb_DATABASE,
    user: process.env.MariaDb_USERNAME,
    password: process.env.MariaDb_PASSWORD,
    connectionLimit: 5,
    port: process.env.MariaDb_PORT,  
  });

  return await pool.getConnection();
};

module.exports={
  getConnection
}