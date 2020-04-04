const path      = require('path');
const express   = require('express');
const axios     = require('axios').default;

require('dotenv').config();

let app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/api/images', (req, res) => {
    let q = req.query.q;
    axios.get(`https://image-search-integration-project.cognitiveservices.azure.com/bing/v7.0/images/search?q=${encodeURI(q)}`, {
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
        }
    }).then((response) => response.data).then((data) => {
        res.json(data.value);
    }).catch((reason) => {
        console.log(reason);
        res.status(400).send(reason);
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`listening on port ${process.env.PORT || 8080}...`);
});