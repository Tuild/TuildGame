const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const path = require('path')
const os = require('os')
const fs = require('fs')

var express = require('express')
var app = express()
app.use(express.static('.'))


app.get('/', function (req, res) {
  res.redirect('/test.html')
})

app.post('/', multipartMiddleware, function(req, res) {
  "use strict";
  console.log('files', req.files.data.path)
  console.log(os.tmpdir()+"---tempdir")
  let location = path.join(os.tmpdir(), 'upload.webm')
  fs.rename(req.files.data.path, location)
  console.log(`upload successful, file written to ${location}`)
  res.send(`upload successful, file written to ${location}`)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})