//options["hideOnLaunch"] = true; options["welcomeHide"] = true; options["tabbedMenu"] = false; saveOptions(); window.location.href = "../index.html"

/*---------DOCUMENT READY---------*/
// IE
addEvent(document, 'DOMContentLoaded', function() {
	pageInit();
    pageChange();
});

// Other
addEvent(document, 'onreadystatechange', function() {
    if (document.readyState == 'complete'){
		pageInit();
        pageChange();
	}
});

/*----------GLOBALS---------*/
var windowH,windowW;
//I-Focus Auto-scroll
var options = {
    "scrollAreaEnabled":true,
    "scrollAreaHidden":false,
    "eyeCursorEnabled":true,
    "hideOnLaunch":false,
    "welcomeHide":false,
    "menuHide":false,
    "tabbedMenu":false
}

window.onresize = function(){
	pageChange();
}

/*--------CURSOR-------*/
var cur; //Cursor
var clickable;
var mouseX,mouseY; //Mouse Co-ordinates

function activateCursor(){
    if(!options["eyeCursorEnabled"]) return;
    
    cur.hoverElement = this;
    var timing = this.getAttribute("data-cursor-timing");
    cur.activate(timing);
}

function activateInvertedCursor(){
    cur.invertColor();
    
    if(!options["eyeCursorEnabled"]) return;
    
    cur.hoverElement = this;
    var timing = this.getAttribute("data-cursor-timing");
    cur.activate(timing);
}

function deactivateCursor(){
    if(!options["eyeCursorEnabled"]) return;
    
    cur.deactivate();
    cur.init();
}

//Variables
var optionsOriWidth;
var navList;

function pageChange(){
	windowH = getBodyHeight();
	windowW = getBodyWidth();	
	
	circlesCalibration();
    
    var optionsCircle = document.getElementById("optionsCircle");
    
    if(optionsCircle.className.indexOf("hover")!=-1){
        optionsOriWidth = document.getElementById("optionsCircle").offsetHeight/(3/2);
    }
    else {
        optionsOriWidth = document.getElementById("optionsCircle").offsetHeight;
    }
    
	//other elements on page
	vMCWidth = windowW*(100-58)*0.01; //visible main circle width
	//document.getElementById("bs").style.width = vMCWidth+"px";
	MCCircle = document.getElementById("mainCircleHome");
	MCContent = document.getElementById("mainCircleContent");
	
    if(MCCircle != null){
        //positioning
        MCContent.style.left = parseInt(MCCircle.offsetWidth-vMCWidth+vMCWidth*0.05)+"px";
        //MCContent.style.top = parseInt(windowH*0.1+windowH*0.3)+"px";
        MCContent.style.bottom = parseInt(windowH*0.3+windowH*0.1)+"px"
        /*
        fnt = 0.055*Math.min(windowH,windowW);
        MCContent.style.fontSize = fnt+"px";
        //*/
        
        MCContent.style.width = parseInt(vMCWidth*0.80)+"px";
    }
    /*Alternate Menu*/
    
    
    //Concept Circles
    if(document.getElementById("conceptIntro")!=null){
        var conCirs = getElementsByClass("conceptCircle");
        var conCirWidth = conCirs[0].offsetWidth;
        var overallWidth = window.innerWidth;
        var pad = (overallWidth-conCirs.length*conCirWidth)/(conCirs.length+1);
        
        //trace(conCirWidth+" "+overallWidth+" "+pad);
        
        for(i=0;i<conCirs.length;i++){
            conCirs[i].style.left = parseInt(pad*parseInt(i+1)+conCirWidth*i)+"px";
        }
        
        document.getElementById("conceptIntro").style.height = parseInt(30+conCirs[0].offsetHeight+20)+"px";
        if(document.getElementById("conceptIntro").className.indexOf("aboutpg")!=-1){
               document.getElementById("conceptIntro").style.height = parseInt(50+conCirs[0].offsetHeight+60)+"px";
        }
    }
}

