


function time(){
    ms = millis()-startMs;
    s = ms/1000;
}

function displayMessage(fromMessages,messageNeedingDislayed){
    fill(colours.background);
    textFont(fonts.main,w*20/400);
    push();
    translate(messageNeedingDislayed.x,messageNeedingDislayed.y);
    rotate(messageNeedingDislayed.rotation);
    text(fromMessages[messageNeedingDislayed.index],0,0);
    pop();
}

function speechBubble(){
    fill(colours.background);
    stroke(colours.secondary);
    strokeWeight(1);
    rect(w*160/400,h/2,w/2,h*115/400,w*5/400);
    triangle(w*163/400,h*315/400,w*140/400,h*310/400,w*160/400,h*297/400);
    noStroke();
    triangle(w*165/400,h*315/400,w*144/400,h*310/400,w*161/400,h*297/400);
    fill(140, 140, 140);
    textFont(fonts.main,(w+h)*1/40);
    text(speech[speechScene-1],w*263/400,h*259/400);
}

function collision(block){
    if ((Xcoor+playerSize/2 > block.x-block.size/2 && Xcoor-playerSize/2 < block.x+block.size/2 && Ycoor+playerSize/2 > block.y-block.size/2 && Ycoor-playerSize/2 < block.y+block.size/2) || (Xcoor<0 || Xcoor>w || Ycoor<0 || Ycoor>h)){
        lives-=1;
        middleCheckAll=false;
        middleCheck = [];
        for (var i=0; i<theMiddles.length; i+=1){
            middleCheck.push(0);
        }
        if (human){
        	play=false;
        } else {
/*
	        Xcoor = startFlags[score].x;
				  Ycoor = startFlags[score].y;
*/
        }
        messageToDisplay.index = round(random(0,7));
        messageToDisplay.rotation = random(-10,10);
        messageToDisplay.x = Xcoor;
        messageToDisplay.y = Ycoor;
        messageTime=s;
    }
}

function transition(){
    noStroke();
    fill(colours.main);
    rectMode(CORNER);
    rect(0,0,w,transitionDown);
    stroke(colours.background);
    strokeWeight(2);
    for (var y=20; y<h; y+=80){
        for(var x=10;x<w; x+=40){
            line(x,transitionDown-y,x+20,transitionDown-y);
        }
    }
    strokeWeight(1);
}
function transitionFirst(transitionTo){
    if (transitionDown<h){
        transitionDown+=40-20*(transitionDown/h);
    } else {
        transitioningSecond = true;
        scene = transitionTo;
    }
    transition();
}
function transitionSecond(){
    if (transitioningSecond){
        if (transitionDown>0){
            transitionDown-=40-20*(transitionDown/h);
        } else {
            transitionDown = 0;
            clicked = "";
            transitioningSecond = false;   
        }
        transition();
    }
}
function transitionCodeForScene(currentScene,nextScene){
    if (clicked===currentScene){
        transitionFirst(nextScene);    
    }
}

function textShadow(TEXT,x,y,diff){
	noStroke();
  fill(colours.mainTrans);
  text(TEXT,x-diff,y+diff);
  fill(colours.main);
}

