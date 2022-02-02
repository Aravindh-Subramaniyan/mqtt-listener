const mqtt = require("mqtt");
const mongoose =  require("mongoose");
const Config = require("../../config/config");
Schema = mongoose.Schema;

var cmsSchema = new Schema({}, { strict: false });
var cms = mongoose.model('cms', cmsSchema);

var dataSchema = new Schema({}, { strict: false });
var data = mongoose.model('data', dataSchema);

//const connectUrl = `mqtt://${Config.mqtt.host}:${Config.mqtt.port}`;
const connectUrl = `mqtt://localhost:1883`;

var client = mqtt.connect(connectUrl);

async function init() {
  client.on("connect", async function () {
    console.log("COnnected to MQTT");
    // await client.subscribe("");
    await client.subscribe("/cms/#");
    await client.subscribe("/data/#");

    client.on("message", async function (topic, message) {
      loggerIdArr = [];
      loggerIdArr = topic.split("/", 3);
      loggerId = loggerIdArr[2];

      console.log("Topics subscribed id : ", loggerId);
      switch (true) {
        case topic == "/cms/" + loggerId:
          messages = JSON.stringify(JSON.parse(message));
          printCMS(JSON.parse(message),loggerId);
          break;
        case topic == "/data/" + loggerId:
          printData(JSON.parse(message));
          break;
      }
    });
    var printCMS = async function (message) {
      console.log("Received Message CMS:", message.timeStamp);
      var cmsData= new cms(message);
      cms.findOne({loggerId: loggerId}).then((data) => {
      if(data){
        cms.updateOne({_id: data._id},message).then((res)=>{
          console.log("Cms Data updated Successfully!")
        })
        return;
      }
      else {
        cmsData.save().then((req,res)=>{
        console.log("CMS data Saved Successfully!");
      });
      }
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
    };

    var printData = async function (message){
        console.log("Received Message Data: ", message.msgCount);
        var dataVal= new data(message);
      data.findOne({loggerId: loggerId}).then((Data) => {
      if(Data){
        data.updateOne({_id: Data._id},message).then((res)=>{
          console.log("Data updated Successfully!")
        })
        return;
      }
      else {
        dataVal.save().then((req,res)=>{
        console.log("Data Saved Successfully!");
      });
      }
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
    };
  });
}
exports.mqtt ={init: init};
