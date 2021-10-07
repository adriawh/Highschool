var bodyEL = document.querySelector("body");

var canvas = document.querySelector("#brett");
var ctx = canvas.getContext("2d");

var startTid = new Date();

var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
var fallFart=5;
var boksSize = 40;
var startY = -boksSize;
var startX = 160;
var p = 0;
var b = 0;
var a = 0;
var space = 0;

var boks = [];
var rader = [];

window.addEventListener("keydown", mottaTaster);


function mottaTaster(e){
  if (e.key == "ArrowLeft"){
      box1.x-=boksSize;

      if(box1.x<=0){
        box1.x=0;
      }

      for(i=0;i<boks.length;i++){
        if(box1.x == boks[i].x && box1.y>boks[i].y-boksSize){
          box1.x=box1.x+boksSize;
        }
      }

    }
    if (e.key == "ArrowRight"){
        box1.x+=boksSize;

          if(box1.x>=canvas.width-boksSize){
            box1.x=canvas.width-boksSize;
          }
        for(i=0;i<boks.length;i++){
          if(box1.x == boks[i].x && box1.y>boks[i].y-boksSize){
            box1.x=box1.x-boksSize;
          }
        }
      }
   if (e.keyCode == 32){
     box1.y=canvas.height-boksSize;
     for(i=0;i<boks.length;i++){
       if(box1.x == boks[i].x){
         box1.y= boks[i].y-boksSize;
       }
     }
     ny();

    }
    if (e.key == "Escape"){
      if(space == 0){
        cancelAnimationFrame(animasjonsID);
        space+=1;
      }else if(space=1){
          requestAnimationFrame(animer);
           space-=1;
      }

     }
}


animasjonsID = requestAnimationFrame(animer);
function animer(){
  ctx.clearRect(0,0, canvas.width, canvas.height);


  for(i=0;i<9;i++){
    ctx.beginPath();
    ctx.strokeStyle= "lightgrey";
    ctx.moveTo(boksSize+i*boksSize,0);
    ctx.lineTo(boksSize+i*boksSize,canvas.height);
    ctx.stroke();
  }
  for(i=0;i<19;i++){
    ctx.beginPath();
    ctx.moveTo(0,boksSize+i*boksSize);
    ctx.lineTo(canvas.width,boksSize+i*boksSize);
    ctx.stroke();
  }

    box1.flytt();
    box1.tegn();

  for(i=0;i<boks.length;i++){
    ctx.beginPath();
    ctx.fillStyle = boks[i].farge;
    ctx.fillRect(boks[i].x,boks[i].y, boksSize, boksSize);
    ctx.closePath;
  }


  animasjonsID = requestAnimationFrame(animer);
}

class box{
  constructor(x, y, farge, fart){
    this.x=x;
    this.y=y;
    this.farge=farge;
    this.fart=fart;
  }

  flytt(){
    this.y+=this.fart;

    if(this.y>canvas.height-boksSize){
      this.y=canvas.height-boksSize;
      this.fart=0;
      return ny();
    }
    for(i=0;i<boks.length;i++){
      if(this.x == boks[i].x && this.y >= boks[i].y-boksSize ){
        return ny();
      }
    }

  }

  tegn(){
    ctx.beginPath();
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x,this.y, boksSize, boksSize);
    ctx.closePath;
  }
}


function pause(){
  cancelAnimationFrame(animasjonsID);
}

function gameover(){
  cancelAnimationFrame(animasjonsID);
  bodyEL.innerHTML="<h1>GAME OVER</h1>";
  bodyEL.innerHTML+="Du fjernet " + p + " rekker<br><br>";
  bodyEL.innerHTML+="<button onclick='location.reload()'>Restart</button>";
}


function ny(){
  rader=[];
  color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

  if(box1.y==0){
    return gameover();
  }
  boks.push({x: box1.x, y: box1.y, farge:box1.farge},);

  for(i=1;i<15;i++){
    for(j=0;j<boks.length;j++){
      if(boks[j].y==canvas.height-i*boksSize){
       a++;
      }
    }
    rader.push({rad:canvas.height-i*boksSize, ant:a});
    a=0;
  }

  for(i=0;i<rader.length;i++){
    if(rader[i].ant == 10){
      p+=1;
       for(j=0;j<boks.length;j++){
         if(boks[j].y == rader[i].rad){
            boks.splice(j,1);
            j--;
         }
       }
       for(j=0;j<boks.length;j++){
         boks[j].y+=boksSize;
       }
       }
    }



box1=new box(startX,startY, color, fallFart);
}

  box1= new box(startX,startY, color, fallFart);
