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

var squareData;
var whosTurn;
var winner;

function resetThemeChange(){
  themeNum=(themeNum+1)%maxTheme;
  reset();
}

function reset(){
  // reset background
  $('body').css("background","url('"+theme[themeNum].background.image+"') no-repeat center center fixed");
  if(window.innerHeight/window.innerWidth<theme[themeNum].background.height/theme[themeNum].background.width){
    $('body').css("backgroundSize","110% auto");
  } else {
    $('body').css("backgroundSize","auto 110%");
  }
  // reset theme[themeNum].title
  $("header h2").html(theme[themeNum].title);

  // reset chracter images

  $(".teamX").css("width","35%");
  $(".teamX").css("background","url('"+theme[themeNum].X.image[0]+"') no-repeat");
  $(".teamX").css("backgroundSize","cover");
  $(".teamX").css("backgroundPosition","center top");
  $(".teamO").css("width","35%");
  $(".teamO").css("background","url('"+theme[themeNum].O.image[0]+"') no-repeat");
  $(".teamO").css("backgroundSize","cover");
  $(".teamO").css("backgroundPosition","center top");

  // reset game board
  $(".square").each(function(){
    $(this).children(":first").html("");
    $(this).css("backgroundColor","");
    $(this).css("color","gray");
  });

  // reset buttons & reseult div
  $(".rematchButton").css("display","none");
  $(".themeChangeButton").css("display","none");
  $(".result").html("");
  $(".result").css("color","red");
  $(".result").css("fontSize","30px");

  // reset game data
  squareData=[[null,null,null],[null,null,null],[null,null,null]];
  (Math.floor(Math.random()*2)==0)?whosTurn="X":whosTurn="O";
  winner=null;
}
function winCheck(){
  for(var i=0; i<3; i++){
    if(squareData[i][i]&&(squareData[i][0]==squareData[i][1]&&squareData[i][1]==squareData[i][2]||squareData[0][i]==squareData[1][i]&&squareData[1][i]==squareData[2][i])){
      winner = squareData[i][i];
    }
  }
  if(squareData[1][1]&&(squareData[0][0]==squareData[1][1]&&squareData[1][1]==squareData[2][2]||squareData[0][2]==squareData[1][1]&&squareData[1][1]==squareData[2][0])){
     winner = squareData[1][1];
  }
  if(squareData[0][0]&&squareData[0][1]&&squareData[0][2]&&squareData[1][0]&&squareData[1][1]&&squareData[1][2]&&squareData[2][0]&&squareData[2][1]&&squareData[2][2]&&!winner){
     winner = "draw";
  }
}

$(".square").on("click", function(){
  var num=$(".square").index($(this));
  var i = Math.floor(num/3);
  var j = num%3;
  if(!squareData[i][j]&&!winner){
    squareData[i][j]=whosTurn;
    $(this).css("backgroundColor",theme[themeNum][whosTurn.toString()].backgroundColor);
    $(this).css("color",theme[themeNum][whosTurn.toString()].color);
    (whosTurn==="X")? whosTurn="O" : whosTurn="X";

    winCheck();
    if(winner){
      $(".result").css("color","black");
      $(".result").css("fontSize","50px");
      $(".rematchButton").css("display","initial");
      $(".themeChangeButton").css("display","initial");
      if(winner=="X"){
        $(".result").html(theme[themeNum][winner.toString()].name+" wins!");
        $(".teamO").css("width","50%");
        $(".teamO").css("background","url('"+theme[themeNum].X.image[1]+"') no-repeat");
        $(".teamO").css("backgroundSize","cover");
        $(".teamO").css("backgroundPosition","center top");
        $(".teamX").css("background","");
      } else if(winner=="O"){
        $(".result").html(theme[themeNum][winner.toString()].name+" wins!");
        $(".teamX").css("width","50%");
        $(".teamX").css("background","url('"+theme[themeNum].O.image[1]+"') no-repeat");
        $(".teamX").css("backgroundSize","cover");
        $(".teamX").css("backgroundPosition","center top");
        $(".teamO").css("background","");
      }else{
        $(".result").html("Draw!");
      }
    }
  }
});
$(".square").on("mouseover", function(){
  var num=$(".square").index($(this));
  var i =Math.floor(num/3);
  var j =num%3;
  if(!squareData[i][j]&&!winner){
    this.style.color="gray";
    this.firstChild.innerHTML=theme[themeNum][whosTurn.toString()].string;
  }
});
$(".square").on("mouseout", function(){
  var num=$(".square").index($(this));
  var i =Math.floor(num/3);
  var j =num%3;
  if(!squareData[i][j]&&!winner){
  this.firstChild.innerHTML="";
  }
});

$(".rematchButton").on("click", reset);
$(".themeChangeButton").on("click", resetThemeChange);

var mouse={};
$(document).on("mousemove",function(e){
  mouse.x=e.pageX;
  mouse.y=e.pageY;
  var x=50+((mouse.x-window.innerWidth/2)/window.innerWidth/2)*50;
  var y=50+((mouse.y-window.innerHeight/2)/window.innerHeight/2)*50;
  $("body").css("backgroundPosition",x.toFixed(1)+"% "+y.toFixed(1)+"%");
});

reset();
