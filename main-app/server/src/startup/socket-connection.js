const axios = require("axios");
const logger = require("../util/logger");

module.exports = function(socket) {
    socket.on("connection", client => {
        client.on("support-call-test", data => {
            axios
                .post(`http://support-${data.serviceNum}:8080/process`, {
                    clientId: client.id
                })
                .then(() => {
                    logger.info("Successfully dispatch to support");
                })
                .catch(err => {
                    logger.error(err);
                });
        });
    });
};
