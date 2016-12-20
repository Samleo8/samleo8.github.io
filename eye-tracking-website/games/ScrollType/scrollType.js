var gameStarted = false;
var outTypeEle;
var outWordEle;
var gameBtn;
var gameTimer;
var cnt;
var senComplete = false;
var threshold = 8;
var correct = 0;
var wrong = 0;
var startTime;
var timer;
var rawSecPassed;
var ttlCh = 0;
var bgInd = 1;

var sen = new Array(
	"type. swipe button.",
	"ITS not CASE SENSiTive",
	"You are getting the hang of this.",
	"123xyz",
	"Keep going for the true test...",
	"This application simulates working with multi-screens,",
	"where you use one screen to type,",
	"and another to scroll.",
	"Try to use your mouse to switch sentences.",
	"It is very inconvenient.",
	"It is too inefficient.",
	"It is overly unproductive.",
	"But with eye-tracking, everything changes.",
	"Convenient.",
	"Efficient.",
	"Productive.",
	"Hands-free and to the point.",
	"The power of eye-tracking,",
	"could revolutionise the way you work.",
	"It can enhance productivity,",
	"improve interaction,",
	"and make everything convenient.",
	"It can change your life"
);

//var sen = new Array("jiaks");

var newSen = new Array();

function newGame(){
    ttlCh = 0;
	senComplete = false;
	gameStarted = false;
	correct = 0;
	wrong = 0;
    rawSecPassed = 0;
	outTypeEle = document.getElementById("game-type-out");
	outWordEle = document.getElementById("game-word-type");
    gameBtn = document.getElementById("game-next-btn");
    gameTimer = document.getElementById("game-timer");
    gameTimer.innerHTML = "00:00";
    outTypeEle.innerHTML = "Type to Start...";
    
	currSen = 0;
	cnt = 0;
	
	for(i=0;i<sen.length;i++){
		str = "";
        ttlCh += sen[i].length;
		for(j=0;j<sen[i].length;j++){
			str+="<span id='game-letter-"+j+"' class='game-letter-null'>"+sen[i][j]+"</span>";
		}
		newSen[i] = str;
	}

	outWordEle.innerHTML = newSen[0];
    
	document.getElementById("hiddenTextBox").focus();
}

function doType(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
	document.getElementById("hiddenTextBox").focus();
    
    if(!gameStarted && event.keyCode==8)return;
	if(!gameStarted && isValidChar(event.keyCode)){
		outTypeEle.innerHTML = ""; 			
        gameBtn.innerHTML = "NEXT SENTENCE";
		
        startTime = new Date();
		startTime = startTime.getTime();
		
		timer = setInterval(showTime,1000);
        
		gameStarted = true;		
	}
    
    if(currSen >= newSen.length){
        newGame();
        return;
    }
    
	k = event.keyCode;
	c = String.fromCharCode(k).toLowerCase();
	if(k==190) c=".";
	if(k==188) c=",";
	if(k==189) c="-";
	if(isValidChar(k)){
		if(cnt<sen[currSen].length){
			outTypeEle.innerHTML += c;
			if(c==sen[currSen][cnt].toLowerCase()){
				setLetter(cnt,"right");
			}
			else setLetter(cnt,"wrong");
			cnt++;
            if(cnt == sen[currSen].length){
                gameBtn.className+=" flashing";
            }
            else{
                gameBtn.className = gameBtn.className.replace(" flashing","");
            }
		}
	}
	else if(k==13){
		//outTypeEle.innerHTML += "<br>\n";
	}
	else if(k==8){
		typed = outTypeEle.innerHTML;
		if(lastChar(typed) != "\n"){
			outTypeEle.innerHTML = typed.slice(0, -1);
			if(cnt) cnt--;
			setLetter(cnt,"null");
		}
	}
}

function nextSen(){
    gameBtn.className = gameBtn.className.replace(" flashing","");
    
    if(currSen >= newSen.length){
        newGame();
        return;
    }
    
	if(cnt>=sen[currSen].length){
		cnt = 0;
		currSen++;
		correct += getElementsByClassName("game-letter-right").length;
		wrong += getElementsByClassName("game-letter-wrong").length;
		
		if(currSen%threshold) outTypeEle.innerHTML += "<br>\n";
		else outTypeEle.innerHTML = "";
		
		if(currSen == newSen.length){
			clearInterval(timer);
			out = "CPM: "+parseInt(ttlCh/Math.max(1,rawSecPassed/60));
			out += "<br>Right: "+correct+", Wrong: "+wrong;
			outWordEle.innerHTML = out;
			gameBtn.innerHTML = "NEW GAME";
		}
		else{
			outWordEle.innerHTML = newSen[currSen];
		}
	}
}

function setLetter(ind,type){
	document.getElementById("game-letter-"+cnt).className = "game-letter-"+type;
}

function showTime(){
	d = new Date();
	d = d.getTime();
	rawSecPassed = parseInt((d-startTime)/1000);
	mPassed = parseInt(rawSecPassed/60);
	sPassed = rawSecPassed%60;
	sPassed = ((sPassed<10)?"0":"") + sPassed;
	mPassed = ((mPassed<10)?"0":"") + mPassed;
	document.getElementById("game-timer").innerHTML = mPassed+":"+sPassed;
}

function isValidChar(k){	
	if(k>=65 && k<=90) return true;
	if(k>=48 && k<=57) return true;
	if(k==32 || k==188 || k==189 || k==190) return true;
	
	return false;
}

function lastChar(str){
	return str[str.length-1];
}

function deleteLast(str){
	return str.slice(0,-1);
}

var preventDefault = function (event) {
    if (window.event) { window.event.returnValue = false; }
    else if (event.preventDefault) { event.preventDefault(); }
    else { event.returnValue = false; }
};

function getElementsByClassName(searchClass,node,tag) {
	var classElements = new Array();

	if (node == null) node = document;
	if (tag == null) tag = '*';

	var els = node.getElementsByTagName(tag);

	var elsLen = els.length;

	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function loadBg(){
    if(localStorage["bgSaved"]=="true"){
        changeBg(JSON.parse(localStorage["savedBg"]));
    }
    else changeBg(bgInd);
}

function changeBg(bgInd){
    document.getElementsByTagName("html")[0].className = "bg"+bgInd;
    if(window.localStorage){
        localStorage["bgSaved"] = true;
        localStorage["savedBg"] = bgInd;
    }
}