

function slideContent(X,Y,theScene){
    var startFlag = new Flag(w*266/400+X,Y);
    var middleFlag = new Flag(w*266/400+X,Y);
    var endFlag = new Flag(w*245/400+X,Y);
    rectMode(CENTER);
    textFont(fonts.title,w*21/400);
    stroke(colours.main);
    fill(colours.background);
    rect(w/2+X,Y,w*249/400,h*150/400,10);
    noFill();
    rectMode(CORNER);
    textFont(fonts.main,w*19/400);
    switch (theScene){
        case 1 : 
            fill(150, 150, 150);
            text("Hover Over :",w*17/40+X,Y);
            startFlag.drawStart(true,true);
            break;
        case 2 : 
            fill(150, 150, 150);
            text("You are :",w*17/40+X,Y);
            fill(colours.secondary);
            noStroke();
            rect(X+w*231/400,Y-7,20,20);
            break;
        case 3 : 
            fill(150, 150, 150);
            text("Avoid :",w*17/40+X,Y);
            fill(colours.main);
            noStroke();
            rect(X+w*231/400,Y-7,20,20);
            break;
        case 4 : 
            fill(150, 150, 150);
            text("Collect All :",w*17/40+X,Y);
            middleFlag.drawMiddle(true,true);
            break;
        case 5 : 
            fill(150, 150, 150);
            text("Reach :",w*17/40+X,Y);
            endFlag.drawEnd(true,true);
            break;
    }
}

function slider(sliderY,slideSceneNum,slideSize,colours,slide){
    slideDots(sliderY,slideSceneNum,slideSize,colours);
    if (slide){
        sliding();   
    }
}

function playerBig(){
    fill(colours.secondary);
    noStroke();
    rect(w*50/400,h*250/400,(w+h)*76/800,(w+h)*76/800,(w+h)/400);
    stroke(255, 255, 255);
    strokeWeight((w+h)*6/800);
    point(w*74/400,h*279/400);
    point(w*102/400,h*279/400);
    noFill();
    strokeWeight(3);
    if (scene==="THANKS"){
        if (speechScene===1||speechScene===2||speechScene===3){
            arc(w*89/400,h*298/400,w*37/400,h*19/400,30,150);
        } else if (speechScene===4) {
            line(w*75/400,h*298/400,w*100/400,h*298/400);
        } else if (speechScene===6) {
            ellipse(w*92/400,h*303/400,w*16/400,h*8/400);
        }
    }
    
}

