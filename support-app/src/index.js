const express = require("express");
const asyncRedis = require("async-redis");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const args = process.argv.slice(2);
const serverName = args[0];
if (!serverName) {
    console.error("No server name argument provided.");
    process.exit(1);
}

/**
 * Creates promised-based Redis client that is connected to
 * specified Redis DB.
 */
function createRedisClient() {
    return new Promise((resolve, reject) => {
        const client = asyncRedis.createClient(
            process.env.REDIS_PORT || 6379,
            process.env.REDIS_HOST || "localhost"
        );
        client.on("connect", () => resolve(client));
        client.on("error", err => reject(err));
    });
}

/**
 * Simulates processing a background job
 */
app.post("/process", async (req, res) => {
    if (!req.body) return res.status(400).send("No required body of request");

    const processMessage = {
        clientId: req.body.clientId,
        message: `Processed by '${serverName}'`,
        timestamp: new Date().toUTCString()
    };

    try {
        const client = await createRedisClient();

        return Promise.resolve()
            .then(() => {
                return res
                    .status(201)
                    .send("Request received. It is now being processed.");
            })
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(resolve, Math.floor(Math.random() * 1000) + 50); // Timeout between 50 and 1000 ms
                });
            })
            .then(async () => {
                await client.publish(
                    "process-result",
                    JSON.stringify(processMessage)
                );
                client.end(true);
            })
            .catch(err => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);

        return res.status(500).send("Dispatch failed. Error logged.");
    }
});

app.listen(port, () =>
    console.log(`Server '${serverName}' up and running on port ${port}.`)
);
