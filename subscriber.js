const mqtt = require("mqtt");

const host = "localhost";
const port = "1883";
const connectUrl = `mqtt://${host}:${port}`;

var client = mqtt.connect(connectUrl);
const topic1 = "/cms/#";
const topic2 = "/data/#";

start();

async function start() {
  client.on("connect", async function () {
    console.log("COnnected to MQTT");
    // await client.subscribe("");
    await client.subscribe("/cms/#");
    await client.subscribe("/data/#");

    console.log(Object.keys(client._resubscribeTopics));
    client.on("message", async function (topic, message) {
      // console.log("Topics subscribed: ", topic.split.);
      loggerIdArr = [];
      loggerIdArr = topic.split("/", 3);
      loggerId = loggerIdArr[2];

      console.log("Topics subscribed id : ", loggerId);
      switch (true) {
        case topic == "/cms/" + loggerId:
          messages = JSON.stringify(JSON.parse(message));
          // console.log("Received Message:", topic, message.toString());
          printCMS(JSON.parse(message));
          break;

        case topic == "/data/" + loggerId:
          printData(JSON.parse(message));
          break;
      }
    });
    var printCMS = async function (message) {
      console.log("Received Message CMS:", message.timeStamp);
    };
    var printData = async function (message){
        console.log("Received Message Data: ", message.msgCount);
    }
  });
}