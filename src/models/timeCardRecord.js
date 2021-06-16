import mariadb from "./../database/mariadb.js";
import Excell from "./../services/excel.js";


var getTimeCardReport = async () => {
  let conn;
  try {
    conn = await mariadb.getConnection();
    let rows = await conn.query(`SELECT t.* from T_USR t`);
    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Department: "",
        Shift: row.shift_name,
        firstTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        firstTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        secondTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        secondTimeOut: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        ...row,
      };
    });

    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

var getTimeCardReportForSimpleShchedule = async() =>{
  let conn;
  try {
    conn = await mariadb.getConnection();
    let rows = await conn.query(`SELECT t.* from T_USR t`);
    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Department: "",
        Shift: row.shift_name,
        firstTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "14:00:00",
          timeLate: "00:00:00",
         extraHours: "00:00:00",
         regularHours: "6:00:00",
         totalTime: "5:40:00"

        },
        ...row,
      };
    });

    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

var fillExcell = (rows) => {
  
  Excell.fillData(rows);
};

var fillSimpleExcell = (rows) => {
  //const excell = new Excell();
  Excell.fillDataForSimpleSchedule(rows);
};



export default { getTimeCardReport, fillExcell, getTimeCardReportForSimpleShchedule , fillSimpleExcell};