function loading(){
    fill(colours.main);
    dotsInPolygon(dots.polygonDots);
    textFont(fonts.title,(w+h)*30/800);
//     textAlign(CENTER);
/*
    text("LOADING",w*193/400,h*125/400);
    textShadow("LOADING",w/2,h*125/400);
*/
    fill(colours.main);
    if (s>1){
        transitionFirst("MENU");
    }
}
function menu(){
    var startFlag = new Flag(w*60/400,h*41/400);
    var middleFlag = new Flag(w*214/400,h*223/400);
    var endFlag = new Flag(w*355/400,h*364/400);

    score=0;
    fill(colours.main);
    textFont(fonts.title,(w+h)*20/400);
    text("FLAG RUN",w/2,h*135/400);
    textShadow("FLAG RUN",w/2,h*135/400,3);
    
    button("GO",w/2,260*h/400,h/6);
/*
    button("HELP",w*9/40,h*27/40,h*75/400);
    button("THANKS",w*31/40,h*27/40,h*75/400);
*/
    
    noFill();
    stroke(colours.main);
    arc(w*55/400,h*64/400,w*50/400,h*30/400,200,340);
    arc(w*354/400,h*387/400,w*50/400,h*30/400,200,340);
    startFlag.drawStart(true,false);
    middleFlag.drawMiddle(true,false);
    endFlag.drawEnd(true,false);
    
    if (buttonClicked){
        transitionCodeForScene(scene,buttonClicked);
    }
    transitionSecond();
}
function help(){
    fill(colours.main);
    textFont(fonts.title,(w+h)*25/400);
    text("HELP !",w/2,h*9/40);
    textShadow("HELP !",w/2,h*9/40,3);
    
    button("⇠",h/10,h/10,h/10,h*19/400);
    
    slideContent(xSlide,ySlide,slideScene);
    
    slider(h*369/400,slideSceneNum,1.6,[color(255, 255, 255),color(253, 254, 255),color(182, 212, 237),color(132, 184, 227)],slide);
    
    if (buttonClicked==="⇠"){
        transitionCodeForScene(scene,"MENU");
    }
    transitionSecond();
}
function thanks(){
    fill(colours.main);
    textFont(fonts.title,(w+h)*25/400);
    text("~ AI INFO ~",w/2,h*118/400);
    textShadow("~ AI INFO ~",w/2,h*118/400,3);
    
    button("⇠",h/10,h/10,h/10,h*19/400);
    
    playerBig();
    speechBubble();
    
    if (buttonClicked==="⇠"){
        transitionCodeForScene(scene,"MENU");
    }
    transitionSecond();
}
function go(){
    theStart = new Flag(startFlags[score].x,startFlags[score].y);
    theMiddles = [];
    for (var i in middleFlags){
        theMiddles.push(new Flag(middleFlags[i].x,middleFlags[i].y));
    }
    theEnd = new Flag(endFlags[score].x,endFlags[score].y);
    
    
    hoverOverStart(theStart);
    if (play){
        hoverOverMiddles(theMiddles);
        hoverOverEnd(theEnd,theMiddles);
    }
    
    if (s>(messageTime+1)){
        messageToDisplay.index="";
    }
    
    if (!flagStartEndHover&&play){
        backgroundAnimationBoth(colours.main);
    }
    if (flagStartEndHover&&play){
        backgroundAnimationBoth(colours.mainTrans);
    }
    
    button("⇠",h/10,h/10,h/10,h*19/400);
    button(score,w-h/10,h/10,h/10,h*19/400);
    if (!human){
    	button(lives,w-h/10,5*h/20,h/10,h*19/400);
    }

    
    if (play){
	    stroke(247, 247, 247);
	    fill(colours.main);
    }else {
	    stroke(colours.main);
	    fill(247, 247, 247);
    }
    for (var i=0; i<lives; i+=1){
        bezier(h*30/400+i*h*25/400, h*363/400, h*25/400+i*h*25/400, h*355/400, h*13/400+i*h*25/400, h*366/400, h*30/400+i*h*25/400, h*379/400);
        bezier(h*30/400+i*h*25/400, h*363/400, h*35/400+i*h*25/400, h*355/400, h*47/400+i*h*25/400, h*366/400, h*30/400+i*h*25/400, h*379/400);
    }
    
    theStart.drawStart(true,true);
    theEnd.drawEnd(true,true);
    for (var i in theMiddles){
        theMiddles[i].drawMiddle(true,true);        
    }
    
    if (messageToDisplay.index!==""){
        displayMessage(messagesBad,messageToDisplay);
    }
        
    player();
    
    if (lives<=0){
        transitionFirst("GAME OVER");   
    }
    if (buttonClicked==="⇠"){
        transitionCodeForScene(scene,"MENU");
    }
    transitionSecond();
}
function gameOver(){
    if (score>highScore){
        highScore = score;
    }
    
    fill(colours.main);
    textFont(fonts.title,35);
    push();
    translate(w/2,h*135/400);
    rotate(-3);
    text("\" BETTER LUCK\nNEXT TIME \"",0,0);
    textShadow("\" BETTER LUCK\nNEXT TIME \"",0,0,2);
    pop();
    
    textFont(fonts.main,32);
    text("SCORE : " +score,w/2,h*267/400);

    textFont(fonts.main,20);
    text("HIGH SCORE : " +highScore,w/2,h*301/400);
    noFill();
    stroke(colours.mainTrans);
    rect(w/4,h*232/400,w/2,h/4);
    
    button("⇠",h/10,h/10,h/10,h*19/400);
    
    play = false;
    lives = 3;
    startFlags = [];
    middleFlags = [];
    endFlags = [];
    
    if (buttonClicked==="⇠"){
        reShuffle();
        initialiseBlocks();
        transitionCodeForScene(scene,"MENU");
    }
    transitionSecond();
}

