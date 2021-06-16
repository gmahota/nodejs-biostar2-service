import mariadb from "../database/mariadb.js";
import mysql from "../database/mysql.js";

var getConnection= async() =>{
  const database_type =process.env.Database_Type||"";

  try{

    switch(database_type){
      case "mysql":return await mysql.createConnection()
      case "mariadb":return await mariadb.getConnection()
    }
    throw new Error(
        database_type.length===0?
          "Please Fill on .env the Database_Type" :
          `${database_type} -  Not Yet Implemented`)
  }catch(e){
    throw e
  }
};

var getPunchLogs = async (callback) => {
  let conn;
  try {
    conn =await getConnection();

    await conn.query(
      `select p1.id,p1.user_id,p1.user_name,
         p1.devdt as date,
         p1.devnm as device,p1.devid as deviceId  from punchlog p1
      `, function(err,result) {
        if (err) console.log(err);
        callback(result)
      }
    );

  } catch (err) {
    throw err;
  } finally {
    //if (conn) conn.release(); //release to pool
  }
};

export default {
  getPunchLogs
};
