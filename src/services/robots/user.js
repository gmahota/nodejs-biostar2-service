var mariadb = require("../../database/mariadb.js");
var mysql = require("../../database/mysql.js");
var moment = require("moment");
var axios = require("axios");
const state = require("./state.js");

async function robot() {
  const api = axios.create({
    baseURL: process.env.Attendance_Host,
    headers: { Authorization: "Bearer " + process.env.Attendance_ApiKey },
  });

  api.defaults.timeout = 1000 * 60 * 2;

  let content = state.load();
  await getConnection();

  // await getUsers(content, async function (result) {
  //   if (!!result) {
  //     if (result.length > 0) {
  //       console.log("************Incio deve fazer Importacao**************");
  //       console.log(result);

  //       //Chamada a api do attendance para gravação
  //       await api.post("api/attendance/users", result).then((response) => {
  //         console.log(response);
  //         content = state.load();
  //         content.user.lastId = result[result.length - 1].user_id;
  //         state.saveJson(content);
  //       });

  //       console.log("************Fim Importacao**********************");
  //     }
  //   }
  // });

  await getUsersForUpdate(content, async function (result) {
    if (!!result) {
      if (result.length > 0) {
        console.log("************Inicio deve fazer update************");
       
        await api.post("api/attendance/users", result).then((response) => {
          content = state.load();
          content.user.lastDtUpdate = result[result.length - 1].updatedAt;
          state.saveJson(content);
        });

        console.log("************Fim deve fazer update***************");
      }
    }
  });

  async function getConnection() {
    const database_type = process.env.Database_Type || "";

    try {
      switch (database_type) {
        case "mysql":
          return await mysql.createConnection();
        case "mariadb":
          return await mariadb.getConnection();
      }

      throw new Error(
        database_type.length === 0
          ? "Please Fill on .env the Database_Type"
          : `${database_type} -  Not Yet Implemented`
      );
    } catch (e) {
      throw e;
    }
  }

  async function getUsers(id, callback) {
    let conn;
    let res = [];

    try {
      conn = await getConnection();

      var dat;

      await conn.query(
        `select user_id as id ,name,ugid as userGroupId,'G' as scheduleByUserOrGroup,
          createdAt,updatedAt from user where user_id > ${id} limit 200;`,
        (err, rows) => {
          
          if (err) console.log(err);
          
          rows = rows.map((row) => {
            return {
              id: row.id,
              name: row.name,
              scheduleByUserOrGroup: row.scheduleByUserOrGroup,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              userGroup: {
                id: row.userGroupId,
              },
            };
          });

          callback(rows);
        }
      );
      return res;
    } catch (err) {
      throw err;
    } finally {
      //if (conn) conn.release(); //release to pool
    }
  }

  async function getUsersForUpdate(content, callback) {
    let conn;

    try {
      conn = await getConnection();

      const lastDtUpdate = content.user.lastDtUpdate
      const limit =content.user.limit

      let date = moment(lastDtUpdate).format("YYYY/MM/DD HH:mm:ss");

      let query = `select user_id as id,name,ugid as userGroupId,'G' as scheduleByUserOrGroup,
        createdAt,updatedAt from user where updatedAt > '${date}' ${limit};`;

      await conn.query(query, function (err, result) {
        if (err) console.log(err);
          rows = result.map((row) => {
            return {
              id: row.id,
              name: row.name,
              scheduleByUserOrGroup: row.scheduleByUserOrGroup,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              userGroup: {
                id: row.userGroupId,
              },
            };
          });
        callback(rows);
      });
    } catch (err) {
      throw err;
    } finally {
      //if (conn) conn.release(); //release to pool
    }
  }
}

module.exports = robot;
