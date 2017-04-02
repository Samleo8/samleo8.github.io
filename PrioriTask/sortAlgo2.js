var x1,y1,x2,y2,x3,y3,x4,y4;
var Px,Py;
var det,k=1;
var URGENCY_MAX = 1/365;
var IMPORTANCE_MAX = 365;
var dist;

//Comparison Line Gradient
var cM = -URGENCY_MAX/IMPORTANCE_MAX;
//Testing Line Gradient
var tM = IMPORTANCE_MAX/URGENCY_MAX;

function getPriority(x1,y1){ //importance,urgency
	//Constant
	x3 = 0;
	y3 = 0;
	
	x4 = 1;
	y4 = cM;
	
	//Varied
	x2 = x1-k;
	y2 = y1-k*tM;
	
	//Getting the intersection point between 2 lines.
	det = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
	
	Px = ((x1*y2-y1*x2)*(x3-x4) - (x1-x2)*(x3*y4-x4*y3))/det;
	Py = ((x1*y2-y1*x2)*(y3-y4) - (y1-x2)*(x3*y4-x4*y3))/det;
	
	return getDist(Px,Py,x1,y1);
}

function getDist(p1x,p1y,p2x,p2y){
	return Math.sqrt((p1x-p2x)*(p1x-p2x)+(p1y-p2y)*(p1y-p2y));
}

function computePriority(){
	priority.clear();
	
	for(i=0;i<task.length;i++){
		importance = taskImpt[i]*73; //(365/5) = 73 
		urgency = taskDeadline[i]/**taskTimeNeeded[i]*/;
		
		priority.push(getPriority(importance,urgency)+"_"+importance+"_"+i); 
		//sort first by priority, then by importance. Task id for reference later only.
	}
	
	priority.sort();
	console.log("New priority: "+priority);
}

