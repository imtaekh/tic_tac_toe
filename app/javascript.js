var square= document.querySelectorAll(".square");
var result= document.querySelector(".result");
var teamX= document.querySelector(".teamX");
var teamO= document.querySelector(".teamO");
var rematchButton= document.querySelector(".rematchButton");
var themeChangeButton= document.querySelector(".themeChangeButton");
var vs= document.querySelector("header h2");

var maxTheme=2;
var themeNum=0;
var theme={
  0:{
    title:"Batman VS Superman",
    X:{
      name:"BATMAN",
      image: ["images/00batman.png","images/00batman_wins.png"],
      string:"B",
      color:"rgba(200,200,200, 1)",
      backgroundColor:"rgba(0,0,0, 0.5)"
    },
    O:{
      name:"SUPERMAN",
      image: ["images/00superman.png","images/00superman_wins.png"],
      string:"S",
      color:"rgba(200,50,50, 1)",
      backgroundColor:"rgba(0,100,255, 0.5)"
    },
    background: {
      image: "images/00background.jpg",
      height: 1137,
      width: 2048
    }
  },
  1:{
    title:"Android VS Iphone",
    X:{
      name:"ANDROID",
      image: ["images/01android.png","images/01android_wins.png"],
      string:"A",
      color:"rgba(255,255,255, 1)",
      backgroundColor:"rgba(150, 220, 10, 0.5)"
    },
    O:{
      name:"IPHONE",
      image: ["images/01iphone.png","images/01iphone_wins.png"],
      string:"I",
      color:"rgba(0,0,0, 1)",
      backgroundColor:"rgba(255,255,255, 0.7)"
    },
    background: {
      image: "images/01background.jpg",
      height: 1080,
      width: 1920
    }
  }
};
var mouse={};
var squareData;
var whosTurn;
var winner;

function resetThemeChange(){
  themeNum=(themeNum+1)%maxTheme;
  reset();
}

function reset(){
  // reset background
  document.body.style.background="url('"+theme[themeNum].background.image+"') no-repeat center center fixed";
  if(window.innerHeight/window.innerWidth<theme[themeNum].background.height/theme[themeNum].background.width){
    console.log("if");
    document.body.style.backgroundSize="110% auto";
  } else {
    console.log("else");
    document.body.style.backgroundSize="auto 110%";
  }
  // reset theme[themeNum].title
  vs.innerHTML=theme[themeNum].title;

  // reset chracter images
  teamX.style.width="35%";
  teamX.style.background="url('"+theme[themeNum].X.image[0]+"') no-repeat";
  teamX.style.backgroundSize="cover";
  teamX.style.backgroundPosition="center top";
  teamO.style.width="35%";
  teamO.style.background="url('"+theme[themeNum].O.image[0]+"') no-repeat";
  teamO.style.backgroundSize="cover";
  teamO.style.backgroundPosition="center top";

  // reset game board
  for(var i=0; i<square.length; i++){
    square[i].firstChild.innerHTML="";
    square[i].style.backgroundColor="";
    square[i].style.color="gray";
  }
  // reset buttons & reseult div
  rematchButton.style.display="none";
  themeChangeButton.style.display="none";
  result.innerHTML="";
  result.style.color="red";
  result.style.fontSize="30px";

  // reset game data
  squareData=[[null,null,null],[null,null,null],[null,null,null]];
  (Math.floor(Math.random()*2)==0)?whosTurn="X":whosTurn="O";
  winner=null;
}
function draw(){
  for(var i=0; i<squareData.length; i++){
    for(var j=0; j<squareData[i].length; j++){
      if(squareData[i][j]){
        var num = i*3+j;
        square[num].firstChild.innerHTML=theme[themeNum][squareData[i][j].toString()].string;
      }
    }
  }
}
function winCheck(){
  for(var i=0; i<3; i++){
    if(squareData[i][0]==squareData[i][1]&&squareData[i][1]==squareData[i][2]||squareData[0][i]==squareData[1][i]&&squareData[1][i]==squareData[2][i]){
      if(squareData[i][i]){
        winner = squareData[i][i];
      }
    }
  }
  if(squareData[0][0]==squareData[1][1]&&squareData[1][1]==squareData[2][2]||squareData[0][2]==squareData[1][1]&&squareData[1][1]==squareData[2][0]){
    if(squareData[1][1]){
     winner = squareData[1][1];
   }
  }
  if(squareData[0][0]&&squareData[0][1]&&squareData[0][2]&&squareData[1][0]&&squareData[1][1]&&squareData[1][2]&&squareData[2][0]&&squareData[2][1]&&squareData[2][2]&&!winner){
     winner = "draw";
  }
}
for(var i=0; i<square.length; i++){
  square[i].num=i;
  square[i].addEventListener("click", function(){
    var i =Math.floor(this.num/3);
    var j =this.num%3;
    if(!squareData[i][j]&&!winner){

      squareData[i][j]=whosTurn;
      this.style.backgroundColor=theme[themeNum][whosTurn.toString()].backgroundColor;
      this.style.color=theme[themeNum][whosTurn.toString()].color;
      (whosTurn==="X")? whosTurn="O" : whosTurn="X" ;

      draw();
      winCheck();
      if(winner){
      result.style.color="black";
      result.style.fontSize="50px";
      rematchButton.style.display="initial";
      themeChangeButton.style.display="initial";
        if(winner=="X"){
          result.innerHTML=theme[themeNum][winner.toString()].name+" wins!";
          teamO.style.width="50%";
          teamO.style.background="url('"+theme[themeNum].X.image[1]+"') no-repeat";
          teamO.style.backgroundSize="cover";
          teamO.style.backgroundPosition="center top";
          teamX.style.background="";
        } else if(winner=="O"){
          result.innerHTML=theme[themeNum][winner.toString()].name+" wins!";
          teamX.style.width="50%";
          teamX.style.background="url('"+theme[themeNum].O.image[1]+"') no-repeat";
          teamX.style.backgroundSize="cover";
          teamX.style.backgroundPosition="center top";
          teamO.style.background="";
        }else{
          result.innerHTML="Draw!";
        }
      }
    }
  });
  square[i].addEventListener("mouseover", function(){
    var i =Math.floor(this.num/3);
    var j =this.num%3;
    if(!squareData[i][j]&&!winner){
      this.style.color="gray";
      this.firstChild.innerHTML=theme[themeNum][whosTurn.toString()].string;
    }
  });
  square[i].addEventListener("mouseout", function(){
    var i =Math.floor(this.num/3);
    var j =this.num%3;
    if(!squareData[i][j]&&!winner){
    this.firstChild.innerHTML="";
    }
  });
}
rematchButton.addEventListener("click", reset);
themeChangeButton.addEventListener("click", resetThemeChange);
document.addEventListener("mousemove",function(e){
  mouse.x=e.pageX;
  mouse.y=e.pageY;
//  console.log(mouse.x,mouse.y);
  var x=50+((mouse.x-window.innerWidth/2)/window.innerWidth/2)*50
  var y=50+((mouse.y-window.innerHeight/2)/window.innerHeight/2)*50

  document.body.style.backgroundPosition=x.toFixed(1)+"% "+y.toFixed(1)+"%";
  //document.body.style.backgroundPosition=x+"% "+y+"%";


});
reset();
