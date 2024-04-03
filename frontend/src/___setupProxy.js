const { createProxyMiddleware } = require("http-proxy-middleware")

function middlewareFactory(url, target) {
  return [
    url,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      cookieDomainRewrite: ""
    })
  ]
}

module.exports = function (app) {
  app.use(...middlewareFactory("/api/v1/", process.env.REACT_APP_BACKEND_HOST))
  app.use(...middlewareFactory("/upload/", process.env.REACT_APP_BACKEND_HOST))
}
