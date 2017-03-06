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
var mysql = require('mysql')

var config = ('./config')
app.use(express.static('.'))
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var aws = require('aws-sdk');

var s3 = new aws.S3();
var location;


var connection = mysql.createConnection({


  host: 'tuilddb2.cpicb8dhirgw.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'tuildrocks',
  database: 'tuilddb',
  port: 3306,
  ssl:'Amazon RDS',
  debug: true,


});

    



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
 
 //console.log(req.files.data.path);
 //var body = fs.readFileSync(req.files.data.path, "binary").toString();

 var body = fs.createReadStream(req.files.data.path);
  var size = fs.statSync(req.files.data.path).size;
  name = (new Date).getTime();
  console.log(body);
  var params = {
              Bucket: "tuild",
              Key: name+".webm",
              Body: body,//this hast to be a string                                                     
              ContentType: 'video/webm',
              ContentLength : size,
          };
  s3.putObject(params, function(err,data){ console.log(err);


    connection.connect(function(err){

      if(err){

        console.log(err);
      }
      else{

        console.log("connection established");
      }


    });
    
    connection.end();

  // connection.query('INSERT into uploads (fb_id,video_file_url,times_array,time_stamp) VALUES (4,"","testarray","testtimestamp")', function(err, rows, fields) {
  

//   if(err)
//     console.log(err);


// });

  // connection.end();

   } );

  location = path.join(os.tmpdir(), name+'/.webm');
   fs.rename(req.files.data.path, location);
  
  //res.send('upload successful, file written to ${location}')



})

app.get('/ffmpeg-test',function(req,res){

  //console.log(ffmpeg);

	ffmpeg(location) //Input Video File
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
