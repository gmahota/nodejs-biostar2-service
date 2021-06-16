import mysql from "mysql";

const getConnection = async () => {
  var pool = mysql.createPool({
    host: process.env.Database_HOST,
    database: process.env.Database,
    user: process.env.Database_USERNAME,
    password: process.env.Database_PASSWORD,
    connectionLimit: 5,
    port: process.env.Database_PORT,
  });

  return await pool.getConnection();
};

const createConnection = async () => {
  var pool = mysql.createConnection({
    host: process.env.Database_HOST,
    database: process.env.Database,
    user: process.env.Database_USERNAME,
    password: process.env.Database_PASSWORD,
    connectionLimit: 5,
    port: process.env.Database_PORT,
  });

  return await pool;
};

export default {
  getConnection,createConnection
};
