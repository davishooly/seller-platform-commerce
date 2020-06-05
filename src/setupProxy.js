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
      [
          "/products",
          "/sellers",
          "/sellers/login",
          "/sellers/products/",
          "/sellers/products/variables",
          "/oauth2",
          "/auth",
          "/sellers/products/orders/"
      ],
      proxy(apiProxy));
};
