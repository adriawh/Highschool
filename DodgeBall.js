var startTime=new Date();
"use strict";
var boks = document.querySelector(".boks");
var ferdigEL = document.querySelector(".ferdig");
var bodyEL = document.querySelector("body");
var beholder1 = document.querySelector(".beholder1");
var gameover = document.querySelector(".gameover");
var canvas = document.querySelector("#brett");
var ctx = canvas.getContext("2d");

var knapper=[];

window.addEventListener("keydown", mottaTaster);
window.addEventListener("keyup", mottaTaster);

function mottaTaster(e){
  if (e.type === "keydown"){
    knapper[e.keyCode] = true;
  }else{
    knapper[e.keyCode] = false
  }
}

function finnAvstand(obj1, obj2){
  var xAvstand2 = Math.pow(obj1.x - obj2.x, 2);
  var yAvstand2 = Math.pow(obj1.y - obj2.y, 2);
  var avstand = Math.sqrt(xAvstand2 + yAvstand2);
  return avstand;
}

var animasjonsID;

/*class lyd{
  constructor(fil){
    var lol = document.createElement("audio");
    lol.setAttribute("type", "mpeg/audio");
    lol.setAttribute("src", fil);
    lol.setAttribute("controls", "none");
    lol.setAttribute("preload", "none");
    lol.style.display="none";
    bodyEL.appendChild(lol);
    lol.play();

  }
}*/

function animer(){
  var elapsed =(new Date() - startTime)/1000;
  ctx.clearRect(0,0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle="white";
  ctx.font="10px Verdana"
  ctx.fillText("Use the arrow keys or ASWD", 10,590);
  ctx.restore();


  hinder.flytt();
  hinder.tegn();

  hinder2.flytt();
  hinder2.tegn();
  hinder3.flytt();
  hinder3.tegn();
  /*hinder4.flytt();
  hinder4.tegn();
  hinder5.flytt();
  hinder5.tegn();
  hinder6.flytt();
  hinder6.tegn();
  hinder7.flytt();
  hinder7.tegn();
  hinder8.flytt();
  hinder8.tegn();*/

  spiller.flytt();
  spiller.tegn();

//bodyEL.style.backgroundColor="#"+((1<<24)*Math.random()|0).toString(16);

drawElapsedTime();

  function drawElapsedTime(){
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle="white";
          ctx.font="14px Verdana"
          ctx.globalAlpha=1;
          ctx.fillText(elapsed +" seconds",canvas.width-110,25);
          ctx.restore();
      }

  if(finnAvstand(hinder, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder2, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder3, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }/*else if(finnAvstand(hinder4, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder5, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder6, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder7, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }else if(finnAvstand(hinder8, spiller) < 30){
    cancelAnimationFrame(animasjonsID);
      ferdig();

  }*/else{
    animasjonsID = requestAnimationFrame(animer);
  }

  function ferdig(){
    beholder1.style.display="none";
    ferdigEL.innerHTML="<h1>GAME OVER</h1>";
    gameover.innerHTML+="<h1> You lasted: " + elapsed + " seconds</h1><br><h3>Press ENTER or SPACEBAR to restart</h3>";
    gameover.innerHTML+="<br><br><br><br><br><br><br><br><br>Made by Adrian Wist Hakvåg";

    window.addEventListener("keydown", sjekk);
    function sjekk(e){
      if (e.keyCode === 13){
        location.reload();
      }else if (e.keyCode === 32){
        location.reload();
      }

    }
  }
}

animasjonsID = requestAnimationFrame(animer);

class Sirkel {
  constructor(x,y, farge){
    this.x = x;
    this.y = y;
    this.farge = farge;
  }

  tegn(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0 , Math.PI*2);
    ctx.fillStyle = this.farge;
    ctx.fill();
    ctx.stroke();
    ctx.closePath;
  }
}


class Hinder extends Sirkel{
  constructor(x, y, farge, fart){
    super(x, y, farge);
    this.xFart = fart;
    this.yFart = fart;
  }

  flytt(){

    if(this.x < 0 || this.x > canvas.width){
      this.xFart = -this.xFart;
    }
    if(this.y >canvas.height|| this.y< 0){
       this.yFart = -this.yFart;
    }
    this.x += this.xFart;
    this.y += this.yFart;

  }
}

class Spiller extends Sirkel {
  constructor(x, y, farge, fart){
    super(x, y, farge);
    this.fart = fart;
  }

  flytt(){
    if(knapper[37]||knapper[65]) {spiller.x-=spiller.fart;
      if(spiller.x<=0){
        spiller.x=15;
      }
    }
    if(knapper[39]||knapper[68]) {spiller.x+=spiller.fart;
      if(spiller.x>=900){
        spiller.x=900-15;
      }
    }
    if(knapper[38]||knapper[87]) {spiller.y-=spiller.fart;
      if(spiller.y<=0){
        spiller.y=15;
      }
    }
    if(knapper[40]||knapper[83]){spiller.y+=spiller.fart;
      if(spiller.y>=600){
        spiller.y=600-15;
      }
    }
  }
}

var farger = [
  {spiller: "blue", hinder:"red"},
  {spiller: "green", hinder:"purple"},
  {spiller: "yellow", hinder:"blue"},
  {spiller: "purple", hinder:"green"},
  {spiller: "pink", hinder:"green"},
  {spiller: "lightgrey", hinder:"blue"},
  {spiller: "blue", hinder:"yellow"},
  {spiller: "orange", hinder:"white"},
  {spiller: "white", hinder:"orange"},
  {spiller: "green", hinder:"red"},
  {spiller: "red", hinder:"green"},

];

var i=Math.floor(Math.random()*farger.length);

var spillerfarge= farger[i].spiller;
var hinderfarge = farger[i].hinder;

var spiller = new Spiller(canvas.width/2, canvas.height/2, spillerfarge, 15);

var hinder = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, 20);
var hinder2 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -15);
var hinder3 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -10);
/*var hinder4 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -5);
var hinder5 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -5);
var hinder6 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -5);
var hinder7 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -5);
var hinder8 = new Hinder(Math.random()*900, Math.random()*600, hinderfarge, -5);*/

ferdigEL.style.color=spillerfarge;
boks.style.color=spillerfarge;