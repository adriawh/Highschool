var canvas = document.querySelector("#brett");
var ctx = canvas.getContext("2d");
var prosentBoks = document.querySelector(".prosentBoks");

var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
var boksSize = 40;
var fallFart=boksSize;
var rekker = canvas.height/boksSize;
var kolonner = canvas.width/boksSize;
var antRuter = rekker*kolonner;
var antBoks = 0;
var b=0;
var n=0;
var t=0;
var space = 0;

var boks = [];

window.addEventListener("keydown", mottaTaster);


function mottaTaster(e){
  if (e.keyCode == 37){
      box1.x-=boksSize;
        if(box1.x<=0){
          box1.x=0;
        }
    }
    if (e.keyCode == 39){
        box1.x+=canvas.width;
          if(box1.x>=canvas.width-boksSize){
            box1.x=canvas.width-boksSize;
          }
      }
   if (e.keyCode == 32){
     if(space == 0){
       cancelAnimationFrame(animasjonsID);
       space+=1;
       console.log(space);
     }else if(space=1){
         requestAnimationFrame(animer);
          space-=1;

          console.log(space);
     }


    }
}


animasjonsID = requestAnimationFrame(animer);
function animer(){
  ctx.clearRect(0,0, canvas.width, canvas.height);

  for(i=0;i<kolonner-1;i++){
    ctx.beginPath();
    ctx.strokeStyle= "lightgrey";
    ctx.moveTo(boksSize+i*boksSize,0);
    ctx.lineTo(boksSize+i*boksSize,canvas.height);
    ctx.stroke();
  }
  for(i=0;i<rekker-1;i++){
    ctx.beginPath();
    ctx.moveTo(0,boksSize+i*boksSize);
    ctx.lineTo(canvas.width,boksSize+i*boksSize);
    ctx.stroke();
  }

  for(i=0;i<boks.length;i++){
    ctx.beginPath();
    ctx.fillStyle = boks[i].farge;
    ctx.fillRect(boks[i].x,boks[i].y, boksSize, boksSize);
    ctx.closePath;
  }


  /*for(i=0;i<boks.length;i++){
    var a=0;
    if(boks[i].y=canvas.length-boksSize){
      a++;
    }
    if(a=10){
      if(boks[i].y=canvas.length-boksSize){
        boks[i].y-=boksSize;
      }
    }

  }*/

  box1.flytt();
  box1.tegn();

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
      ny();
    }
    for(i=0;i<boks.length;i++){
      if(box1.x == boks[i].x && box1.y == boks[i].y-boksSize){
        ny();
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

function ny(){
antBoks+=0.0000001;
  color = '#'+(0x1000000+antBoks*0x1000000000).toString(16).substr(1,6);

  n++;
  if(n>9){
    n=0;
  }
  boks.push({x: box1.x, y: box1.y, farge:box1.farge},);
  var prosent = Math.floor(boks.length/antRuter*100);

  prosentBoks.innerHTML=prosent + "%";
  if(boks.length==antRuter){
    boks = [];
  }
  box1= new box(boksSize*n,-boksSize, color, fallFart);

}

var box1= new box(0,-boksSize, color, fallFart);

