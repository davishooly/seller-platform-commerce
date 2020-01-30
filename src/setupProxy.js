const proxy = require("http-proxy-middleware");

const headers = {
    "Cache-Control": "no-cache",

  };

  const apiProxy = {
    headers,
    target: `http://127.0.0.1:8000/api`,
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    autoRewrite: true
  };


module.exports = function(app) {
    app.use(["/products","/sellers", "/oauth2"], proxy(apiProxy));
  };
