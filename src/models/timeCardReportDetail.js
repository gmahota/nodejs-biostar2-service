var mariadb = require ("./../database/mariadb.js") ;
var mysql = require("../database/mysql.js");


var getConnection= async() =>{
  const database_type =process.env.Database_Type||"";

  console.log(database_type)
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

var mysqlQuery = async (table) => {
  let conn;
  try {
    conn =await getConnection();

    let rows = await conn.query(`select * from ${table}`);

    return rows;
  } catch (err) {
    throw err;
  } finally {
    //if (conn) conn.release(); //release to pool
  }
};

var getTimeCardReportDetail = async () => {
  let conn;
  try {

    conn = await mariadb.getConnection();
    let rows = await conn.query(`select * from View_TimeCard;`);

    return rows;

  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

module.exports ={
  getTimeCardReportDetail,
  mysqlQuery,
}
