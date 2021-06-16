import mariadb from "./../database/mariadb.js";

var getShifts = async () => {
  let conn;
  try {
    conn = await mariadb.getConnection();
    let rows = await conn.query(`SELECT t.* from T_USR t`);
    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Shift: "",
        Shift: row.shift_name,
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

var getShift = async (id) => {
  let conn;
  try {
    conn = await mariadb.getConnection();
    let rows = await conn.query("SELECT t.* from T_USR t where id =??", id);

    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Shift: "",
        Shift: row.shift_name,
        ...row,
      };
    });

    return rows.length > 0 ? rows[0] : {};
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

export default { getShifts, getShift };
