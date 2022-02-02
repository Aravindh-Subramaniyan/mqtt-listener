const mqtt=require("../mqtt/mqtt").mqtt;
const db = require("../models/db");

async function serverInit(){
    await mqtt.init();
    console.log("Mqtt connected!");
    await db.dbInit();
    console.log("DB connected!");
}

exports.serverInit = serverInit;