function pageInit(){
    if(window.mobilecheck()){
        document.body.className = "ismobile";
    }
    scrollAreas = getElementsByClass("scrollArea");

    loadOptions();
    
    //Keyboard Shortcuts
    window.addEventListener("keyup",keyboardShortcuts,false);
    
    /*-------I-FOCUS CURSOR-------*/
    //Array of all kinds of elements that are clickable.
    //Format CSS style: #id, .class, element
    clickable = new Array("a",".cursor-clickable",".link-btn",".options-btn",".alt-nav .navCircle:not(.alt-colour)",".navCircle.alt-colour","video","#back-btn",".aboutpg .conceptCircle:not(.active)");
    clickableInverted = new Array("#optionsCircle","#navList:not(.alt-nav) .navCircle:not(.alt-colour)","#optionsIcons span");
    clickableDelayed = {
        "#game-row1 a":4000,
        "a.game-row2":4000,
        "#game-row3 a":4000,
        "video":500
     }
    
    //Cursor Init
    cur = new Cursor();
    cur.init();
    
    //Attach mouseover events to clickable elements
    for(var a=0;a<clickableInverted.length;a++){
        var eles = clickableInverted[a].parseElement();
        for(var i=0;i<eles.length;i++){
            eles[i].addEventListener("mouseover", activateInvertedCursor, false);
            eles[i].addEventListener("click", deactivateCursor, false);
            eles[i].addEventListener("mouseout", deactivateCursor, false);      
        }
    }   
    
    for(var a=0;a<clickable.length;a++){
        var eles = clickable[a].parseElement();
        for(var i=0;i<eles.length;i++){
            eles[i].addEventListener("mouseover", activateCursor, false);
            eles[i].addEventListener("click", deactivateCursor, false);
            eles[i].addEventListener("mouseout", deactivateCursor, false);      
        }
    }

     for(var a in clickableDelayed){
        var eles = a.toString().parseElement();
        for(var i=0;i<eles.length;i++){
            eles[i].setAttribute("data-cursor-timing",clickableDelayed[a]);
        }
    }
    //Attach cursor to mouse
    window.addEventListener("mousemove",function(){
        e = window.event;
        mouseX = e.clientX;
        mouseY = e.clientY;
        cur.element.style.left = mouseX-25+"px";
        cur.element.style.top = mouseY-25+"px";
    });

    //Scroll Area Hide/Show
    if(options["scrollAreaHidden"] || !options["scrollAreaEnabled"]){
        for(i=0;i<scrollAreas.length;i++){
            scrollAreas[i].className += " hidden";
        }
    }    
    
    //Welcome Area Hide/Show
    if(document.getElementById("welcomeArea")!=null){
        if(!options["welcomeHide"]){
            document.getElementById("welcomeArea").className += " appear";
            document.getElementById("banner_optionsWelcomeHide").checked = false;
        }
        else{
            document.getElementById("welcomeArea").className += " disappear";
            document.getElementById("banner_optionsWelcomeHide").checked = true;
        }
    }
    
    //Options Box Hide
    if(options["hideOnLaunch"]){
        document.getElementById("optionsBox").className = "disappear "+document.getElementById("optionsBox").className;
    }
    else{
        document.getElementById("optionsBox").className = "appear "+document.getElementById("optionsBox").className;
    }
    
    //Add Event Listeners
    navList = document.getElementById("navList");
    if(navList!=null){
        if(options["menuHide"]){
            if(navList.className.indexOf("disappear")==-1){
                navList.className = navList.className.replaceAll("appear","disappear");   
            }
        }
        else{
            navList.className = navList.className.replaceAll("disappear","appear");
        }
        
        if(options["tabbedMenu"]){
            if(navList.className.indexOf("alt-nav")==-1){
                navList.className+=" alt-nav";
            }
        }
        else{
            navList.className = navList.className.replaceAll(" alt-nav","");
        }
        
        if(navList.className.indexOf("disappear")==-1){
            document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Toggle Menu";
        }
        else{
            document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Toggle<br>Menu";
        }
        
        //Create Mouseover & Mouseout events for Menu
        navCircles = getElementsByClass("navCircle");
        for(i=0;i<navCircles.length;i++){
            navCircles[i].addEventListener("mouseover", navCircleHover, false);
            navCircles[i].addEventListener("mouseout", navCircleUnhover, false);
        }
        
        document.getElementById("navCircle1").onclick = function(){
            toggleMenu();
        };
    }
    
    //Options Box Buttons
    if(document.getElementById("mainCircleHome")==null)
            getEle("#optionsIcons .icon-home")[0].addEventListener("click",function(){window.location.href = "../index.html"},false);
    
    getEle("#optionsIcons .icon-reset")[0].addEventListener("click",resetOptions,false);
    getEle("#optionsIcons .icon-keyboard")[0].addEventListener("click",function(){},false);
    
    var tagVal = new Array("Efficient","Effective","Intuitive");
    if(document.getElementById("liveDemoStart")!=null){
        for(i=0;i<tagVal.length;i++){
            //console.log(tagVal.length);
            var cls = tagVal[i].toLowerCase();
            var tags = getElementsByClass(cls);
            //console.log(tags);
            for(j=0;j<tags.length;j++){
                tags[j].innerHTML = tagVal[i];
            }
        }
    }
    
    //Videos
    var vids = document.getElementsByTagName("video");
    for(i=0;i<vids.length;i++){
        vids[i].addEventListener("click", toggleVideo, false);
        vids[i].addEventListener("mouseover", clearVideo, false);
        vids[i].addEventListener("mouseout", pauseVideo, false);
    }
    
    //Games
    var gameScreenshotDivs = getElementsByClass("game-screenshot");
    var gamesTitle = new Array("Focus Shield","ScrollType","Main Game","Target Swipe","HardCore","PokaDot");
    for(i=0;i<gameScreenshotDivs.length;i++){
        var gameDiv = gameScreenshotDivs[i];
        var out = "";
        var titleCmp = gamesTitle[i].replaceAll(" ","");
        //out+="<span>";
            out+="<img src ='../images/GameScreenshots/"+titleCmp+".png' />";
        //out+="</span>";
        out+="<div class='gameTitle'>"+gamesTitle[i]+"</div>";
        gameDiv.innerHTML = out;
        if(gamesTitle[i]=="ScrollType"){
            gameDiv.parentNode.href = "ScrollType/scrollType.html";
        }
        else{
            gameDiv.parentNode.href = "game.html?name="+titleCmp;
        }
    }
    
    //About
    var pplCircles = getEle("#conceptIntro.aboutpg .conceptCircle");
    for(i=0;i<pplCircles.length;i++){
        pplCircles[i].addEventListener("click",toggleReflections,false);
    }
}   

