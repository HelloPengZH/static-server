var express = require('express');
var path = require('path');
var app = express();
var proxy = require('http-proxy-middleware');
var serveIndex = require('serve-index')

//此处设置静态文件的路径
const basePath = path.resolve('../')


app.use(express.static(basePath));

var options = {
  target: 'http://192.168.120.213:8080', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/czb': '/', // rewrite path
    '^/api/hrj': '/' // remove base path
  },
  router: {
    '/api/hrj': 'http://192.168.120.238:8080',
    '/api/czb': 'http://192.168.120.216:8080'
  }
};
// proxy
//具体配置查看 https://github.com/chimurai/http-proxy-middleware

// app.use('/hrj', proxy({target: 'http://192.168.14.168:8080', changeOrigin: true}));
app.use('/api', proxy(options));

//需要配置在 proxy 配置后面
app.use('/', serveIndex(basePath, {'icons': true}))

app.listen(8080, function () {
  console.log('http://localhost:8080')
})