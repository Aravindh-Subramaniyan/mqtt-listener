const serverInit = require("./app/init/init");
const server= require("./listener/server");
const router= require("./app/routes/router");

serverInit.serverInit();
server.start(router.router);
