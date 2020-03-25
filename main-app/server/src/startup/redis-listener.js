const redis = require("redis");

/**
 * Redis subscription listener.
 * Subscribe to "process" results from support modules, and reply back to requesting client waiting for reply.
 */
module.exports = function(socket) {
    var redisClient = redis.createClient(
        process.env.REDIS_PORT || 6379,
        process.env.REDIS_HOST || "localhost"
    );

    redisClient.on("message", function(channel, message) {
        if (channel === "process-result") {
            var processMessage = JSON.parse(message);
            socket.to(processMessage.clientId).emit("support-call-callback", {
                succeeded: true
            });
        }
    });

    redisClient.subscribe("process-result");
};
