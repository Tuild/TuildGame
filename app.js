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
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var aws = require('aws-sdk');

var s3 = new aws.S3();


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
 
 console.log("file Path:"+req.files.data.path);
  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", req.files.data.path, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);

  var params = {
              Bucket: "tuild",
              Key: "test.webm",
              Body: req.files.data.path,//this hast to be a string                                                        
              ACL: 'private',
              ContentType: 'video/webm',
          };
  s3.putObject(params, function(err,data){ console.log(err); } );

  // var location = path.join(os.tmpdir(), 'upload.webm')
  // fs.rename(req.files.data.path, location)
  
  //res.send('upload successful, file written to ${location}')
})

app.get('/ffmpeg-test',function(req,res){

  //console.log(ffmpeg);

	ffmpeg(os.tmpdir()+'/upload.webm') //Input Video File
    .output(os.tmpdir()+'/gametest.mp4') // Output File
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

    res.sendStatus(200);

})
// http.createServer(app).listen(80);
// https.createServer(credentials, app).listen(443);
https.createServer(options, app).listen(4433);
console.log("This is data");
