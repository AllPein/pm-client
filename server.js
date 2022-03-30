var express = require('express')
var serveStatic = require('serve-static')
var app = express()
var path = require('path')
app.use(serveStatic(path.resolve(__dirname + "/build")))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)