function circlesCalibration(){
    //align circles to respect width/height
	var circles = getElementsByClass("circle-height");
	for(i=0;i<circles.length;i++){
		h = circles[i].offsetHeight;
		circles[i].style.width = h+"px";
	}
	
	circles = getElementsByClass("circle-width");
	for(i=0;i<circles.length;i++){
		w = circles[i].offsetWidth;
		circles[i].style.height = w+"px";
	}   
}

var keyCodes = {
    "toggleMenu":77,
    "toggleOptions":79
}

function keyboardShortcuts(){
    var e = window.event;
    var code = e.keyCode || e.which;
    
    if(code == keyCodes["toggleMenu"]){
        toggleMenu();
    }
    else if(code == keyCodes["toggleOptions"]){
        optionsClick();
    }
}

/*-------NAVLIST------*/    
function navCircleHover(){
    //use "this" to access element being hovered over.
    //console.log(this.id);
}

function navCircleUnhover(){
    //use "this" to access element being hovered over.
    
}

function toggleMenu(){
    if(navList.className.indexOf("disappear")!=-1){
        navList.className = navList.className.replaceAll("disappear","appear");
        document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Toggle Menu";
    }
    else{
        navList.className = navList.className.replaceAll("appear","disappear");   
        document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Toggle<br>Menu";
    }    
}

/*------WELCOME------*/
function closeWelcome(){
    document.getElementById("welcomeArea").className = document.getElementById("welcomeArea").className.replaceAll("appear","disappear");
}

/*------OPTIONS------*/
function optionsHover(obj){
    h = optionsOriWidth*(3/2);
    obj.style.height = obj.style.width = h+"px";
    obj.className += " hover";
}

function optionsUnhover(obj){
    h = optionsOriWidth;
    obj.style.height = obj.style.width = h+"px";
    obj.className = obj.className.replaceAll(" hover","");
}

