var bodyEL = document.querySelector("body");
var ferdigEL = document.querySelector(".ferdig");
var beholder1 = document.querySelector(".beholder1");
var gameover = document.querySelector(".gameover");
var canvas = document.querySelector("#brett");
var ctx = canvas.getContext("2d");

var nåtid;
var starttid=new Date();
var klikktime=new Date();
var hangtime=0;
var p=0;
var antHopp = 0;
var trykk = 0;
var spillerFart = 15;
var tyngdekraft = 9.81;
var hinderfart = 5;
var radius = 15;
var mellomrom = 150;
var hinderBredde = 100;
var fortegn1 = -1;
var fortegn2 = 1;

window.addEventListener("keydown", mottaTaster);

function mottaTaster(e){
  if (e.key === " "){
    klikktime = new Date();
    antHopp+=1;
    trykk+=1;
    fortegn2 = fortegn2 *-1;
    fortegn1 = fortegn1 *-1;
    }
}

animasjonsID = requestAnimationFrame(animer);

function animer(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    hangtime = ((klikktime - new Date())/1000)*-1;
    nåtid = new Date();
    var tid = ((starttid - nåtid)/1000)*-1;

    spiller1.flytt();
    spiller1.tegn();

    hinder1.flytt();
    hinder1.tegn();

    hinder2.flytt();
    hinder2.tegn();

    vispoeng();

    if(spiller1.y+radius>=600-hinder1.hoyde  && 450+radius>=hinder1.x && 450-radius<=hinder1.x+hinderBredde  ){
     cancelAnimationFrame(animasjonsID);
     ferdig();
   }else if(spiller1.y-radius<=600-mellomrom-hinder1.hoyde && 450+radius>=hinder1.x && 450-radius<=hinder1.x+hinderBredde ){
     cancelAnimationFrame(animasjonsID);
     ferdig();
   }else if(spiller1.y+radius>=600-hinder2.hoyde  && 450+radius>=hinder2.x && 450-radius<=hinder2.x+hinderBredde  ){
     cancelAnimationFrame(animasjonsID);
     ferdig();
   }else if(spiller1.y-radius<=600-mellomrom-hinder2.hoyde && 450+radius>=hinder2.x && 450-radius<=hinder2.x+hinderBredde ){
     cancelAnimationFrame(animasjonsID);
     ferdig();
    }else{
      animasjonsID = requestAnimationFrame(animer);
    }

}

function vispoeng(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.font="20px Verdana"
        ctx.globalAlpha=1;
        ctx.fillText(p +" dodges",canvas.width/2-30,25);
        ctx.restore();
}

function ferdig(){
      var gjennomsnitt= antHopp/p;
      ferdigEL.style.color=hinderFarge;
      beholder1.style.display="none";
      ferdigEL.innerHTML="<h1>GAME OVER</h1>";
      gameover.innerHTML+="Average changes per obstacle " + gjennomsnitt;
      gameover.innerHTML+="<h1>" + p + " obstacles with " + antHopp + " changes in gravitanional pull</h1><br><h3>Press ENTER or R to restart</h3>";
      gameover.innerHTML+="<br><br><br><br><br><br><br><br><br>Made by Adrian Wist Hakvåg";

      window.addEventListener("keydown", sjekk);
      function sjekk(e){
          if (e.keyCode === 13){
            location.reload();
          }else if(e.keyCode === 82){
            location.reload();
          }
        }
}

class hinder{
  constructor(x,hoyde,bredde,farge,fart){
      this.x=x;
      this.hoyde=hoyde;
      this.farge=farge;
      this.fart=fart;
      this.bredde = bredde;
    }

  tegn(){
      ctx.beginPath();
      ctx.fillStyle = this.farge;
      ctx.fillRect(this.x, 600-this.hoyde , this.bredde, this.hoyde);
      ctx.closePath;

      ctx.beginPath();
      ctx.fillStyle = this.farge;
      ctx.fillRect(this.x, 0, this.bredde, 600-this.hoyde-mellomrom);
      ctx.closePath;
    }

    flytt(){
      this.x-=this.fart;

      if(this.x<=-hinderBredde){
        this.hoyde = Math.floor(Math.random()*400);
        this.x=900;
      }

      if(this.x==450-hinderBredde){
        p+=1;
      }
    }
}
class sprettBrett{
  constructor(x,y,fart,farge){
    this.x=x;
    this.y=y
    this.fart=fart;
    this.farge=farge;

  }
  tegn(){
    ctx.beginPath();
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x-radius,this.y+radius, radius*2, 5);
    ctx.closePath;
    }

  flytt(){
    this.x-=this.fart;
    }

}



var h1=Math.floor(Math.random()*400);
var h2=Math.floor(Math.random()*400);

class spiller {
    constructor(y,farge, fart){
      this.y=y;
      this.fart= fart;
      this.farge= farge;
    }

    flytt(){

      this.y+= fortegn1*this.fart + fortegn2*tyngdekraft*Math.pow((hangtime+1), 2);

      if(this.y>=600+radius){
        //this.y = 600-radius; //uten sprett
        //klikktime = new Date(); //med sprett
        this.y=radius+1 //kom tilbake motsatt
        antHopp+=1;
      }

      if(this.y<=radius){
        //this.y=radius; //stopp i taket
        this.y=600+radius; //kom tilbake motsatt
      }
    }

    tegn(){
      ctx.beginPath();
      ctx.arc(450, this.y, radius, 0 , Math.PI*2);
      ctx.fillStyle = this.farge;
      ctx.fill();
      ctx.stroke();
      ctx.closePath;
    }
}

var farger = [
  {spiller: "blue", hinder:"red"},
  {spiller: "green", hinder:"purple"},
  {spiller: "yellow", hinder:"blue"},
  {spiller: "purple", hinder:"green"},
  {spiller: "pink", hinder:"green"},
  {spiller: "orange", hinder:"black"},
  {spiller: "black", hinder:"orange"},
  {spiller: "green", hinder:"red"},
  {spiller: "yellow", hinder:"green"},
  {spiller: "pink", hinder:"blue"},
  {spiller: "#80FF72", hinder:"#7EE8FA"},
];

var i=Math.floor(Math.random()*farger.length);

var spillerFarge= farger[i].spiller;
var hinderFarge = farger[i].hinder;

var spiller1 = new spiller(300, spillerFarge, spillerFart);
var hinder1 = new hinder(900, h1, hinderBredde, hinderFarge, hinderfart);
var hinder2 = new hinder(900+hinderBredde*1.5+((900-2*hinderBredde)/2), h2,hinderBredde, hinderFarge, hinderfart);
