import mariadb from "../database/mariadb.js";
import mysql from "../database/mysqldb.js";


var getConnection= async(type) =>{
  if(type == 'mysql'){
    return await mysql.getConnection();    
  }  
  else
  return await mariadb.getConnection();
};

var mysqlQuery = async (table) => {
  let conn;
  try {
    conn = getConnection(process.env.Database_Type);
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
    // let rows = timerecords;

    // rows = rows.map((row) => {
    //   return {
    //     Date: row.datetime,
    //     UserName: row["user.idx_name"],
    //   };
    // });

    // console.log(rows);

    // return rows;

    conn = await mariadb.getConnection();
    let rows = await conn.query(`select * from View_TimeCard;`);

    return rows;

    // rows = rows.map((row) => {
    //   return {
    //     Date: row.date,
    //     Name: row.name,
    //     UserId: row.user_id,
    //     Department: "",
    //     Shift: row.shift_name,
    //     firstTime: {
    //       clockInDefault: "7:00:00",
    //       clockIn: "7:00:00",
    //       clockOut: "14:00:00",
    //       timeLate: "00:00:00",
    //       extraHours: "00:00:00",
    //       regularHours: "6:00:00",
    //       totalTime: "5:40:00",
    //     },
    //     ...row,
    //   };
    // });

    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

export default {
  getTimeCardReportDetail,
  mysqlQuery,
};
