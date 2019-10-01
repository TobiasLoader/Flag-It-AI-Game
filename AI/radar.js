
function newRadarReadingInstance(X,Y,L){
	angle = acos((X-Xcoor)/L);
	if (Y<Ycoor){
		angle = 360-angle;		
	}
	I = floor(sensors*(angle+(180/sensors))/360);
	if (I===sensors){
		I = 0;
	}
	var temp = [radii[I],I];
	
	if (L<radii[I]){
		temp[0] = L;
	}
	
	return temp;
}

function readingWall(wallAngle,coor){
	I = floor(sensors*(wallAngle+(180/sensors))/360);
	var temp = [radii[I],I];
	if (wallAngle===0 ){
  	if (w-coor < radii[I]){
  		temp[0] = w-coor;
  	}
	}
	if (wallAngle===90){
  	if (h-coor < radii[I]){
  		temp[0] = h-coor;
  	}
	}
	if (wallAngle===180 || wallAngle===270){
  	if (coor < radii[I]){
  		temp[0] = coor;
  	}
	}
	return temp;
}

function radar(){
	noFill();
	fill(0,10);
	stroke(0,100);
	radii = [];
	if (ai_cycles%grouped == 0){
		newMins = [radarMax,radarMax];
	}
	var DL = radarMax;
	var DR = radarMax;
	for (var i = 0; i < sensors; i += 1){
		radii.push(radarMax);
	}
	var angle;
	var I;
		
	var results;
	
	for (var i = 0; i < animationBlocksL.length-1; i += 1){
		DL = dist(animationBlocksL[i].x,animationBlocksL[i].y,Xcoor,Ycoor);
		DR = dist(animationBlocksR[i].x,animationBlocksR[i].y,Xcoor,Ycoor);
		if (DL<radarMax){
			results = newRadarReadingInstance(animationBlocksL[i].x,animationBlocksL[i].y,DL);
			radii[results[1]] = results[0];
		}
		if (DR<radarMax){
			results = newRadarReadingInstance(animationBlocksR[i].x,animationBlocksR[i].y,DR);
			radii[results[1]] = results[0];
  	}
  	
  	results = readingWall(0, Xcoor);
  	radii[results[1]] = results[0];
		
  	results = readingWall(90, Ycoor);
  	radii[results[1]] = results[0];
		
  	results = readingWall(180, Xcoor);
  	radii[results[1]] = results[0];
		
  	results = readingWall(270, Ycoor);
  	radii[results[1]] = results[0];
		
	}
	
	
	for (var i=0; i<sensors; i+=1){
/*
		switch (i){
			case 0: fill(255); break;
			case 1: fill(255,0,0); break;
			case 2: fill(0,255,0); break;
			case 3: fill(0,0,255); break;
		}
*/
		arc(Xcoor,Ycoor,2*radii[i],2*radii[i],(i)*(360/sensors)-(180/sensors),(i+1)*(360/sensors)-(180/sensors));
	}
	
	if (!human){
		for (var j=0; j<4; j+=1){
		  for (var i=j*sensors; i<(j+1)*sensors; i+=1){  
		  fill(255*(2-(weights[nodesPerLayer.length-2][i]+1))/2, 0, 255*(weights[nodesPerLayer.length-2][i]+1)/2,200*abs(weights[nodesPerLayer.length-2][i]));
/*
		  switch (j){
				case 0: fill(255); break;
				case 1: fill(255,0,0); break;
				case 2: fill(0,255,0); break;
				case 3: fill(0,0,255); break;
			}
*/
			arc(w-radarMax*((4-j)/2),h-radarMax/2,radarMax*abs(weights[nodesPerLayer.length-2][i])/2,radarMax*abs(weights[nodesPerLayer.length-2][i])/2,(i)*(360/sensors)-(180/sensors),(i+1)*(360/sensors)-(180/sensors));
			}
/*
			for (var i=sensors; i<2*sensors; i+=1){
			  fill(255*(2-(weights[nodesPerLayer.length-2][i]+1))/2, 0, 255*(weights[nodesPerLayer.length-2][i]+1)/2,200*abs(weights[nodesPerLayer.length-2][i]));
				arc(w-radarMax/2,h-radarMax/2,radarMax*abs(weights[nodesPerLayer.length-2][i])/2,radarMax*abs(weights[nodesPerLayer.length-2][i])/2,(i)*(360/sensors)-(180/sensors),(i+1)*(360/sensors)-(180/sensors));
			}
*/
		}
	}
}
