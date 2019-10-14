
// FUNCTIONS ---------------------------------------------------------------------------

// finds the value of the node at position [x][y]: STAGE 1
function val_of_node(x, y){
	var s = 0;
	for (var i=0; i<nodesPerLayer[x-1]; i+=1){
		s += n[x-1][i] * weights[x-1][y + i*nodesPerLayer[x]];
	}
	return s
}

// find the stimulus function for each output node: STAGE 2
function stimulus_function(i){
	/*
	if (final_node[i]>aim[i]){
		return -pow((aim[i] - final_node[i]), 2);
	} else {
		return pow((aim[i] - final_node[i]), 2);
	}
*/
// 	var toAdd = 0;
/*
	switch (i){
		case 0: if (xDiff > 0){ return pow(xDiff,2); } else { return -pow(xDiff,2); } break;
		case 1: if (yDiff > 0){ return pow(yDiff,2); } else { return -pow(yDiff,2); } break;
		case 2: if (xDiff < 0){ return pow(xDiff,2); } else { return -pow(xDiff,2); } break;
		case 3: if (yDiff < 0){ return pow(yDiff,2); } else { return -pow(yDiff,2); }
	}
*/
	switch (i){
		case 0: if (xDiff > 0){ return pow(xDiff,2); } else { return 0; } break;
		case 1: if (yDiff > 0){ return pow(yDiff,2); } else { return 0; } break;
		case 2: if (xDiff < 0){ return pow(xDiff,2); } else { return 0; } break;
		case 3: if (yDiff < 0){ return pow(yDiff,2); } else { return 0; }
	}
/*
switch (i){
		case 0: if (xDiff > 0){ return xDiff; } else { return -xDiff; } break;
		case 1: if (yDiff > 0){ return yDiff; } else { return -yDiff; } break;
		case 2: if (xDiff < 0){ return -xDiff; } else { return xDiff; } break;
		case 3: if (yDiff < 0){ return -yDiff; } else { return yDiff; }
	}
*/

/*
switch (i){
		case 0: if (xDiff > 0){ return xDiff; } break;
		case 1: if (yDiff > 0){ return yDiff; } break;
		case 2: if (xDiff < 0){ return -xDiff; } break;
		case 3: if (yDiff < 0){ return -yDiff; }
	}
*/
// 	return toAdd;
}

function findRadiiDiff(){
	var x = [];
	for (var i=0; i<sensors; i+=1){
		x.push((radii[i]-oldRadii[i])/radarMax);
	}
	return x;
}

function stimulus_setup(){
	radiiDiff = findRadiiDiff();
	xDiff = 0;
	yDiff = 0;
	for (var i=0; i<sensors; i+=1){
		xDiff += radiiDiff[i]*cos(i * 360/sensors);
// 		alert(radiiDiff[i]*cos(i * 360/sensors));
	}
	for (var i=0; i<sensors; i+=1){
		yDiff += radiiDiff[i]*sin(i * 360/sensors);
	}
	
	xDiff = 4*(2*sigmoid(xDiff)-1);
	yDiff = 4*(2*sigmoid(yDiff)-1);
	
// 	alert('X: ' + xDiff);
// 	alert('Y: ' + yDiff);
}

// Calculates what the previous node should have been according to the stimulus function: STAGE 3
function aim_of_prev_node(x, y){
	var s = 0;
	for (var i=0; i<nodesPerLayer[x+1]; i+=1){
		if (weights[x][y + i*nodesPerLayer[x]]){
			s += a[x+1][i] * weights[x][y + i*nodesPerLayer[x]];
		}
	}
	return (1/nodesPerLayer[x-1])*s;
}

// Calculates what would have been a better weight: STAGE 4
function new_weight_calc(x, y, a, n){
	return (a[x+1][y % nodesPerLayer[x+1]]) * (n[x][floor(y / nodesPerLayer[x+1])])
}

// Keeps the weights roughly between -1 and 1
function refine_weights(){
	for (var k=0; k<init_weight_structure().length; k += 1){
		var m = 0;
		for (var l=0; l<weights[k].length; l+=1){
			m += abs(weights[k][l]);
		}
		m /= weights[k].length;
		for (var l=0; l<weights[k].length; l+=1){
			if (m){
				weights[k][l] *= (1/m);
			}
		}
	}
}


// TRAINING ---------------------------------------------------------------------------

