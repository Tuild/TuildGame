
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

    if(myGamePiece.x>=window.innerWidth){
      
        var d = new Date();
        console.log(Math.round((d.getTime()-mainTime)/1000));
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

function moveup() {
    myGamePiece.speedY = -20; 
}

function movedown() {
    myGamePiece.speedY = 20; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 5; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
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
    recorder.stop()
    console.log(recorder.state)
    // document.getElementById('status').innerHTML = 'recorder started'
    console.log('recorder stopped')
  }

  video.onloadedmetadata = (e) => {
    console.log('onloadedmetadata', e)
  }

  recorder.onstop = (e) => {
    console.log('e', e)
    console.log('chunks', chunks)
    var bigVideoBlob = new Blob(chunks, { 'type' : 'video/webm; codecs=webm' })
    

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
      console.log(data)
    })
  }
}).catch(function(err){
  console.log('error', err)
})

document.body.onkeydown = function(e){

  if (e.keyCode==32 && !alreadyHit){
     e.preventDefault();
    func();
    alreadyHit = true;
  }

  if(e.keyCode==27){

    document.getElementById('stop').click();
    
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

