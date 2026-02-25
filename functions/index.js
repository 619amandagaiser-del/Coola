const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const cors = require("cors")({ origin: true });

exports.proxy = onRequest({ cors: true }, async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send("Usage: ?url=https://example.com");
    }

    try {
        const response = await axios({
            method: 'GET',
            url: targetUrl,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        res.set("Content-Type", response.headers["content-type"]);
        return res.send(response.data);
    } catch (error) {
        return res.status(500).send("Proxy Error: " + error.message);
    }
});
