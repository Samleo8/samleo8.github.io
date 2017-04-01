var MAX = 100;
var saveTiming = 1; //in minutes
saveTiming*=60000;
var grid = new Array(MAX);
var userGrid = new Array(MAX);

var challengeMode = false;
var challHintsH = ["2 1 1","2 3 1","5","1 6 1","2 4 3","3 4 4","2 3 9","18","5 5 5","4 7","3 1 2","2 1 2 1 2","2 3 3","9","8 1 1","13","1 6 3 1 1","8 5 1 1","4 2 1 3","5 1 1 1"];
var challHintsV = ["4 4","6 3","1 4 1 1 3","2 1 7 6","12 4 1","8 5","5 1 5","5 2 8","4 3 5","3 4","3 1 1","3 3 5","5 3 3","6 6"		,"6 1 1 1 1","5 7","4 1","3 3","3","2 3 2"];

var R,C;

//Colours
var cleared = "white";
var impossible = "red";
var filled = "blue";
var confirmed = "green";

//Random Values for Grid
window.onload = function(){
	document.getElementById("gridR").value = rand(3,12);
	document.getElementById("gridC").value = rand(3,12);
	loadGrid();
}

window.onbeforeunload = window.onunload = function(){
	if(confirm("Do you want to save your progress before exiting?")){
		saveGrid();
		alert("Saved!");
	}
}

window.setTimeout(saveGrid,saveTiming);

for(a=0;a<grid.length;a++){
	grid[a] = new Array(MAX);
	userGrid[a] = new Array(MAX);
}

var hintsH = new Array();
var hintsV = new Array();

function clearGrid(){
	if(!confirm("Are you sure you wanna clear?")) return;
	
	for(j=0;j<C;j++){
		for(i=0;i<R;i++){
			userGrid[i][j] = 0;
			document.getElementById("grid_"+i+"_"+j).style.backgroundColor = cleared;
		}
	}
}

function genGrid(){
	R = r = document.getElementById("gridR").value;
	C = c = document.getElementById("gridC").value;

	if(!challengeMode){
		randomGrid(r,c);
		genHints(r,c);
	}
	else{
		hintsV = challHintsV;
		hintsH = challHintsH;
		r = challHintsV.length;
		c = challHintsH.length;
	}
	
	outGrid(r,c);
}

function toggleImpossible(r,c){
	if(r==-1 && c==-1){
		return false;
	}
	else if(r==-1){
		clearPortion("row",c);
		return false;
	}
	else if(c==-1){
		clearPortion("col",r);
		return false;
	}	
	if(document.getElementById("grid_"+r+"_"+c).style.backgroundColor == cleared){
		document.getElementById("grid_"+r+"_"+c).style.backgroundColor = impossible;
		userGrid[r][c] = -1;
	}
	else if(document.getElementById("grid_"+r+"_"+c).style.backgroundColor == filled){
		document.getElementById("grid_"+r+"_"+c).style.backgroundColor = confirmed;
		userGrid[r][c] = 2;
	}
	else{
		document.getElementById("grid_"+r+"_"+c).style.backgroundColor = cleared; 
		userGrid[r][c] = 0;
	}

	return false;
}

function toggleColor(r,c){
	//hoverColor(r,c);
	if(r==-1 && c==-1){
		return;
	}
	else if(r==-1){
		confirmPortion("row",c);
		return;
	}
	else if(c==-1){
		confirmPortion("col",r);
		return;
	}
	
	if(document.getElementById("grid_"+r+"_"+c).style.backgroundColor == impossible || document.getElementById("grid_"+r+"_"+c).style.backgroundColor == confirmed) return;
	
	if(document.getElementById("grid_"+r+"_"+c).style.backgroundColor == cleared){
		document.getElementById("grid_"+r+"_"+c).style.backgroundColor = filled;
	}
	else{
		document.getElementById("grid_"+r+"_"+c).style.backgroundColor = cleared; 
	}

	userGrid[r][c]^=1;
	
	if(checkGrid()) win();
}

