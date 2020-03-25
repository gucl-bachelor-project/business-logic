const axios = require("axios");
const express = require("express");

module.exports = function (loggingAppHostUrl) {
    const router = express.Router();

    router.get("/", async (_req, res) => {
        const response = await axios.get(`http://${loggingAppHostUrl}/log/app-error`);

        return res.status(response.status).send(response.data);
    });

    router.post("/trigger", async (_req, res) => {
        res.body = "test";

        throw new Error("Test error logging");
    });

    return router;
};
