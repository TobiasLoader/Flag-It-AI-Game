
function game() {
	rectMode(CORNER);
	if (human){
//   	cursor("");
  } else {
	  cursor(HAND);
  }
  buttonHover = "";
  flagStartEndHover=false;
  hoverDot = false;
  time();
  
  if ((human) || (!human && !(scene === "GO" && play === true))){
	  Xcoor = mouseX;
	  Ycoor = mouseY;
  }
  backgroundPattern();
  whichScenes(scene);
}