function checkGrid(){
	/*
	for(i=0;i<R;i++){
		for(j=0;j<C;j++){
			if(userGrid[i][j]^grid[i][j]) return false;
		}
	}
	//*/
	
	var tempHintsV = new Array();
	var tempHintsH = new Array();
	
	//Vertical Hints
	for(j=0;j<c;j++){ 
		count = 1;
		prev = 0;
		hint = "";
		for(i=0;i<r;i++){
			//alert("Current:"+grid[i][j]+" Prev:"+prev+" Cnt:"+count);
			if(userGrid[i][j]>0){
				if(prev){ //Curr:1 Prev:1
					count++;
				}
				else{ //Curr:1 Prev:0
					count = 1;
				}
				if(i==r-1){
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			else{
				if(prev){ //Curr:0 Prev:1
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			prev = (userGrid[i][j]>0)?1:0;
		}
		if(hint.length == 0) hint = "0";
		tempHintsV.push(hint);
	}
	
	//Vertical Hints
	for(i=0;i<r;i++){ 
		count = 1;
		prev = 0;
		hint = "";
		for(j=0;j<c;j++){
			//alert("Current:"+grid[i][j]+" Prev:"+prev+" Cnt:"+count);
			if(userGrid[i][j]>0){
				if(prev){ //Curr:1 Prev:1
					count++;
				}
				else{ //Curr:1 Prev:0
					count = 1;
				}
				if(j==c-1){
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			else{
				if(prev){ //Curr:0 Prev:1
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			prev = (userGrid[i][j]>0)?1:0;
		}
		//alert("hi");
		if(hint.length == 0) hint = "0";
		tempHintsH.push(hint);
	}
	
	if(!cmpArray(tempHintsH,hintsH) || !cmpArray(tempHintsV,hintsV)){
        message();
        return false;
    }
	
	return true;
}

function cmpArray(arr1,arr2){
	for(i in arr1){
		if(arr1[i] != arr2[i]){
			return false
		}
	}
	
	return true;
}

//Helping the user fill some stuff up
function helpConfirm(){
	var i,j;
	console.log("Helping..");
	
	for(i=0;i<hintsV.length;i++){
		jiaks = hintsV[i].split(" ");
        jiaks.pop();
        
        //For the hints whose length fills the row/col
		ttl = jiaks.length-1;
		for(j=0;j<jiaks.length;j++){
			ttl+=parseInt(jiaks[j]);
		}
        
		if(ttl==jiaks.length-1 || ttl==R){
			console.log("Found (Vertical): "+hintsV[i]);
			paintGrid("col",i,jiaks);
            continue;
		}
    
        //For the single digit numbers which will have overlaps
        if(jiaks.length==1 && parseInt(jiaks[0])>Math.floor(R/2)){
            var temp = [];
            for(j=0;j<R;j++){
                temp.push(0);
            }
            
            //To find overlap, fill max from the front, then max from the back and count the overlaps.
            var x = parseInt(jiaks[0]);
            for(j=0;j<x;j++){
                temp[j]+=1;
                temp[R-j-1]+=1;
            }
            
            for(j=0;j<temp.length;j++){
                if(temp[j]==2){
                    userGrid[j][i] = 2;		
                    document.getElementById("grid_"+j+"_"+i).style.backgroundColor = confirmed;
                }
            }
            
            console.log("Found (Vertical): "+hintsV[i]);
        }
	}
	
	for(i=0;i<hintsH.length;i++){
		jiaks = hintsH[i].split(" ");
        jiaks.pop();
        
        //For the hints whose length fills the row/col
		ttl = jiaks.length-1;
		for(j=0;j<jiaks.length;j++){
			ttl+=parseInt(jiaks[j]);
		}
		if(ttl==jiaks.length-1 || ttl==C){
			console.log("Found (Horizontal): "+hintsH[i]);
			paintGrid("row",i,jiaks);
		}
        
        //For the single digit numbers which will have overlaps
        if(jiaks.length==1 && parseInt(jiaks[0])>Math.floor(C/2)){
            var temp = [];
            for(j=0;j<C;j++){
                temp.push(0);
            }
            
            //To find overlap, fill max from the front, then max from the back and count the overlaps.
            var x = parseInt(jiaks[0]);
            for(j=0;j<x;j++){
                temp[j]+=1;
                temp[R-j-1]+=1;
            }
            
            for(j=0;j<temp.length;j++){
                if(temp[j]==2){
                    userGrid[i][j] = 2;		
                    document.getElementById("grid_"+i+"_"+j).style.backgroundColor = confirmed;
                }
            }
            console.log("Found (Horizontal): "+hintsH[i]);
        }
	}
    
	checkGrid();
}

function paintGrid(type,n,arr){
	var prev = 0;
	var i,j;
	if(isNaN(parseInt(arr[0]))){
		if(type=="r" || type=="row"){			
			for(i=0;i<C;i++){
				userGrid[n][i] = 0;		
				document.getElementById("grid_"+n+"_"+i).style.backgroundColor = impossible;
			}
		}
		if(type=="c" || type=="col" || type=="column"){			
			for(i=0;i<R;i++){
				userGrid[i][n] = 0;		
				document.getElementById("grid_"+i+"_"+n).style.backgroundColor = impossible;
			}
		}
		
		return;
	}
	
	if(type=="r" || type=="row"){
		for(i=0;i<arr.length;i++){
			arr[i] = parseInt(arr[i]);
			for(j=prev;j<prev+arr[i] && arr[i];j++){
				userGrid[n][j] = 2;		
				document.getElementById("grid_"+n+"_"+j).style.backgroundColor = confirmed;
			}

            if(i==arr.length-1) break;
            
			prev+=arr[i];
			document.getElementById("grid_"+n+"_"+prev).style.backgroundColor = impossible;
			userGrid[n][prev] = -1;
			++prev;
		}
	}
	else if(type=="c" || type=="col" || type=="column"){
		for(i=0;i<arr.length;i++){
			arr[i] = parseInt(arr[i]);
			for(j=prev;j<prev+arr[i] && arr[i];j++){
				userGrid[j][n] = 2;		
				document.getElementById("grid_"+j+"_"+n).style.backgroundColor = confirmed;
			}
			
            if(i==arr.length-1) break;
            
			prev+=arr[i];
			document.getElementById("grid_"+prev+"_"+n).style.backgroundColor = impossible;
			userGrid[prev][n] = -1;
			++prev;
		}
	}
}

function checkGridValid(){
	checkGrid();
		
}

function randomGrid(r,c){
	for(i=0;i<r;i++) for(j=0;j<c;j++){
		grid[i][j] = rand(0,1);//Math.round(Math.random()*highest+lowest);
		userGrid[i][j] = 0;
	}
}

function genHints(r,c){	
	hintsV.clear();
	hintsH.clear();

	//Vertical Hints
	for(j=0;j<c;j++){ 
		count = 1;
		prev = 0;
		hint = "";
		for(i=0;i<r;i++){
			//alert("Current:"+grid[i][j]+" Prev:"+prev+" Cnt:"+count);
			if(grid[i][j]){
				if(prev){ //Curr:1 Prev:1
					count++;
				}
				else{ //Curr:1 Prev:0
					count = 1;
				}
				if(i==r-1){
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			else{
				if(prev){ //Curr:0 Prev:1
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			prev = grid[i][j];
		}
		if(hint.length == 0) hint = "0";
		hintsV.push(hint);
	}
	
	//Vertical Hints
	for(i=0;i<r;i++){ 
		count = 1;
		prev = 0;
		hint = "";
		for(j=0;j<c;j++){
			//alert("Current:"+grid[i][j]+" Prev:"+prev+" Cnt:"+count);
			if(grid[i][j]){
				if(prev){ //Curr:1 Prev:1
					count++;
				}
				else{ //Curr:1 Prev:0
					count = 1;
				}
				if(j==c-1){
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			else{
				if(prev){ //Curr:0 Prev:1
					hint+=count+" ";
					//alert("break:"+count);
				}
			}
			prev = grid[i][j];
		}
		//alert("hi");
		if(hint.length == 0)hint = "0";
		hintsH.push(hint);
	}
	
	console.log("Hints Vertical:"+hintsV);
	console.log("Hints Horizontal:"+hintsH);
}

function outGrid(r,c){
	var bgClr,classz;
	out="<table id='playGrid'>";
	for(i=0;i<=r;i++){
		out+="<tr>";
		for(j=0;j<=c;j++){
			if(!i || !j){
				bgClr = "";
				classz = "hintSquare";
			}
			else{
				bgClr = cleared;
				classz = "";
			}
			
			out+="<td oncontextmenu='return toggleImpossible("+parseInt(i-1)+","+parseInt(j-1)+")' onclick='toggleColor("+parseInt(i-1)+","+parseInt(j-1)+")' id='grid_"+parseInt(i-1)+"_"+parseInt(j-1)+"' style='background-color:"+bgClr+";' style='"+classz+"'>";
			if(!i && j){
				out+=hintsV[j-1];
			}
			else if(!j && i){
				out+=hintsH[i-1];
			}
			out+="</td>";
		}	
		out+="</tr>";
	}
	out+="</table>";
	
	document.getElementById("output").innerHTML = out;
}

function confirmPortion(type,n){
	if(type=="r" || type=="row"){
		for(i=0;i<R;i++){
			if(userGrid[i][n]>0){
				userGrid[i][n] = 2;
				document.getElementById("grid_"+i+"_"+n).style.backgroundColor = confirmed;
			}
			else{
				userGrid[i][n] = -1;
				document.getElementById("grid_"+i+"_"+n).style.backgroundColor = impossible;
			}
		}
	}
	else if(type=="c" || type=="col" || type=="column"){
		for(i=0;i<C;i++){
			if(userGrid[n][i]>0){
				userGrid[n][i] = 2;
				document.getElementById("grid_"+n+"_"+i).style.backgroundColor = confirmed;
			}
			else{
				userGrid[n][i] = -1;
				document.getElementById("grid_"+n+"_"+i).style.backgroundColor = impossible;
			}
		}	
	}
}

function clearPortion(type,n){
	if(type=="r" || type=="row"){
		for(i=0;i<R;i++){
			userGrid[i][n] = 0;
			document.getElementById("grid_"+i+"_"+n).style.backgroundColor = cleared;
		}
	}
	else if(type=="c" || type=="col" || type=="column"){
		for(i=0;i<C;i++){
			userGrid[n][i] = 0;
			document.getElementById("grid_"+n+"_"+i).style.backgroundColor = cleared;
		}	
	}
}

function win(){
	console.log("Showing Final Puzzle");
	for(i=0;i<R;i++){
		for(j=0;j<C;j++){
			if(userGrid[i][j]>0){
				userGrid[i][j] = 2;
				document.getElementById("grid_"+i+"_"+j).style.backgroundColor = confirmed;
			}
			else{
				userGrid[i][j] = -1;
				document.getElementById("grid_"+i+"_"+j).style.backgroundColor = impossible;
			}
		}
	}
	
	alert("YOU WIN!");	
	restart();
}

function restart(){	
	for(a=0;a<grid.length;a++){
		grid[a] = new Array(MAX);
		userGrid[a] = new Array(MAX);
	}
	
	genGrid();
}

function pressKey(event){
	if(event.keyCode == 13) genGrid();
}

function rand(lowest,highest){
	num = Math.round(Math.random()*highest+lowest);
	if(num>highest){
		num = highest;
	}
	else if(num<lowest){
		num = lowest;
	}
	return num;
}

function toggleMode(m){
	challengeMode = m;
}

function loadGrid(){
	if(!localStorage['pixart_save']) return;

	R = r = parseInt(localStorage['pixart_rows']);
	C = c = parseInt(localStorage['pixart_cols']);
		
	hintsV = JSON.parse(localStorage['hintsV']);
	hintsH = JSON.parse(localStorage['hintsH']);
	userGrid = JSON.parse(localStorage['userGrid']);

	var bgClr,claszz;
	//Output	
	out="<table id='playGrid'>";
	for(i=0;i<=R;i++){
		classz = "";
		out+="<tr>";
		for(j=0;j<=C;j++){
			if(!i||!j){
				bgClr = "";
				classz = "hintSquare";
			}
			else if(userGrid[i-1][j-1]==1){
				bgClr = filled;
			}
			else if(userGrid[i-1][j-1]==2){
				bgClr = confirmed;
			}
			else if(userGrid[i-1][j-1]==-1){
				bgClr = impossible;
			}
			else{
				bgClr = cleared;
			}
			
			out+="<td oncontextmenu='return toggleImpossible("+parseInt(i-1)+","+parseInt(j-1)+")' onclick='toggleColor("+parseInt(i-1)+","+parseInt(j-1)+")' id='grid_"+parseInt(i-1)+"_"+parseInt(j-1)+"' style='background-color:"+bgClr+";' class='"+classz+"'>";			
			if(!i && j){
				out+=hintsV[j-1];
			}
			else if(!j && i){
				out+=hintsH[i-1];
			}
			out+="</td>";
		}	
		out+="</tr>";
	}
	out+="</table>";
	
	document.getElementById("output").innerHTML = out;
}

function saveGrid(){
	localStorage['pixart_save'] = true;
	localStorage['pixart_rows'] = R;
	localStorage['pixart_cols'] = C;
	
	localStorage['hintsV'] = JSON.stringify(hintsV);
	localStorage['hintsH'] = JSON.stringify(hintsH);
	localStorage['userGrid'] = JSON.stringify(userGrid);
}

Array.prototype.clear = function(){
    this.length = 0;
};


function message(msg){
    
}