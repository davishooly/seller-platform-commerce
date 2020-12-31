const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const configs = {
    '/products': {
        target: `https://omaarmarketplace.herokuapp.com/api`,
        changeOrigin: true,
    },
    '/auth': {
        target: `https://omaarmarketplace.herokuapp.com/api`,
        changeOrigin: true,
    },

    '/sellers': {
        target: `https://omaarmarketplace.herokuapp.com/api`,
        changeOrigin: true,
    },
    '/oauth2': {
        target: `https://omaarmarketplace.herokuapp.com/api`,
        changeOrigin: true,
    },
};

Object.keys(configs).forEach((config) => {
    app.use(createProxyMiddleware(config, configs[config]));
});

app.use(express.static(__dirname + '/build/'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
