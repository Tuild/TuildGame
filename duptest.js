const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const path = require('path')
const os = require('os')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg');
// const util = require('util');

// console.log(util.inspect(ffmpeg));
var express = require('express')
var app = express()
app.use(express.static('.'))



// var first = "/Users/hindupurkedar/Desktop/game/sample.mp4";
// var second = "/Users/hindupurkedar/Desktop/game/sample2.mp4";
// var outPath = "/Users/hindupurkedar/Desktop/game/gametest.mp4";



 ffmpeg('/var/folders/z0/lpzz8jmn08jcznqd26d775sh0000gn/T/upload.webm') //Input Video File
    .output('/Users/hindupurkedar/Desktop/game/gametest.mp4') // Output File
    .audioCodec('libmp3lame') // Audio Codec
    .videoCodec('libx264')  // Video Codec
    .setStartTime(09) // Start Position
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