function cornerLines(){
    stroke(colours.main);
    strokeWeight(1);
    for (var i=1;i<=2;i+=1){line(0,h/(i*16),w/(i*16),0);}
    for (var i=1;i<=2;i+=1){line(w,h/(i*16),w-w/(i*16),0);}
    for (var i=1;i<=2;i+=1){line(w,h-h/(i*16),w-w/(i*16),h);}
    for (var i=1;i<=2;i+=1){line(0,h-h/(i*16),w/(i*16),h);}
}
function backgroundPattern(){
    background(colours.background);
    noStroke();
    for(var i=0; i<textureRects.length; i+=1){
        fill(0, 0, 0, textureRects[i].br);
        rect(textureRects[i].x, textureRects[i].y, 20, 20);
    }
    cornerLines();
}
function backgroundAnimation(animationBlocksExample,colour){
    fill(colour);
    noStroke();
    for (var i=0; i<animationBlocksExample.length; i+=1){
        rect(animationBlocksExample[i].x,animationBlocksExample[i].y,animationBlocksExample[i].size,animationBlocksExample[i].size);
        animationBlocksExample[i].x += animationBlocksExample[i].speed;
        switch (animationBlocksExample){
            case animationBlocksL : if (animationBlocksExample[i].x>w){
                                        animationBlocksExample[i].x = 0;
                                    } break;
            case animationBlocksR : if (animationBlocksExample[i].x<0){
                                        animationBlocksExample[i].x = w;
                                    } break;
        }
        if (play&&!flagStartEndHover){
            collision(animationBlocksExample[i]);
        }
    }
}
function backgroundAnimationBoth(colour){
    backgroundAnimation(animationBlocksL,colour);
    backgroundAnimation(animationBlocksR,colour);
}
function addBlocks(){
	if (blocksMoving){
	  for (var i = 0; i < h; i += 100){
	    animationBlocksL.push({x: random(-w/2,0), y: random(0,h), speed: random((score/2)+1, (score/2)+2), size: random(blockSize-1,blockSize+1)});
			animationBlocksR.push({x: random(w,3*w/2), y: random(0,h), speed: random(-((score/2)+2), -((score/2)+1)), size: random(blockSize-1,blockSize+1)});
	  }
  } else {
	  for (var i = 0; i < h; i += 100){
	    animationBlocksL.push({x: random(0,w), y: i, speed: random(0.1, 0.2), size: random(blockSize-1,blockSize+1)});
	    animationBlocksR.push({x: random(0,w), y: i-20, speed: random(-0.1, -0.2), size: random(blockSize-1,blockSize+1)});
	  }
  }
    }
function initialiseBlocks(){
	animationBlocksL = [];
  animationBlocksR = [];
	if (blocksMoving){
	  for (var i = 0; i < h; i += 40){
	    animationBlocksL.push({x: random(-w/2,0), y: i, speed: random(1, 3), size: random(blockSize-1,blockSize+1)});
	    animationBlocksR.push({x: random(w,3*w/2), y: i-20, speed: random(-3, -1), size: random(blockSize-1,blockSize+1)});
	  }
  } else {
	  for (var i = 0; i < h; i += 40){
	    animationBlocksL.push({x: random(0,w), y: i, speed: random(0.1, 0.2), size: random(blockSize-1,blockSize+1)});
	    animationBlocksR.push({x: random(0,w), y: i-20, speed: random(-0.1, -0.2), size: random(blockSize-1,blockSize+1)});
	  }
  }
}


function exampleDots(x,y,dotNum,dotSize,extraSize,extraDist,relTimeBig){
    this.x = x;
    this.y = y;
    this.dotNum = dotNum;
    this.dotSize = dotSize;
    this.extraSize = extraSize;
    this.extraDist = extraDist;
    this.relTimeBig = relTimeBig;
}

function dotsInPolygon(ex){
    noStroke();
    for (var i=0; i<ex.dotNum; i+=1){
        var X = ex.x+((ex.dotSize+ex.extraSize+ex.extraDist)/4*ex.dotNum*cos(i*(360/ex.dotNum)));
        var Y = ex.y+((ex.dotSize+ex.extraSize+ex.extraDist)/4*ex.dotNum*sin(i*(360/ex.dotNum)));
        var expand = (ex.extraSize*sin((millis()/ex.relTimeBig)+((360/ex.dotNum)*i)));
        ellipse(X,Y,ex.dotSize,ex.dotSize);
        ellipse(X,Y,ex.dotSize+expand,ex.dotSize+expand);
    }
}

