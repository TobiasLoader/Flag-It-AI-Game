
function firstScene(){
	background(255);
	textFont(f[0],(window.innerWidth+window.innerHeight)/60);
	fill(0);
	noStroke();
	textAlign(CENTER,CENTER);
	text('Reinforcement Neural Network',window.innerWidth/2,4*window.innerHeight/40)
	var welcomeWidth = textWidth('Reinforcement Neural Network');
	textAlign(LEFT,CENTER);
	textSize((window.innerWidth+window.innerHeight)/130);
	text("An appropriate environment is necessary in order to train a neural network through reinforcement learning. In this project, a simple arcade style game I made is used for this purpose.\n\nThe premise of the game – Flag Run, is to move from a starting green flag to a finishing red flag via a number of intermediate white flags. Whilst doing so, flying objects must be avoided, the penalty for colliding with one being the loss of a life. After a successful run between the flags, the process repeats until all 3 starting lives have been lost, ending the game. The aim is to achieve the highest number of completed 'Flag Runs'.\n\nAfter clicking the button below you will be taken to the game's home page and invited to choose whether to play it using human intelligence, or to watch the network playing it using artificial intelligence.\n\nWhen the AI is playing the game it employs 'radar' around the player to collect data about approaching objects. This information is then fed into the network, which learns over time, ultimately what avoidance measures should be taken. This is achieved by a series of functions and algorithms, the first of which obtains an output from the network by a method called forward propagation. This output is then utilised to move the player through the environment, and a reward function determines whether the move had a positive or negative influence on the player's state, i.e: did it distance itself from other objects, or approach closer. Finally the results of the reward function are fed into the back propagation algorithm, altering the weights of the network. And thus the network learns through reinforcement.",window.innerWidth/2-1.6*welcomeWidth/2,7*window.innerHeight/40,1.6*welcomeWidth);
	
	
	fill(85);
	stroke(150);
	rect(window.innerWidth/2-125,17*window.innerHeight/20-20,250,40,2);
	fill(255);
	noStroke();
	textSize(12);
	textAlign(CENTER,CENTER);
	text("Click to Continue...",window.innerWidth/2-welcomeWidth/2,17*window.innerHeight/20,welcomeWidth);
	if (mouseX>(window.innerWidth/2 - 125) && mouseX<(window.innerWidth/2+125) && mouseY>17*window.innerHeight/20-20 && mouseY<17*window.innerHeight/20+20){	
		cursor('pointer');
	} else {
		cursor('default');
	}
}


function draw(){
	if (!firstSceneClicked){
		firstScene();
	} else {
		game();
		AI();
	}
}
