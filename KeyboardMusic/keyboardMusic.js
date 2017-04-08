// JavaScript Document - Keyboard Piano

function checkOS(){
	noteTiming = 500; //1000 = 1 sec
	notes = ["C","D","E","F","G","A","B","C1","D1","E1","F1","G1","C#","D#","","F#","G#"];
	keyboardDisabled = false;
	
	downKeys = new Array("");
	
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	
	if(OSName == "Windows"){
		keys = ["65","83","68","70","71","72","74","75","76","186","192","13","87","69","","84","89"];
		document.getElementById("k222").id = "k192";
	}
	else if(OSName == "MacOS" || OSName == "Linux"){
		keys = ["65","83","68","70","71","72","74","75","76","186","222","13","87","69","","84","89"];
	}
	else{
		keys = ["65","83","68","70","71","72","74","75","76","186","222","13","87","69","","84","89"];	
	}
	
	genStyles();
	detectBrowser();
	setInterval('removeExpired()',200);
}
function removeExpired(){
	embedz=document.getElementsByTagName("embed");
	for(i=0;i<embedz.length;i++){
		if(parseInt(embedz[i].id.split('t')[1])<new Date().getTime()-300){
			document.body.removeChild(embedz[i]);
		}
	}
}
function detectBrowser(){
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 
	 fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
			  (verOffset=nAgt.lastIndexOf('/')) ) 
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 if (browserName.toLowerCase()==browserName.toUpperCase()){
	  browserName = navigator.appName;
	 }
	}
	browserz = browserName;
}

function genStyles(){
	spacing = 1;
	widthz = 58;
	topRowWidthz = 22;
	topRowSpacing = widthz/2-3;
	bottomz = (190+30);
	for(a=0;a<keys.length;a++){
		if(keys[a] != ""){
			keyElement = document.getElementById("k"+keys[a]);
			if(a<=11){
				space = ((widthz+spacing)*a)+"px";
				widthzz = widthz+"px";
			}
			else{
				space = ((topRowWidthz+topRowSpacing)*(a-11))+(topRowWidthz/2)*(a-12)+"px";
				widthzz = topRowWidthz+"px";
			}
			
			keyElement.style.width = widthzz;
			keyElement.style.left = space;
	
			document.body.innerHTML += "<div class='letterHelp' id='l"+keys[a]+"'>"+keyElement.className+"</div>";
			letterElement = document.getElementById("l"+keys[a]);
			letterElement.style.width = widthzz;
			letterElement.style.left = space;
			if(a>11){
				letterElement.style.bottom = bottomz+"px";
			}
			
			document.body.innerHTML += "<div class='keyboardHelp' id='keyboard"+keys[a]+"'>"+String.fromCharCode(keys[a])+"</div>";
			letterElement2 = document.getElementById("keyboard"+keys[a]);
			if(a == 9){
				letterElement2.innerHTML = ";";
			}
			else if(a == 10){
				letterElement2.innerHTML = "'";
			}
			else if(a == 11){
				letterElement2.innerHTML = "Enter";
			}
			letterElement2.style.width = widthzz;
			//letterElement2.style.bottom = bottomz+"px";
			letterElement2.style.left = space;
		}
	}
}

function press(event){
	keyz=parseInt(event.keyCode);
	keyBoardDown(keyz);
}

function resetKey(event){
	keyz=parseInt(event.keyCode);
	keyBoardUp(keyz);
}
/*

function keyPress(event){
	for(a=0;a<keys.length;a++){
		if(event.keyCode == keys[a]){
			break;
		}
		key=parseInt(event.keyCode-32);
	}
	keyClass = document.getElementById("k"+key).className;
	
	document.getElementById("k"+key).innerHTML += "hi";
	return;
}
*/
function mouseDown(id){
	idz = id.split("k");
	keyz = idz[1];
	keyBoardDown(keyz);
}

function mouseUp(id){
	idz = id.split("k");
	keyz = idz[1];
	keyBoardUp(keyz);
}