function training(){
	
	ai_cycles += 1;
	
	// initialise variables inputs and new_w

	inputs = [];
	for (var i=0; i<radii.length; i+=1){
		inputs.push(1 - radii[i]/radarMax);
	}
		
	n = init_node_structure();
	n[0] = inputs;
	final_node_temp = init_node_structure()[nodesPerLayer.length-1];
	//	
	// ---------------------------- STAGE 1 --------------------------- FORWARD PROPAGATION
	
	if (nodesPerLayer.length > 2){
		for (var j=0; j<nodesPerLayer.length-1; j+=1){
			if (j){
				for (var k=0; k<nodesPerLayer[j]; k+=1){
					n[j][k] = val_of_node(j, k);
				}
			}
		}
	}

	for (var j=0; j<nodesPerLayer[nodesPerLayer.length-1]; j+=1){
		final_node_temp[j] = val_of_node(nodesPerLayer.length-1, j);
  }
/*
  var biasX = ((w/2)-Xcoor)/dist(Xcoor,Ycoor,w/2,h/2);
  var biasY = ((h/2)-Ycoor)/dist(Xcoor,Ycoor,w/2,h/2);
*/
//   if ((final_node_temp[0] < 0 && Xcoor > abs(final_node_temp[0])) || (final_node_temp[0] > 0 && w-Xcoor > final_node_temp[0])){
	if (final_node_temp[0]>final_node_temp[2]){
	  Xcoor += Speed*((NetInfluenceFraction)*(final_node_temp[0]) + (1-NetInfluenceFraction)*flagBias[0]);
	} else {
		Xcoor -= Speed*((NetInfluenceFraction)*(final_node_temp[2]) - (1-NetInfluenceFraction)*flagBias[0]);
	}
	if (final_node_temp[1]>final_node_temp[3]){
	  Ycoor += Speed*((NetInfluenceFraction)*(final_node_temp[1]) + (1-NetInfluenceFraction)*flagBias[1]);
	} else {
		Ycoor -= Speed*((NetInfluenceFraction)*(final_node_temp[3]) - (1-NetInfluenceFraction)*flagBias[1]);
	}/*  + random(-0.1,0.1) */;
//   }
//   if ((final_node_temp[1] < 0 && Ycoor > abs(final_node_temp[1])) || (final_node_temp[1] > 0 && h-Ycoor > final_node_temp[1])){
// 	  Ycoor += 4*final_node_temp[1] + 2*flagBias[1];
// 	  Ycoor -= 4*final_node_temp[3] - 2*flagBias[1];/*  + random(-0.1,0.1) */;
// 		alert(weights);
//   }
	if (Xcoor<0 || Xcoor>w || Ycoor<0 || Ycoor>h){
	    Xcoor = startFlags[score].x;
	    Ycoor = startFlags[score].y;
	}  
  
  radar();
  closest_flag_bias();
					
	// ---------------------------- STAGE 2 -------------------------- STIMULUS FUNCTION OF OUTPUT
	
	n[nodesPerLayer.length-1] = final_node_temp;
	
	if (ai_cycles%grouped == 0){
		
		stimulus_setup();
		for (var j=0; j<nodesPerLayer[nodesPerLayer.length-1]; j+=1){
			a[a.length-1][j] = stimulus_function(j);
		}
				
		// ---------------------------- STAGE 3 -------------------------- BACK PROPAGATION
		
		if (nodesPerLayer.length > 2){
			for (var j=0; j<nodesPerLayer.length-2; j+=1){
				var k = nodesPerLayer.length - j - 2;
				for (var l=0; l<nodesPerLayer[k]; l+=1){
					a[k][l] = aim_of_prev_node(k, l);
				}
			}
		}
	// ---------------------------- STAGE 4 -------------------------- NEW WEIGHTS
		
		
			
		addToWeights = init_weight_structure();
		for (var j=0; j<init_weight_structure().length; j+=1){
			for (var k = 0; k<init_weight_structure()[j].length; k+=1){
				addToWeights[j][k] = new_weight_calc(j, k, a, n); //pow(exp(1),-stimulus_decay_rate*ai_cycles)*
			}
		}
	
		var P;
		for (var j=0; j<init_weight_structure().length; j+=1){
			for (var k = 0; k<init_weight_structure()[j].length; k+=1){
// 				if (k!==round(nodesPerLayer[nodesPerLayer.length-1]/4) && k!==round(3*nodesPerLayer[nodesPerLayer.length-1]/4) && k!==round(nodesPerLayer[nodesPerLayer.length-1]) && k!==round(3*nodesPerLayer[nodesPerLayer.length-1]/2)){
					P = 2*sigmoid(2*sigmoid(addToWeights[j][k]*pow(2,-stimulus_decay_rate*ai_cycles)/4)-1)-1;
					if (P>0){
						weights[j][k] = e_func(weights[j][k] + abs(1-weights[j][k])*P);
					} else if (P<0){
						weights[j][k] = e_func(weights[j][k] + abs(1+weights[j][k])*P);
					}
// 				}
			}
		}
		
	oldRadii = radii;
		
	for (var j=0; j<init_weight_structure().length; j+=1){
// 			alert("w = [["+str(weights[j][0])+", "+str(weights[j][1])+", "+str(weights[j][2])+", "+str(weights[j][3])+", "+str(weights[j][4])+", "+str(weights[j][5])+", "+str(weights[j][6])+", "+str(weights[j][7])+",\n"+str(weights[j][8])+", "+str(weights[j][9])+", "+str(weights[j][10])+", "+str(weights[j][11])+", "+str(weights[j][12])+", "+str(weights[j][13])+", "+str(weights[j][14])+", "+str(weights[j][15])+"]]");
	}
			
	}
	
// 	if (ai_cycles%200*grouped == 0){
// 		alert(wei ghts);	
// 	}
/*
		for (var k = 0; k<init_weight_structure()[0].length; k+=1){
			weights[0][k] = d_func(weights[0][k]/2);
		}
*/
// 	}
	
}
