const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send('No Target URL');

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.status(200).send(response.data);
    } catch (e) {
        res.status(500).send('Proxy failure: ' + e.message);
    }
}