function optionsClick(obj){
	optionsBox = document.getElementById("optionsBox");
    if(optionsBox.className.indexOf("disappear")!=-1){
		openOptions();
	}
	else closeOptions();
}

function openOptions(){
	document.getElementById("optionsBox").className = document.getElementById("optionsBox").className.replaceAll("disappear ","appear ");	
}

function closeOptions(){
	document.getElementById("optionsBox").className = document.getElementById("optionsBox").className.replaceAll("appear ","disappear ");	
}

function resetOptions(){
//localStorage.removeItem("ifocus-options");
    
    //Remove after live demo
    //*
    options["hideOnLaunch"] = true; options["welcomeHide"] = true; options["tabbedMenu"] = false; options["menuHide"] = true;
    saveOptions();
    if(document.getElementById("navListHome")==null) window.location.href = "../index.html";
    //*/
}

function toggleOptions(opt){
	if(opt == 'scrollEnable'){
		options["scrollAreaEnabled"] = !options["scrollAreaEnabled"];
        document.getElementById("optionsHideScroll").disabled = !options["scrollAreaEnabled"];
        
        if(!options["scrollAreaEnabled"]){
            for(i=0;i<scrollAreas.length;i++){
                scrollAreas[i].className += " hidden";
            }
        }
        else if(!options["scrollAreaHidden"]){
            for(i=0;i<scrollAreas.length;i++){
				scrollAreas[i].className = scrollAreas[i].className.replaceAll(" hidden","");
			}
        }
	}
	else if(opt == 'scrollHidden' && !document.getElementById("optionsHideScroll").disabled){
		options["scrollAreaHidden"] = !options["scrollAreaHidden"];
		if(options["scrollAreaHidden"]){
			for(i=0;i<scrollAreas.length;i++){
				scrollAreas[i].className += " hidden";
			}
		}
		else{
			for(i=0;i<scrollAreas.length;i++){
				scrollAreas[i].className = scrollAreas[i].className.replaceAll(" hidden","");
			}
		}
	}
	else if(opt == 'cursorEnable'){
	   	options["eyeCursorEnabled"] = !options["eyeCursorEnabled"];
        if(options["eyeCursorEnabled"]) cur.show();
        else cur.hide();
	}
    else if(opt == 'boxHide'){
        options["hideOnLaunch"] = !options["hideOnLaunch"];   
    }
    else if(opt == 'welcomeHide'){
        options["welcomeHide"] = !options["welcomeHide"];
    }
    else if(opt == 'menuHide'){
        options["menuHide"] = !options["menuHide"];
    }
    else if(opt == 'menuTypeToggle'){
        options["tabbedMenu"] = !options["tabbedMenu"];
        if(navList!=null){    
            if(options["tabbedMenu"]){
                if(navList.className.indexOf("alt-nav")==-1){
                    navList.className+=" alt-nav";
                }
            }
            else{
                navList.className = navList.className.replaceAll(" alt-nav","");
            }
            
            var tt = setTimeout(function(){ pageChange(); clearTimeout(tt);},250);
        }
    }
    
    checkOptions();
    saveOptions();
}

function loadOptions(){
    if(window.localStorage){
        if(localStorage["ifocus-options"]){
            options = JSON.parse(localStorage["ifocus-options"]);
        }
        else{
            trace("Cannot find previously saved options.");
        }
    }
    else trace("Local Storage not available! Unable to load options!");
    
    checkOptions();
}

function saveOptions(){
    if(window.localStorage){
        localStorage["ifocus-options"] = JSON.stringify(options);
    }
    else trace("Local Storage not available! Unable to save options");
}

