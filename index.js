var dotenv = require("dotenv").config();
var schedule = require('node-schedule');
const robots = require("./src/services/robots/index.js");

const delay =async (amount=758) => new Promise((resolve, reject) => setTimeout(resolve,amount)) 

 delay() 
schedule.scheduleJob('*/20 * * * * *', async ()=>{
  console.log('Inicio do job - UserGroups')

  await robots.group()

  console.log('Fim do UserGroups')
})


delay()
schedule.scheduleJob('*/20 * * * * *', async ()=>{
  console.log('Inicio do job - User')

  await robots.user()

  console.log('Fim do job - User')
})

delay()
schedule.scheduleJob('*/20 * * * * *', async ()=>{
  console.log('Inicio do job - PunchLog')

  await robots.punchLog()

  console.log('Fim do job - punchLog')
})