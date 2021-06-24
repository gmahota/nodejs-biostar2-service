var mariadb = require("../../database/mariadb.js");
var mysql = require("../../database/mysql.js");
const state = require("./state.js");
var moment = require("moment");
var axios = require("axios")




async function robot() {

  const api = axios.create({
    baseURL:process.env.Attendance_Host,
    headers: {'Authorization': 'Bearer '+process.env.Attendance_ApiKey}
  });

  let content = state.load();
  await getConnection();

  await getUserGroupsForUpdate(content.group.lastDtUpdate,async function (result) {
    if (!!result) {
      if (result.length > 0) {
        console.log(
          "************Inicio de Group deve fazer Importacao**************"
        );
        console.log(result);       

        //Chamada a api do attendance para gravação
        await api.post("api/attendance/usergroups",result).then((response) => {
          console.log(response)  
          content = state.load();
          content.group.lastDtUpdate = result[result.length - 1].updatedAt;
          state.saveJson(content);
          state.saveJson(content);
        }) 

        console.log(
          "************Fim de Group Importacao**********************"
        );
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

  async function getUserGroupsForUpdate(lastDtUpdate, callback) {
    let conn;

    try {
      conn = await getConnection();

      let date = moment(lastDtUpdate).format("YYYY/MM/DD HH:mm:ss");

      await conn.query(
        `select id,name,createdAt,updatedAt,parent_id from usergroup where updatedAt > '${date}' order by updatedAt asc;`,
        function (err, result) {
          if (err) console.log(err);
          callback(result);
        }
      );
    } catch (err) {
      throw err;
    } finally {
      //if (conn) conn.release(); //release to pool
      const database_type =process.env.Database_Type||"";
      switch (database_type) {
        case "mysql":
          conn.release();
          break;
        case "mariadb":
          conn.end();
          break;
      }
    }
  }
}

module.exports = robot;
