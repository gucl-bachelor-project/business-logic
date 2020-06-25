const axios = require("axios");
const winston = require("winston");
const Transport = require("winston-transport");

class LoggingServiceTransport extends Transport {
    constructor(opts) {
        super(opts);

        this.logResourcePaths = {
            appErrors: "app-error"
        };
    }

    postToLogService(data, logResourcePath) {
        axios
            .post(`http://${process.env.LOG_APP_URL}/log/${logResourcePath}`, {
                appName: "main-app",
                timestamp: new Date().toISOString(),
                data: data
            })
            .catch(err => {
                console.error(
                    `Failed to send error log to logging service. Error: ${err}`
                );
            });
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        switch (info.level) {
            case "error":
                this.postToLogService(
                    info.message,
                    this.logResourcePaths.appErrors
                );
                break;
            default:
                break;
        }

        callback();
    }
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new LoggingServiceTransport({
            handleExceptions: true,
            level: "error"
        })
    ]
});

process
    .on("unhandledRejection", reason => {
        logger.error(`Unhandled Rejection at Promise. Error: ${reason}`);
    })
    .on("uncaughtException", err => {
        logger.error(`Uncaught Exception thrown. Error: ${err.stack}`);
    });

module.exports = logger;
