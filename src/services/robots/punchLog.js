var mariadb = require("../../database/mariadb.js");
var mysql = require("../../database/mysql.js");
const state = require("./state.js");
var moment = require("moment");
var axios = require("axios")




async function robot(){

  const api = axios.create({
    baseURL:process.env.Attendance_Host,
    headers: {'Authorization': 'Bearer '+process.env.Attendance_ApiKey}
  });
  
  let content = state.load();

  await getConnection()

  await getPunchLogs(content.punchLog.lastDtUpdate, async function (result){
    if (!!result) {
      if (result.length > 0) {
        console.log(
          "************Inicio de Group deve fazer Importacao**************"
        );
        console.log(result);
        

        //Chamada a api do attendance para gravação
        await api.post("api/attendance/punchLogs",result).then((response) => {
          console.log(response)  
          content = state.load();
          content.punchLog.lastDtUpdate = result[result.length - 1].updatedAt;
          state.saveJson(content);
        }) 

        console.log(
          "************Fim de Group Importacao**********************"
        );
      }
    }
  });

  async function getConnection (){
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

  async function getPunchLogs(lastDtUpdate, callback){
    let conn;

    try {
      conn =await getConnection();
  
      let date = moment(lastDtUpdate).format("YYYY/MM/DD HH:mm:ss");
//p1.devnm as device,p1.devid as deviceId ,
      await conn.query(
        `select p1.id id,p1.user_id as userId,p1.user_name as userName,
           p1.devdt as date,
           updatedAt from punchlog p1 
            where updatedAt > '${date}'
           limit 200
           ;
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

}



module.exports = robot;