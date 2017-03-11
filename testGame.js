
var alreadyHit = false;
var myGamePiece;
var Background;
var myGamePiece1;
var speed = 1;
var noOfHits = 0;
var score = 0;
var homerun;
var counter = 0;
var noofBalls = 0;
var mainTime;
var times = [];
var refreshcounter = 34;
var jsonTimesAnswers = [];
var displayBlob;

var options = document.getElementById("options");
options.style.visibility = 'hidden';
var videotag = document.getElementById("vid");
videotag.style.visibility = 'hidden';









// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      startGame();
      document.body.style.backgroundImage = "none";
      document.getElementById('wrapper').style.display = "block";
      document.getElementById('vim').style.marginTop = "0%";
      document.getElementById('vim').style.marginLeft = "0%";
      document.getElementsByClassName(".fb_iframe_widget").style.display = "none";
      //alert("hello");
      //document.getElementById('vim').style.background-color = "lightblue";


    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '424395987911358',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
     
    });
  }














function startGame() {
    myGamePiece = new component(25, 25, "http://www.officialpsds.com/images/thumbs/BASEBALL2-psd25471.png", 0,350, "image");


     myGamePiece1 = new component(250, 250, "1.gif", 1000,300, "image");


    Background  = new component(window.innerWidth, window.innerHeight, "background.png", 0, 0, "image");

    homerun  = new component(1300, 600, "http://www.clipartkid.com/images/619/home-run-stock-photos-images-pictures-shutterstock-ptJ6VC-clipart.jpg", 0, 0, "image");
    


    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 30);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX+(noOfHits*speed);
        this.y += this.speedY;    
    }

}

function printScore(str){

  this.str = str;
  ctx.fillStyle = "#E6770E";
if(str=="SCORE"){
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Score : "+score,2,40);
  }

  else{

    ctx.font = "30px Comic Sans MS";

    ctx.fillText("SPEED : "+(25+(noOfHits*speed))+"mph",900,40);

  }
}

 function setx(){
    	 myGamePiece.x = 0;
    }

   

function updateGameArea() {
    //console.log("refreshed");
    myGameArea.clear();
    myGamePiece.newPos();

    if(noofBalls==10){

      document.getElementById('stop').click();

    }

    if(myGamePiece.x>=1300){
      
        var d = new Date();
        // console.log(Math.round((d.getTime()-mainTime)/1000));
        times.push(Math.round((d.getTime()-mainTime)/1000));
        setTimeout(setx(),1000);
        alreadyHit = false;
        noofBalls++;
        
    	
    }
   
    Background.update();
    myGamePiece.update();
    myGamePiece1.update();
    printScore("SCORE");
    printScore("Speed");
    if(counter>0){

      var hm = new Image();
      hm.src = "https://www.minijuegosgratis.com/v3/games/thumbnails/215535_1.jpg";
       // myGameArea.clear();

       ctx.drawImage(hm,20,80,1300,500);
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "#E6770E";
        ctx.fillText("HOMERUN",500,250);

       counter--;
    }

}



function moveright() {
    myGamePiece.speedX = 5; 
}


var array = ["1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif"];
function func(){
  for (var i = 0; i<10 ; i++){


  		
    setTimeout(disp(i),50*i);
  }
}

function disp(index){

  return function(){
     var hoemrun = new Image();
   
  myGamePiece1.image.src = array[index];
  if(index==5 || index==6){

  			if(myGamePiece.x >= 975 && myGamePiece.x<=1050){
  				
  				noOfHits++;
           

          if(index == 5){

            score += 50;
            
          //alert("HomeRun YAY");
          }
          else{

            score += 25;
           // alert("Good Shot");
          }
          counter = 15;
          
  			}
  		}
  }
}




const record = document.getElementById('record')
const stop = document.getElementById('stop')
const vid = document.getElementById('vid');

function display(bigVideoBlob){

    
    vid.src = window.URL.createObjectURL(bigVideoBlob);
    startLoop(); 

}

function startLoop(){

    index = 0,
    currentStopTime = times[index];
    //displayQuestion();

    vid.play();

    vid.ontimeupdate = function() {timeupdate()};






}

function displayOptions(){

options.style.visibility = 'visible';



}

function submit(){



  item = {};
  var startTimeJson = times[index-1];
  var endTimeJson   = times[index]; 
  item["startTime"] = startTimeJson;
  item["endTime"] = endTimeJson;

if(document.getElementById("Yes").checked){

  item["response"] = "yes";
  jsonTimesAnswers.push(item);
  

}
else{

  item["response"] = "no";
  jsonTimesAnswers.push(item);


}

options.style.visibility = 'hidden';
vid.play();

}


document.getElementById('vid').addEventListener('ended',myHandler,false);
    function myHandler(e) {
            
          //alert("hello");
          console.log(jsonTimesAnswers);


            }



  function timeupdate(){



    if (vid.currentTime >= currentStopTime) {
        vid.pause();
        displayOptions();
        
        if (times.length > index) {       
            currentStopTime = times[index];
            index++;


           
        }
        else {

          // Display Its Done

        }
    }
    
  }


if (!navigator.mediaDevices){
  alert('getUserMedia support required to use this page')
}

const chunks = []
let onDataAvailable = (e) => {
  chunks.push(e.data)

}

// Not showing vendor prefixes.
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
}).then((mediaStream) => {
  const recorder = new MediaRecorder(mediaStream)
  recorder.ondataavailable = onDataAvailable
  const video = document.querySelector('video')
  const url = window.URL.createObjectURL(mediaStream)
  // video.src = url

  record.onclick = () => {
    recorder.start()
    // document.getElementById('status').innerHTML = 'recorder started'
    console.log(recorder.state)
    console.log('recorder started')
  }

  stop.onclick = ()=> {
    if(recorder.state!=stop){
    recorder.stop()
    console.log(recorder.state)
    console.log('recorder stopped')
  }
  }

  video.onloadedmetadata = (e) => {
   
  }

  recorder.onstop = (e) => {
   
    //console.log(times);
    var bigVideoBlob = new Blob(chunks, { 'type' : 'video/webm; codecs=webm' })
    displayBlob = bigVideoBlob;
    if(noofBalls<10){

    document.body.childNodes[0].remove();
    videotag.style.visibility = 'visible';
    display(displayBlob);

    }

    let fd = new FormData()
    fd.append('fname', 'test.webm')
    fd.append('data', bigVideoBlob)
    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(data) {
      console.log(fd.data)
      
    })
  }
}).catch(function(err){
  console.log('error', err)
})

document.body.onkeydown = function(e){

  e.preventDefault();

  if (e.keyCode==32 && !alreadyHit){
    // e.preventDefault();
    func();
    alreadyHit = true;
  }

  if(e.keyCode==27){
   // myGameArea.stop();
    if(noofBalls<10){
       document.getElementById('stop').click();
    }
    else{
    document.body.childNodes[0].remove();
    videotag.style.visibility = 'visible';
    display(displayBlob);
    }
  }
}



function hide(){

  document.getElementById('wrapper').style.visibility = 'hidden';
  moveright();
  var da = new Date();
  mainTime = da.getTime();
  document.getElementById('record').click();

}






  function resize(){    
    $("canvas").outerHeight($(window).height()-$("canvas").offset().top- Math.abs($("canvas").outerHeight(true) - $("canvas").outerHeight()));
  }
  $(document).ready(function(){
    resize();
    $(window).on("resize", function(){                      
        resize();
    });
  });



