const proxy = require("http-proxy-middleware");

const headers = {
    "Cache-Control": "no-cache",

  };

  const apiProxy = {
    headers,
    target: `https://omaarmarketplace.herokuapp.com/api`,
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    autoRewrite: true
  };




module.exports = function(app) {
    app.use(
        ["/products","/sellers", "/sellers/login", "/oauth2", "/auth", "/sellers/products/orders/"],
        proxy(apiProxy));
  };
