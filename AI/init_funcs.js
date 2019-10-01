
function neural_network(){
  n = init_node_structure();
  w = init_weight_structure();
  a = init_node_structure();
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

function a_func(x){
	return sin(90*x);
}
function b_func(x){
	if (x){
		var mult = abs(x)/x;
	} else {
		var mult = 1;
	}
	return mult*0.5*(a_func(2*abs(x)-1)+1);
}
function c_func(x){
	if (x){
		var mult = abs(x)/x;
	} else {
		var mult = 1;
	}
	return mult*0.5*(b_func(2*abs(x)-1)+1);
}
function d_func(x){
	if (x){
		var mult = abs(x)/x;
	} else {
		var mult = 1;
	}
	return mult*0.5*(c_func(2*abs(x)-1)+1);
}
function e_func(x){
	if (x){
		var mult = abs(x)/x;
	} else {
		var mult = 1;
	}
	return mult*0.5*(d_func(2*abs(x)-1)+1);
}

// Initialises the weight array by consulting and looping through the array "nodesPerLayer"
function init_weight_structure(){
    var x = [];
    for (var layer=0; layer<nodesPerLayer.length-1; layer+=1){
      x.push([]);
      var wireNum = nodesPerLayer[layer]*nodesPerLayer[layer+1];
      for (var wire=0; wire<wireNum; wire+=1){
        var tempW = 0;
        if (nodesPerLayer.length > 2){
	        tempW = random(0, 0.00000001);//(10**nodesPerLayer.length) * (10**-5)
        }
        x[layer].push(tempW);
      }
    }
    return x;
}

function flag_bias_equ(X,D){
// 	return 1-(X/(2*D+20));
	return (X+1)/(D);
}

function closest_flag_bias(){
	flagBias = [0,0];
	var closest = [0,0,0];
	var allCheck = true;
	for (var i=0; i<theMiddles.length; i+=1){
// 		alert(!middleCheck[i]);
		if (!middleCheck[i]){
			if (dist(theMiddles[i].x,theMiddles[i].y,Xcoor,Ycoor)<closest[0] || closest[0]===0){
				closest = [dist(theMiddles[i].x,theMiddles[i].y,Xcoor,Ycoor),theMiddles[i].x,theMiddles[i].y];
				flagBias[0] = flag_bias_equ(closest[1]-Xcoor,closest[0]);
				flagBias[1] = flag_bias_equ(closest[2]-Ycoor,closest[0]); //(closest[2]-Ycoor)/(closest[0]+10);
			}
			allCheck = false;
		}
	}
	if (allCheck) {
		closest = [dist(theEnd.x,theEnd.y,Xcoor,Ycoor),theEnd.x,theEnd.y];
		flagBias[0] = flag_bias_equ(closest[1]-Xcoor,closest[0]);
		flagBias[1] = flag_bias_equ(closest[2]-Ycoor,closest[0]);
	}
	
}


