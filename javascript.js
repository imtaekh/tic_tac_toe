var square= document.querySelectorAll(".square");
var result= document.querySelector(".result");

var player={
  X:{
    string:"X",
    color:"white",
    backgroundColor:"#0099FF"
  },
  O:{
    string:"O",
    color:"white",
    backgroundColor:"#FF0066"
  }
};

var squareData;
var whosTurn;
var winner;

function reset(){
  squareData=[[null,null,null],[null,null,null],[null,null,null]];
  whosTurn="X";
  winner=null
  for(var i=0; i<square.length; i++){
    square[i].firstChild.innerHTML="";
    square[i].style.backgroundColor="";
  }
}
function draw(){
  for(var i=0; i<squareData.length; i++){
    for(var j=0; j<squareData[i].length; j++){
      if(squareData[i][j]){
        var num = i*3+j;
        square[num].firstChild.innerHTML=player[squareData[i][j].toString()].string;
      }
    }
  }
}
function winCheck(){
  for(var i=0; i<3; i++){
    if(squareData[i][0]==squareData[i][1]&&squareData[i][1]==squareData[i][2]||squareData[0][i]==squareData[1][i]&&squareData[1][i]==squareData[2][i]){
      if(squareData[i][i]){
        winner = squareData[i][i];
        console.log("win");
      }
    }
  }
  if(squareData[0][0]==squareData[1][1]&&squareData[1][1]==squareData[2][2]||squareData[0][2]==squareData[1][1]&&squareData[1][1]==squareData[2][0]){
    if(squareData[1][1]){
     winner = squareData[1][1];
     console.log("win");
   }
  }
}
for(var i=0; i<square.length; i++){
  square[i].num=i;
  square[i].addEventListener("click", function(){
    var i =Math.floor(this.num/3);
    var j =this.num%3;
    if(!squareData[i][j]&&!winner){
      console.log(i+""+j);
      squareData[i][j]=player[whosTurn.toString()].string;
      this.style.backgroundColor=player[whosTurn.toString()].backgroundColor;
      this.style.color=player[whosTurn.toString()].color;

      (whosTurn==="X")? whosTurn="O" : whosTurn="X" ;

      draw();
      winCheck();
      if(winner){
        result.innerHTML=winner+" win!";
      }
    }
  });
}

reset();
