import mysql from "mysql2";

const getConnection = async () => {
  var pool = mysql.createPool({
    host: process.env.MariaBd_HOST,
    database: process.env.MariaDb_DATABASE,
    user: process.env.MariaDb_USERNAME,
    password: process.env.MariaDb_PASSWORD,
    connectionLimit: 5,
    port: process.env.MariaDb_PORT,  
  });

  return await pool.getConnection();
};

export default {
  getConnection,
};