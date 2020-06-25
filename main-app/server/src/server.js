const express = require("express");
const app = express();
const server = require("http").Server(app);
const socket = require("socket.io")(server);
const logger = require("./util/logger");
require("express-async-errors");

require("./startup/routes")(app);
require("./startup/redis-listener")(socket);
require("./startup/socket-connection")(socket);

const port = process.env.PORT || 8080;
server.listen(port, () =>
    logger.info(`Main application running on port ${port}.`)
);