function button(TEXT,X,Y,SIZE,TextSize){
	textAlign(CENTER,CENTER);
    var letterNum = 0;
    for (var letter in TEXT){
        letterNum+=1;
    }
    if (!TextSize){
        TextSize = (SIZE/3)-(4*letterNum)+10;
    }
    push();
    translate(X,Y);
    if (dist(Xcoor,Ycoor,X,Y)<SIZE/2){
        buttonHover=TEXT;
        cursor(HAND);
        rotate(10*sin(millis()/2));
    }
    textFont(fonts.main,TextSize);
    fill(colours.background);
    stroke(colours.main);
    ellipse(0,0,SIZE,SIZE);
    fill(colours.main);
    text(TEXT,0,0);
    pop();
    
    
}

function Flag(x,y){
  this.x = x;
  this.y = y;
  
  this.pole = function() {
    stroke(105,105,105);
    strokeWeight(2);
    line(this.x-6,this.y-9,this.x-6,this.y+11);
	}
	
	this.circle = function(borderOveride) {
		if (!borderOveride){
	    if ((play&&scene==="GO")||(scene==="HELP")){
	        stroke(207, 207, 207);
	    } else if (scene==="GO"){
	        stroke(colours.background);
	    }
    }
    strokeWeight(1);
    ellipse(this.x,this.y,40,40);
	}
}

Flag.prototype.drawStart = function(withPole,withCircle) {
	rectMode(CORNER);
    if (play){noFill();}
    else {fill(255, 255, 255);}
    if (withCircle){this.circle();}
    if (withPole){this.pole();}
    strokeWeight(1);
    fill(173, 207, 72);
    strokeWeight(1);
    rect(this.x-6,this.y-9,15,10);
}

Flag.prototype.drawEnd = function(withPole,withCircle) {
	rectMode(CORNER);
    noFill();
    
    middleCheckAll = true;
    for (var i=0; i<theMiddles.length; i+=1){
        if (!middleCheck[i]){
            middleCheckAll = false;
        }  
    }
    if (middleCheckAll){
	    stroke(237, 128, 154);
	    if (withCircle){this.circle(true);}
    } else {
	    if (withCircle){this.circle();}
    }
    middleCheckAll = false;
    
    if (withPole){this.pole();}
    
    fill(237, 128, 154);
    strokeWeight(1);
    rect(this.x-6,this.y-9,15,10);
}

Flag.prototype.drawMiddle = function(withPole,withCircle) {
	rectMode(CORNER);
    noFill();
    if (withCircle){this.circle();}
    if (withPole){this.pole();}
    fill(255, 255, 255);
    strokeWeight(1);
    rect(this.x-6,this.y-9,15,10);
}

function slideDots(y,dotNum,size,coloursUsed) {
    stroke(coloursUsed[3]);
    strokeWeight(1);
    for ( var i=1; i<(dotNum+1); i+=1){
        fill(coloursUsed[0]);
        if (dist((w/2)-((((dotNum+1)*20)/2)*size)+(i*20*size),y-(10*(size-1)),Xcoor,Ycoor)<(10*size)/2){
            fill(coloursUsed[1]);
            hoverDot = i;
            cursor(HAND);
        }
        ellipse((w/2)-((((dotNum+1)*20)/2)*size)+(i*20*size),y-(10*(size-1)),(10*size),(10*size));
    }
    
    noStroke();
    fill(coloursUsed[2]);
    if (!slide){
        ellipse((width/2)-((((dotNum+1)*20)/2)*size)+(slideScene*20*size),y-(10*(size-1)),(10*size),(10*size)); 
    }
}
function sliding(){
    if (hoveredDot<slideScene && xSlide<width){
        if (xSlide<width/2){
            xSlide+=(maxSpeed*((2*xSlide)/width)+0.5);
        } else {
            xSlide+=(maxSpeed*(width/(2*xSlide))-(maxSpeed/3));
        }
        slideContent(-width+xSlide,ySlide,hoveredDot);
    }
    else if (hoveredDot>slideScene && xSlide>-width){
        if (xSlide>-width/2){
            xSlide-=(maxSpeed*((2*xSlide)/-width)+0.5);
        } else {
            xSlide-=(maxSpeed*(-width/(2*xSlide))-(maxSpeed/3));
        }
        slideContent(width+xSlide,ySlide,hoveredDot);
    }
    else {
        slideScene = hoveredDot;
        xSlide=0;
        hoveredDot = false;
        slide = false;
    }
}


