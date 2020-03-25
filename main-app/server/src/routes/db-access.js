const axios = require("axios");
const express = require("express");

module.exports = function(dbAccessAppUrl, dbAccessAdminAppUrl) {
    const router = express.Router();

    router.get("/users", async (req, res) => {
        const response = await axios.get(`http://${dbAccessAppUrl}/api/users`);

        return res.status(response.status).send(response.data);
    });

    router.post("/users", async (req, res) => {
        const response = await axios.post(`http://${dbAccessAppUrl}/api/users`, req.body);

        return res.status(response.status).send(response.data);
    });

    router.get("/documents", async (req, res) => {
        const response = await axios.get(`http://${dbAccessAppUrl}/api/documents`);

        return res.status(response.status).send(response.data);
    });

    router.post("/documents", async (req, res) => {
        const response = await axios.post(`http://${dbAccessAppUrl}/api/documents`, req.body);

        return res.status(response.status).send(response.data);
    });

    router.get("/configs", async (req, res) => {
        const response = await axios.get(`http://${dbAccessAdminAppUrl}/api/configs`);

        return res.status(response.status).send(response.data);
    });

    router.post("/configs", async (req, res) => {
        const response = await axios.post(`http://${dbAccessAdminAppUrl}/api/configs`, req.body);

        return res.status(response.status).send(response.data);
    });

    return router;
};
