//options["hideOnLaunch"] = true; options["welcomeHide"] = true; options["tabbedMenu"] = false; saveOptions(); window.location.href = "../index.html"

/*---------DOCUMENT READY---------*/
var domReady = function (callback) {
    // Mozilla, Opera and WebKit
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback, false);
        // If Internet Explorer, the event model is used
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === "complete" ) {
                callback();
            }
        });
        // A fallback to window.onload, that will always work
    } else {
        var oldOnload = window.onload;
        window.onload = function () {
            oldOnload && oldOnload();
            callback();
        }
    }
};

domReady( function(){
    pageInit();
    pageChange();
});


/*----------GLOBALS---------*/
var windowH,windowW;

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

//Variables
var optionsOriWidth;
var navList;
var navCirclesOrder = [
    {
        "name": "About Me",
        "href": "../about/index.html",
        "icon": "icon-about",
    },
    {
        "name": "Games",
        "href": "../games/index.html",
        "icon": "icon-games"
    },
    {
        "name": "Research",
        "href": "../research/index.html",
        "icon": "icon-research"
    },
    {
        "name": "Web",
        "href": "../web/index.html",
        "icon": "icon-web"
    },
    {
        "name": "Misc",
        "href": "../misc/index.html",
        "icon": "icon-misc"
    }
];

//Page resize
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

    loadOptions();
    
    //Options Box Hide
    if(options["hideOnLaunch"]){
        document.getElementById("optionsBox").className += " disappear";
    }
    else{
        document.getElementById("optionsBox").className = " appear";
    }
    
    //Add Event Listeners
    navList = document.getElementById("navList");
    if(navList!=null){
        if(options["menuHide"] || !options["hideOnLaunch"]){
            if(navList.className.indexOf("disappear")==-1){
                navList.className = navList.className.replaceAll("appear center","disappear");   
            }
        }
        else{
            navList.className = navList.className.replaceAll("disappear","appear center");
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
            document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Navigation Menu";
        }
        else{
            document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Navigation<br>Menu";
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
        getEle(".optionsIcons .icon-home")[0].addEventListener("click",function(){
            window.location.href = "../index.html"
        },false);

    getEle(".optionsIcons .icon-reset")[0].addEventListener("click",resetOptions,false);    
    
    //Navigation Circles Ordering
    var urlArr = window.location.href.toString().split("/");
    var currPage = "../"+urlArr[urlArr.length-2]+"/index.html";
        
    var navCirclesEle = document.getElementsByClassName("navCircle");
    
    var i;
    
    for(i=0;i<navCirclesOrder;i++){
        //Get rid of entry for current page
        if(navCirclesOrder[i]["href"] == currPage){
            navCirclesOrder.splice(i,1);
            break;
        }
    }
    
    for(i=1;i<navCirclesEle.length;i++){ //skip first navCircle (#navCircle1)
        navCirclesEle[i].parentElement.href = navCirclesOrder[i-1]["href"];
        navCirclesEle[i].getElementsByClassName("menu-icon")[0].className += " "+navCirclesOrder[i-1]["icon"];
        navCirclesEle[i].getElementsByClassName("center")[0].innerHTML = navCirclesOrder[i-1]["name"];
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
    closeOptions();
            
    if(navList.className.indexOf("disappear")!=-1){
        navList.className = navList.className.replaceAll("disappear","appear center");
        document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Navigation Menu";
    }
    else{
        navList.className = navList.className.replaceAll("appear center","disappear");   
        document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Navigation<br>Menu";
    }    
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
    navList.className = navList.className.replaceAll("appear center","disappear");   
    document.getElementById("navCircle1").getElementsByTagName("span")[0].innerHTML = "Navigation<br>Menu";
    
	optionsBox = document.getElementById("optionsBox");
    if(optionsBox.className.indexOf(" disappear")!=-1){
		openOptions();
	}
	else closeOptions();
}

function openOptions(){
	document.getElementById("optionsBox").className = document.getElementById("optionsBox").className.replaceAll(" disappear"," appear");	
}

function closeOptions(){
	document.getElementById("optionsBox").className = document.getElementById("optionsBox").className.replaceAll(" appear"," disappear");	
}

function resetOptions(){
    if(!confirm("Are you sure you want to reset options?")) return;
    
    //Remove after live demo
    options["hideOnLaunch"] = true; options["welcomeHide"] = true; options["tabbedMenu"] = false; options["menuHide"] = true;
    saveOptions();
    //if(document.getElementById("navListHome")==null) window.location.href = "../index.html";
}

function toggleOptions(opt,ele){
    if(ele!=null)
        if(ele.className.indexOf("disabled")!=-1) return;
    
	if(opt == 'boxHide'){
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
            
            var tt = setTimeout(function(){ pageChange(); clearTimeout(tt);},500);
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
    document.getElementById("optionsBoxHide").checked = options["hideOnLaunch"];
    document.getElementById("optionsMenuHide").checked = !options["menuHide"];
    document.getElementById("optionsMenuType").checked = options["tabbedMenu"];
    
    var optionsBtns = getElementsByClass("options-btn");
    for(var i=0;i<optionsBtns.length;i++){
        var ele = optionsBtns[i];
        if(ele.id == "closeOptionsBtn") continue;
        
        if(ele.checked) btnCheck(ele.id);
        else btnUncheck(ele.id);
    }
    //trace("");
}

function btnUncheck(id){    
    var ele = document.getElementById(id);
    ele.checked = false;
    if(ele.className.indexOf("unchecked")==-1){
        ele.className = ele.className.replaceAll("checked","unchecked");
    }

    //For ensuring that menu doesn't get shown if optionsBox is also shown
    if(ele.id == "optionsBoxHide") btnDisable("optionsMenuHide");
}

function btnCheck(id){
    var ele = document.getElementById(id);
    ele.checked = true;
    ele.className = ele.className.replaceAll("unchecked","checked");
    
    if(ele.id == "optionsBoxHide") btnEnable("optionsMenuHide");
}

function btnDisable(id){
    var ele = document.getElementById(id);
    ele.className = ele.className.replaceAll(" disabled","")+" disabled";
}

function btnEnable(id){
    var ele = document.getElementById(id);
    ele.className = ele.className.replaceAll(" disabled","");
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