const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const path = require('path')
const os = require('os')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg');

var express = require('express')
var app = express()
app.use(express.static('.'))




app.get('/', function (req, res) {
  res.redirect('/test.html')
})

app.post('/', multipartMiddleware, function(req, res) {
  console.log('files', req.files.data.path)
  console.log(os.tmpdir()+"---tempdir")
  var location = path.join(os.tmpdir(), 'upload.webm')
  fs.rename(req.files.data.path, location)
  console.log('upload successful, file written to ${location}')
  res.send('upload successful, file written to ${location}')
})

app.get('/ffmpeg-test',function(req,res){


	ffmpeg('/var/folders/z0/lpzz8jmn08jcznqd26d775sh0000gn/T/upload.webm') //Input Video File
    .output('/Users/hindupurkedar/Desktop/game/gametest.mp4') // Output File
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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})