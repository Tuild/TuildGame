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




app.get('/', function (req, res) {
  res.redirect('/test.html')
})

app.post('/', multipartMiddleware, function(req, res) {


 var body = fs.createReadStream(req.files.data.path);
  var size = fs.statSync(req.files.data.path).size;
   var name = (new Date).getTime();
  //console.log(body);
  var params = {
              Bucket: "tuild",
              Key: name+".webm",
              Body: body,//this hast to be a string                                                     
              ContentType: 'video/webm',
              ContentLength : size,
          };
  s3.putObject(params, function(err,data){ 


    if(err){

      console.log("AWS ERROR");
    }
    else{

      console.log("AWS INSERTED");

    }

  });


    connection.connect(function(err){

      if(err){

        console.log("Connection not Established");
      }
      else{

        console.log("connection established");
      }


    });
    
    

   connection.query('INSERT into uploads (fb_id,video_file_url,times_array,time_stamp) VALUES (4,?,"testarray","testtimestamp")',[name+".webm"], function(err, rows, fields) {
  

  if(err)
    console.log("Query Error");


});

  connection.end(function(err){


    if(err){

      console.log("error disconnecting");
    }
    else{

      console.log("connection Ended");
    }

  });



   


    // var outputPath = name

    ffmpeg(req.files.data.path) //Input Video File
    .output(os.tmpdir()+'/'+name+'.mp4') // Output File
    .audioCodec('libmp3lame') // Audio Codec
    .videoCodec('libx264')  // Video Codec
    .setStartTime(02) // Start Position
    .setDuration(03) // Duration
    .on('end', function(err) {
        if(!err)
        {

            console.log("Conversion Done");
            

        }

    })
    .on('error', function(err){
        console.log('error Croppring:');

    }).run();

   

   console.log("everrything ran seemlessly");
   res.send('everrything ran seemlessly');


});


https.createServer(options, app).listen(4433);
console.log("This is data");
