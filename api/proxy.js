const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('No URL provided');
    }

    try {
        // We fetch the site and pass the data back to your browser
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Proxy Error: ' + error.message);
    }
}