function player(){
    fill(colours.secondary);
    strokeWeight(1);
    rectMode(CENTER);
    stroke(colours.background);
    rect(Xcoor,Ycoor,playerSize,playerSize);
    rectMode(CORNER);
}

function reShuffle(){
		middleCheckAll=false;
    middleCheck = [];
    for (var i=0; i<theMiddles.length; i+=1){
        middleCheck.push(0);
    } 
		startFlags.push({x:random(w/4,3*w/4),y:h/5}); // h/10
		endFlags.push({x:random(w/4,3*w/4),y:4*h/5});
		middleFlags.push({x:random(w/4,3*w/4),y:random(h/4,3*h/4)});
}
function hoverOverStart(theStart){
    if (dist(Xcoor,Ycoor,theStart.x,theStart.y)<(40/2)){
        cursor(HAND);
        play=true;
        flagStartEndHover=true;
    }
    if (!play){
        fill(colours.mainTrans);
        rect(0,0,w,h);    
        strokeWeight(2);
        stroke(255, 255, 255);
        noFill();
        arc(theStart.x+42,theStart.y+10,50,50,62,132);
        line(theStart.x+25,theStart.y+28,theStart.x+33,theStart.y+26);
        line(theStart.x+25,theStart.y+28,theStart.x+26,theStart.y+36);
        strokeWeight(1);
    } else {
//         cursor("none");
    }
}
function hoverOverMiddles(theMiddles){
    for (var i=0; i<theMiddles.length; i+=1){
        if (dist(theMiddles[i].x,theMiddles[i].y,Xcoor,Ycoor)<40/2){
            middleCheck[i] = 1;
        }
        if (middleCheck[i]){
            noFill();
            stroke(colours.secondary);
            ellipse(theMiddles[i].x,theMiddles[i].y,35,35);
        }
    }
}
function hoverOverEnd(theEnd,theMiddles){
    if (dist(theEnd.x,theEnd.y,Xcoor,Ycoor)<40/2){
        middleCheckAll = 1;
        flagStartEndHover=true;
        for (var i=0; i<theMiddles.length; i+=1){
            if (!middleCheck[i]){
                middleCheckAll = 0;
            }  
        }
    }
    if (middleCheckAll){
        score+=1;
        reShuffle();
        addBlocks();
        if (human){
        	play = false;
        }
        else {
				  Xcoor = startFlags[score].x;
				  Ycoor = startFlags[score].y;
        }
    }
}

function whichScenes(theScene) {
    if (!play){
        backgroundAnimationBoth(colours.mainTrans);    
    }
    switch (theScene) {
        case "LOADING": loading(); break;
        case "MENU": menu(); break;
        case "HELP": help(); break;
        case "THANKS": thanks(); break;
        case "GO": go(); break;
        case "GAME OVER": gameOver(); break;
    }
}


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight
  textureRects = [];
  for (var i = 5; i < w; i += 20){
    for(var j = -20; j < h+20; j += 20){
        textureRects.push({x: i, y: j, br: random(0, 10)});
    }
	}
	ySlide = h*242/400;
}

function mouseClicked(){
    if (transitionDown<=0){
        clicked = scene;
    }
    buttonClicked = buttonHover;
    if (scene==="HELP"){
        if (hoverDot&&!slide){
            hoveredDot = hoverDot;
            slide = true;
        }    
    }
    if (scene==="THANKS" && !buttonHover){
        if (speechScene<6){
            speechScene+=1;
        } else {
            speechScene=1;
        }
    }
}

function mouseOut(){
    if (scene === "GO"){
        middleCheckAll=false;
        middleCheck = [];
        for (var i=0; i<theMiddles.length; i+=1){
            middleCheck.push(0);
        } 
        play=false;
    }
}