function keyBoardUp(key){
	downKeys.push("");
	if(document.getElementById("k"+key)!=null){
		document.getElementById("k"+key).style.backgroundColor = "white";
		if(browserz!="Microsoft Internet Explorer"){
			document.getElementById("k"+key).style.opacity = "1";
		}
	}
}

function keyBoardDown(key){	
	if(!keyboardDisabled){
		if(document.getElementById("k"+key)!=null){
			keyClass = document.getElementById("k"+key).className;
			playSound(key,keyClass);
			document.getElementById("k"+key).style.backgroundColor = "gray";
			if(browserz!="Microsoft Internet Explorer"){
				document.getElementById("k"+key).style.opacity = "0.3";
			}
			else{
				
			}
		}
	}
}

var soundEmbed = null;
var soundType =".mp3";

function playSound(kID,note){

	embedz = document.getElementsByTagName("embed");
	for(i=0;i<embedz.length;i++){
		if(embedz[i].src == note+soundType){
			return;
			//document.body.removeChild(embedz[i]);	
		}
	}
//if (!soundEmbed){
	if(downKeys[downKeys.length-1] == note){
		return;
	}	
	downKeys.push(note);
	soundEmbed = document.createElement("embed");
	soundEmbed.setAttribute("src", note+soundType);
	soundEmbed.setAttribute("loop", false);
	soundEmbed.setAttribute("id","t"+new Date().getTime());
	soundEmbed.setAttribute("hidden", true);
	soundEmbed.setAttribute("autostart", true);
	//setTimeout("document.body.removeChild(soundEmbed)",500);
//}
    /*else{
        document.body.removeChild(soundEmbed);
        soundEmbed.removed = true;
        soundEmbed = null;
        soundEmbed = document.createElement("embed");
        soundEmbed.setAttribute("src", which+soundType);
		soundEmbed.setAttribute("loop", false);
        soundEmbed.setAttribute("hidden", true);
        soundEmbed.setAttribute("autostart", true);
    }*/
    soundEmbed.removed = false;
    document.body.appendChild(soundEmbed);
}

function setMusic(musicz){
	note=0;
	splitType=document.getElementById("splitType").value;
	song = new Array();
	disableKeyboard(false);
	music = musicz.split(splitType);
	for(a=0;a<music.length;a++){
		music[a] = music[a].toUpperCase();
		if(splitType==""&&(music[a]=="C"||music[a]=="D"||music[a]=="E"||music[a]=="F")&&a!=music.length){
			if(music[a+1]=="1"){	
				music[a]=music[a]+"1";
				for(b=8;b<notes.length;b++){
					if(notes[b]==music[a]){
						song.push(keys[b]);
						break;
					}
				}
				a++; //skip the 1
			}
			else{
			for(b=0;b<notes.length;b++){
					if(notes[b]==music[a]){
						song.push(keys[b]);
						break;
					}
				}
			}
		}
		else{
			for(b=0;b<notes.length;b++){
				if(notes[b]==music[a]){
					song.push(keys[b]);
					break;
				}
			}
		}
	}
	timer = setInterval(playMusic,noteTiming);
}

function playMusic(){
	if(note!=0){
		keyBoardUp(song[note-1]);
	}
	keyBoardDown(song[note]);
	if(note==song.length){
		keyBoardUp(song[note]);
		clearInterval(timer);
	}
	note++;
}

function disableKeyboard(disable){
	if(disable){
		keyboardDisabled = true;
	}
	else{
		keyboardDisabled = false;
	}
}

function cancelMusic(){
	song = [];
	clearInterval(timer);
	for(a=0;a<keys.length;a++){
		keyBoardUp(keys[a]);
	}
}

/*
//start cookie check
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
var username=getCookie("username");
if (username!=null && username!="")
  {
  alert("Welcome again " + username);
  }
else 
  {
  username=prompt("Please enter your name:","");
  if (username!=null && username!="")
    {
    setCookie("username",username,365);
    }
  }
}
*/