function checkOptions(){
    document.getElementById("optionsScrollEnable").checked = options["scrollAreaEnabled"];
    document.getElementById("optionsHideScroll").disabled = !options["scrollAreaEnabled"];
    document.getElementById("optionsHideScroll").checked = !options["scrollAreaHidden"];
    document.getElementById("optionsCursorEnable").checked = options["eyeCursorEnabled"];
    document.getElementById("optionsBoxHide").checked = options["hideOnLaunch"];
    document.getElementById("optionsWelcomeHide").checked = options["welcomeHide"];
    document.getElementById("optionsMenuHide").checked = !options["menuHide"];
    document.getElementById("optionsMenuType").checked = options["tabbedMenu"];
    
    if(document.getElementById("banner_optionsWelcomeHide")!=null)
        document.getElementById("banner_optionsWelcomeHide").checked = options["welcomeHide"];
        
    var optionsBtns = getElementsByClass("options-btn");
    for(var i=0;i<optionsBtns.length;i++){
        var ele = optionsBtns[i];
        if(ele.id == "closeOptionsBtn") continue;
        
        //trace(ele.id+" "+ele.checked);
        if(ele.checked) btnCheck(ele.id);
        else btnUncheck(ele.id);
        
        if(ele.id=="optionsHideScroll"){
            if(ele.disabled){
                if(ele.className.indexOf("disabled")==-1){
                    ele.className+=" disabled";
                }
            }
            else ele.className = ele.className.replaceAll(" disabled","");
        }
    }
    //trace("");
}

function btnUncheck(id){    
    var ele = document.getElementById(id);
    ele.checked = false;
    if(ele.className.indexOf("unchecked")==-1){
        ele.className = ele.className.replaceAll("checked","unchecked");
    }
}

function btnCheck(id){
    var ele = document.getElementById(id);
    ele.checked = true;
    ele.className = ele.className.replaceAll("unchecked","checked");
}

/*------VIDEOS-------*/
var vidPauseInterval = 1000;
var vidTimer;

function playVid(obj){
    obj.play();
}

function pauseVid(obj){
    obj.pause();
    clearInterval(vidTimer);
}

function playVideo(){
    playVid(this);
}

function pauseVideo(){
    var vid = this;
    if(!this.paused){
    	cur.activate(vidPauseInterval);
        cur.hoverElement = null;
        vidTimer = setTimeout(function(){pauseVid(vid);},vidPauseInterval);
    }
}

function clearVideo(){
    clearInterval(vidTimer);   
}

function toggleVideo(){
    if(options["eyeCursorEnabled"]){
        playVid(this);
        return;
    }
        
    if(this.paused) playVid(this);
    else pauseVid(this);
}

var originalText = "";
var originalStyles = {
    "left":0,
    "width":0
}
function toggleReflections(){
    trace(this);
    var contentDiv = getElementsByClass("content",this)[0];
    var title = this.id+".txt";
    if(this.className.indexOf("active")==-1){
        this.className+=" active";
        originalStyles["left"] = this.style.left;
        originalStyles["width"] = this.style.width;
        
        originalText = contentDiv.innerHTML;
        this.removeAttribute("style");
        
        var reflectionsTxt = "";
        contentDiv.innerHTML = "Loading Reflections...";
        //get reflections via ajax
        try{
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', title, false);
            xmlhttp.send();
            
            var respTxt = xmlhttp.responseText.split('\n');
            
            for(var i=0;i<respTxt.length;i++){
                reflectionsTxt+= "<p>"+respTxt[i]+"</p>";
            }
            
            contentDiv.innerHTML = reflectionsTxt;
        }
        catch(e){
            contentDiv.innerHTML = "Reflections could not be loaded...";
        }
    }
    else{
        this.className = this.className.replaceAll(" active","");    
        contentDiv.innerHTML = originalText;
        this.style.left = originalStyles["left"];
        this.style.width = originalStyles["width"];
        
    }
}

/*-----SCROLLING------*/    
var tick;
var scrollTime = 100; //milliseconds
var scrollDist = 6; //pixels
var smoothScrollSpd = 10;//milliseconds
var scrollDir;

function scrollAreaFire(id){
    if(!options["scrollAreaEnabled"]) return;
    
	scrollDir = id.split("scroll")[1].toLowerCase();
    tick = setInterval(beginScrolling,scrollTime);
}
    
function beginScrolling(){
	switch(scrollDir){
		case "up":
			scrollUp(scrollDist,smoothScrollSpd);
			break;
		case "down":
			scrollDown(scrollDist,smoothScrollSpd);
			break;
		case "left":
			scrollLeft(scrollDist,smoothScrollSpd);
			break;
		case "right":
			scrollRight(scrollDist,smoothScrollSpd);
			break;
	}
}
    
function stopScrolling(){
    clearInterval(tick);
}

