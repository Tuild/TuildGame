const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const path = require('path')
const os = require('os')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
var http = require('http')
var https = require('https')
var express = require('express')
var app = express()
var config = ('./config')
app.use(express.static('.'))




// var privateKey = fs.readFileSync('key.pem','utf8');
// var certtificate = fs.readFileSync('cert.pem','utf8');
// var credentials = {key: privateKey, cert: certtificate};
var express = require('express')
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
}; 

//var httpsServer = https.createServer(credentials,app);

//var port = process.env.PORT || config.app.port;


app.get('/', function (req, res) {
  res.redirect('/test.html')
})

app.post('/', multipartMiddleware, function(req, res) {
  console.log('files', req.files.data.path)
  console.log(os.tmpdir()+"---tempdir")
  var location = path.join(os.tmpdir(), 'upload.webm')
  fs.rename(req.files.data.path, location)
  console.log("FIle location "+ location);
  res.send('upload successful, file written to ${location}')
})

app.get('/ffmpeg-test',function(req,res){

  var loc = path.join(os.tempdir(),'upload.webm');
  var op = path,join(os.tempdir(),'gametest.mp4');
	ffmpeg(loc) //Input Video File
    .output(op) // Output File
    .audioCodec('libmp3lame') // Audio Codec
    .videoCodec('libx264')  // Video Codec
    .setStartTime(05) // Start Position
    .setDuration(08) // Duration
    .on('end', function(err) {
        if(!err)
        {

            console.log("Conversion Done");
            res.send('Video Cropping Done');

        }

    })
    .on('error', function(err){
        console.log('error: ', +err);

    }).run();

    res.redirect('/Users/hindupurkedar/Desktop/game/gametest.mp4');

})
// http.createServer(app).listen(80);
// https.createServer(credentials, app).listen(443);
https.createServer(options, app).listen(4433);
console.log("This is data");
