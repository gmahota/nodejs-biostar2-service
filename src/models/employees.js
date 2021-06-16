import mariadb from "./../database/mariadb.js";

var getEmployees = async () => {
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

var getEmploy = async (id) => {
  let conn;
  try {
    conn = await mariadb.getConnection();
    let rows = await conn.query("SELECT t.* from T_USR t where id =??", id);

    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Department: "",
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

export default { getEmployees, getEmploy };
