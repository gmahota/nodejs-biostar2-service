var db = require("./../database/connection");

function GroupRepository() {
  async function getAll() {
    let conn;
    try {
      conn = await db.getConnection();
      const rows = await conn.query("SELECT * from usergroup");

      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  }

  async function search(table, fields, filters) {}

  return {
    getAll: getAll,
  };
}

module.exports = GroupRepository;
