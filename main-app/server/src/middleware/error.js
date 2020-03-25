const logger = require("../util/logger");

// All uncaught errors are handled here
module.exports = function(err, _req, res, _next) {
    logger.error(err.stack);

    return res.status(err.response ? err.response.status : 500).send(err.response ? err.response.data : res.body || "Server error occurred");
};
