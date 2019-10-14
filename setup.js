
var promptForHuman;
var human;

{ // GAME
	
	var Xcoor;
	var Ycoor;
	var playerSize;
	var blockSize;
	
	var colours;
	
	var fonts;
	
	var startMs;
	var ms;
	var s;
	
	var w;
	var h;
	
	var scene;
	
	var score;
	var highScore;
	var middleCheck;
	var middleCheckAll;
	var play;
	var lives;
	
	var transitionDown;
	var transitioningSecond;
	
	var slideScene;
	var slideSceneNum;
	var hoverDot;
	var hoveredDot;
	var slide;
	var xSlide;
	var ySlide;
	var maxSpeed;
	
	var clicked;
	var buttonHover;
	var buttonClicked;
	
	var flagStartEndHover;
	
	var startFlags;
	var endFlags;
	var middleFlags;
	
	var animationBlocksL;
	var animationBlocksR;
	var blocksMoving;
	
	var messagesBad;
	var messageToDisplay;
	var messageTime;
	
	var speech;
	var speechScene;
	
	var textureRects;
	var dots;
	
	var theStart;
	var theMiddles;
	var theEnd;

}

{ // AI

var sensors;
var radii;
var radarMax;

var nodesPerLayer;
var n;
var weights;
var a;
var addToWeights;

var inner_repeat_num;
var final_node_temp;
var inputs;
var oldRadii;
var radiiDiff;
var xDiff;
var yDiff;
var ai_cycles;
var stimulus_decay_rate;
var grouped;
var NetInfluenceFraction;
var Speed;

var flagBias;

var firstSceneClicked;

var f=['Quicksand','Playfair-Display'];

var goTime;

function sigmoid(x){
	return 1 / (1 + exp(-x));
}


// Initialises the node array by consulting and looping through the array "nodesPerLayer"
function init_node_structure(){
	var x = [];
	for (var layer=0; layer<nodesPerLayer.length; layer+=1){
		x.push([]);
		for (var node=0; node<nodesPerLayer[layer]; node+=1){
			x[layer].push(0);
		}
	}
	return x
}

// Initialises the weight array by consulting and looping through the array "nodesPerLayer"
function init_weight_structure(){
    var x = [];
    var wireNum;
    var tempW;
    for (var layer=0; layer<nodesPerLayer.length-1; layer+=1){
      x.push([]);
      wireNum = nodesPerLayer[layer]*nodesPerLayer[layer+1];
      for (var wire=0; wire<wireNum; wire+=1){
        tempW = 0;
        if (nodesPerLayer.length > 2){
	        tempW = 1;//(10**nodesPerLayer.length) * (10**-5)
        }
        x[layer].push(tempW);
      }
    }
    return x;
}

}


function setup() {
	
	firstSceneClicked = false;
	
	frameRate(30);
	
	w = window.innerWidth;
	h = window.innerHeight;
	canvas = createCanvas(w, h);
	
	
  ///////////////////////////////////////////////
  angleMode(DEGREES);
	playerSize = 10;
	blockSize = 5;
	
	colours = {
	    background : color(253, 253, 254),
	    main : color(8, 84, 161),
	    mainTrans : color(8, 84, 161,100),
	    secondary : color(196, 51, 86)
	};
	
	fonts = {
	    title : "Trebuchet MS",   
	    main : f[0]
	};
	
	startMs = millis();
	
	textAlign(CENTER,CENTER);
	
	scene = "LOADING";
	
	score = 0;
	highScore = 0;
	middleCheck = [0];
	middleCheckAll = false;
	play = false;
	
	transitionDown = 0;
	transitioningSecond = false;
	
	slideScene = 1;
	slideSceneNum = 5;
	hoverDot = false;
	hoveredDot = true;
	slide = false;
	xSlide = 0;
	ySlide = h*242/400;
	maxSpeed = w*38/400;
	
	clicked = "";
	buttonHover = "";
	buttonClicked = "";
	
	flagStartEndHover = false;
	
	startFlags = [];
	startFlags.push({x:random(w/4,3*w/4),y:h/5}); // h/10
	endFlags = [];
	endFlags.push({x:random(w/4,3*w/4),y:4*h/5});
	middleFlags = [];
	middleFlags.push({x:random(w/4,3*w/4),y:random(h/4,3*h/4)});
	
	animationBlocksL = [];
	animationBlocksR = [];
	blocksMoving = true;
	
	messagesBad = [
	    "Ouch !","Oupsy Daisy...","NOOO !","Arggh !","Bother.","Not again !","Well, you got more\nthan me !","But..."
	    ];
	messageToDisplay = {
	    index: "",
	    rotation: "",
	    x: "",
	    y : ""
	};
	messageTime=0;
	
	speech = ["Hope you had\n(or will) have fun !","Thanks for playing!","Bye...","Why are you still\nclicking ?","","Oh, here we go\nagain..."];
	speechScene = 1;

  
  
  textureRects = [];
	for (var i = 5; i < w; i += 20){
    for(var j = -20; j < h+20; j += 20){
        textureRects.push({x: i, y: j, br: random(0, 10)});
    }
	}
	
	dots = {
    polygonDots : new exampleDots(w/2,h/2,9,7,4,5,3)
	}
	
	initialiseBlocks();
	
	theMiddles = [];
	  ///////////////////////////////////////////////

		
	sensors = 4;
	radii = [];
	oldRadii = [];
	radarMax = 300;
	for (var i=0; i<sensors; i+=1){
		radii.push(radarMax);
		oldRadii.push(radarMax);
	}
	
	nodesPerLayer = [sensors, 4];
	
	n = init_node_structure();
  weights = init_weight_structure();
// 	weights = [[1,0,-1,0,0,1,0,-1]];
  a = init_node_structure();
  ai_cycles = 0;
  stimulus_decay_rate = 0.0;
  grouped = 4;
  NetInfluenceFraction = 0.5;
  Speed = 8;
  
  flagBias = [0,0];
}
