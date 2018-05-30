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

//Games Index
var gameLib = {
    "flash": [
        {
            "name":"Focus Fire - Original",
            "filename":"FocusFireGame",
            "description":"Multitasking game where you (a tank) attack and defend against oncoming enemy tanks. Original game used for eye-tracking research.",
            "tags":["Shooting","Defence","Multi-tasking"],
            "project":"ifocus1"
        },
        {
            "name":"Space Junk",
            "filename":"SpaceJunk",
            "description":"Game where you find 'Space Junk' amidst a confusing array of 'Satellites'. Original game used for eye-tracking research.",
            "tags":["Arcade"],
            "project":"ifocus2"
        },
        {
            "name":"Caged Bird",
            "filename":"CagedBird",
            "description":"Flappy Bird on steriods! Bounce back and forth the walls while avoiding the random falling spikes. Check out the (better) HTML version below!",
            "tags":["Arcade","Single Button","Endless"]
        },
        {
            "name":"Focus Fire - Enhanced",
            "filename":"FocusFireHarder",
            "description":"Multitasking game where you (a tank) attack and defend against oncoming enemy tanks. Game used for eye-tracking research, but with increased difficulty.",
            "tags":["Shooting","Defence","Multi-tasking"],
            "project":"ifocus1"
        },
        {
            "name":"Nostalgia",
            "filename":"Nostalgia",
            "description":"Work together to collect the memories in this two-player platformer. Commendation Award at SGCC 2013 on the topic of 'Multi-generational bonding'.",
            "tags":["Platform","Two-player","Competition"]
        },
        {
            "name":"Hard Core",
            "filename":"HardCore",
            "description":"Protect your core from incoming enemies, even as your shield decays with time! Game created for Ludum Dare competition, themed 'Only one'.",
            "tags":["Arcade","Defence","Competition"]
        },
        {
            "name":"Drugged Dreams",
            "filename":"DruggedDreams",
            "description":"Fighting game where you control a ninja warrior, Senshi, to fend off enemies. 4th place (team effort) at Singapore Games Creation Competition 2014 (SGCC) on the topic of 'Fighting Drugs'.",
            "tags":["Action","Fighting","Competition"],
            featured: true
        }, //in the case where it's 1 row with three games, this game gets featured
        {
            "name":"Network Infector",
            "filename":"NetworkInfector",
            "description":"",
            "tags":["Action","Defence","Competition"]
        }/*,
        {
            "name":"Let It Snow!",
            "filename":"LetItSnow",
            "description":"Defeat the elves by freezing them with falling snow. Christmas-inspired game originally meant as some Christmas present for my parents.",
            "tags":["Arcade","Shooting","Defence"]
        }*/
    ],
    "html":[
        {
            "name":"Soaring Sheep",
            "filename":"SoaringSheep",
            "url":"https://samleo8.github.io/SoaringSheep/",
            "description":"Flappy Bird on steroids: Jump to avoid those nasty spikes. Bounce off the walls to score points.",
            "tags":["Arcade","Endless","Sheep","Mobile Ready","Single Button"],
            featured: true
        },
        {
            "name":"Sisyphus Sheep",
            "filename":"SisyphusSheep",
            "url":"https://samleo8.github.io/SisyphusSheep/",
            "description":"Run for your life as you avoid the spikes on an endless treadmill!",
            "tags":["Arcade","Endless","Sheep","Mobile Ready"],
            featured: true
        },
        {
            "name":"PixArt",
            "filename":"PixArt",
            "url":"https://samleo8.github.io/PixArt/",
            "description":"Colourful recreation of Japanese Nonogram puzzle.",
            "tags":["Puzzle","Mobile Ready"],
            featured: true
        },
        {
            "name":"Slitherie",
            "filename":"Slitherie",
            "url":"https://samleo8.github.io/Slitherie/",
            "description":"Recreation of classic 'Snake' game with different foods and crazy levels.",
            "tags":["Arcade"],
            featured: true
        },
    ]
}

var galleryLib = {
    "isef": [
        {
            "filename":"0.0.0.jpg",
            "description":"The ISEF 2016 Team!"
        },
        {
            "filename":"0.0.1.jpg",
            "description":"The ISEF 2016 Team!"
        },
        {
            "filename":"0.0.2.jpg",
            "description":"Finding our names on the board"
        },
        {
            "filename":"0.0.jpg",
            "description":"About to draw the Singapore poster..."
        },
        {
            "filename":"0.1.jpg",
            "description":"Actually drawing the Singapore poster"
        },
        {
            "filename":"0.2.jpg",
            "description":"Casual photo"
        },
        {
            "filename":"0.3.jpg",
            "description":"Standing proud with our final product"
        },
        {
            "filename":"0.4.jpg",
            "description":"Standing proud with our final product"
        },
        {
            "filename":"0.5.jpg",
            "description":"Showing the Singapore poster at the opening ceremony"
        },
        {
            "filename":"0.6.jpg",
            "description":"Close up of our beautiful poster!"
        },
        {
            "filename":"0.7.jpg",
            "description":"Leaving the venue after judging.."
        },
        {
            "filename":"0.jpg",
            "description":"The registration counter of the ISEF Exhibition Hall"
        },
        {
            "filename":"0.15.jpg",
            "description":"Inside the hall"
        },
        {
            "filename":"0.10.jpg",
            "description":"ISEF Public day!"
        },
        {
            "filename":"0.11.jpg",
            "description":"At my booth"
        },
        {
            "filename":"0.12.jpg",
            "description":"Presenting to interested members of public"
        },
        {
            "filename":"0.13.jpg",
            "description":"Presenting to fellow ISEF Finalists from Luxembourg"
        },
        {
            "filename":"0.14.jpg",
            "description":"Presenting to fellow ISEF Finalists from Luxembourg"
        },
        {
            "filename":"0.8.jpg",
            "description":"Pins, stickers and paraphernalia from companies who were interested in my project :)"
        },
        {
            "filename":"0.9.jpg",
            "description":"Close up of the IEEE and CERN pin"
        },
        {
            "filename":"1.jpg",
            "description":"Origami from the origami museum at Narita airport"
        },
        {
            "filename":"2.jpg",
            "description":"Origami from the origami museum at Narita airport"
        },
        {
            "filename":"3.jpg",
            "description":"Beautiful skyline from the plane"
        },
        {
            "filename":"4.jpg",
            "description":"Roads in Arizona"
        },
        {
            "filename":"5.jpg",
            "description":"\" ART IS A GUARANTY OF SANITY \""
        },
        {
            "filename":"6.jpg",
            "description":"Food glorious food!"
        },
        {
            "filename":"7.jpg",
            "description":"Trip to Arizona Hills - Lego Octopus"
        },
        {
            "filename":"8.jpg",
            "description":"Trip to Arizona Hills - Cute porcelain turtle"
        },
        {
            "filename":"9.jpg",
            "description":"Trip to Arizona Hills - Art from the Arizonian copper mines"
        },
        {
            "filename":"10.jpg",
            "description":"Trip to Arizona Hills - 100% Pure Arizona silver"
        },
    ],
    "ifocus": [
        {
            "filename":"0.jpg",
            "description":"Setting up our presentation at the Research@YDSP event"
        },
        {
            "filename":"1.jpg",
            "description":"The Team"
        },
        {
            "filename":"2.jpg",
            "description":"Presenting to an interested member of public"
        },
        {
            "filename":"3.jpg",
            "description":"Presenting to the Guest of Honour, Mr Maliki Osman!"
        },
        {
            "filename":"4.jpg",
            "description":"Guest of Honour trying out our game"
        }
    ],
    "art": [
        {
            "filename":"merry_christmas.jpg",
            "description":""
        },
        {
            "filename":"bearing_fruit.png",
            "description":""
        },
        {
            "filename":"sheep.jpg",
            "description":""
        },
        {
            "filename":"panda.png",
            "description":""
        },
        {
            "filename":"koala.jpg",
            "description":""
        },
        {
            "filename":"plant.jpg",
            "description":""
        },
    ]
}

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
        var switchVar = MCCircle.getAttribute("switch-var");

        if(switchVar!=null && switchVar.split("-")[0] == "width" && window.windowW<=parseInt(switchVar.split("-")[1])){
            MCContent.style = '';
        }
        else if(switchVar!=null && switchVar.split("-")[0] == "height" && window.windowH<=parseInt(switchVar.split("-"))){
            MCContent.style = '';
        }
        else{
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
    if(MobileCheck()){
        document.body.className = "ismobile";
    }
    else if(MobileAndTabletCheck()){
        document.body.className = "istablet";
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

        document.getElementById("navCircle1").addEventListener("click",toggleMenu,false);
    }

    //Options Box Buttons
    if(document.getElementById("mainCircleHome")==null)
        getEle(".optionsIcons .icon-home")[0].addEventListener("click",function(){
            window.location.href = "../index.html"
        },false);

    getEle(".optionsIcons .icon-reset")[0].addEventListener("click",resetOptions,false);

    //Navigation Circles Ordering
    var urlArr = window.location.href.toString().split("/");
    var pageName = urlArr[urlArr.length-2];
    var currPage = "../"+pageName+"/index.html";

    var navCirclesEle = document.getElementsByClassName("navCircle");

    var i,j;

    for(i=0;i<navCirclesOrder.length;i++){
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

    //Table of Contents setup
    var tableOfContents = [];
    var contentTitles = document.querySelectorAll(".content-section h1");
    for(i=0;i<contentTitles.length;i++){
        tableOfContents[i] =  JSON.parse(JSON.stringify(contentTitles[i].innerText.split("\n")[0]));
    };

    var TCEle = document.getElementsByClassName("table-of-contents")[0];
    if(TCEle!=null && TCEle!=undefined){
        out='';
        for(i=0;i<tableOfContents.length;i++){
            var idName = tableOfContents[i].toLowerCase().removeAll(",").removeAll(".").replaceAll(" ","-");
            contentTitles[i].parentNode.id = idName;

            out+='<a href="#'+idName+'" class="gen-btn table-of-contents-btn">';
            out+=tableOfContents[i];
            out+="</a>";
        }
        TCEle.innerHTML = out;
    }

    var subContents = document.getElementsByClassName("sub-table-of-contents");
    for(var j=0;j<subContents.length;j++){
        var subTableOfContents = [];
        var subContentTitles = subContents[j].parentNode.getElementsByTagName("h2");

        for(i=0;i<subContentTitles.length;i++){
            subTableOfContents[i] =  JSON.parse(JSON.stringify(subContentTitles[i].innerText.split("\n")[0]));
        };

        var TCEle = subContents[j];
        if(TCEle!=null && TCEle!=undefined){
            out='';

            for(i=0;i<subTableOfContents.length;i++){
                var idName = j.toString()+'-'+subTableOfContents[i].toLowerCase().removeAll(",").removeAll(".").replaceAll(" ","-"); //requires such unique id because the sub-content-titles tend to overlap
                subContentTitles[i].id = idName;

                out+='<a href="#'+idName+'" class="gen-btn table-of-contents-btn">';
                out+=subTableOfContents[i];
                out+="</a>";
            }
            TCEle.innerHTML = out;
        }
    }

    //Game screenshots setup
    var gameScreenshotHolder = document.getElementsByClassName("gameScreenshotHolder");
    var outEle = {};

    if(gameScreenshotHolder!=null && gameScreenshotHolder!=undefined && gameScreenshotHolder.length>0){
        if(gameScreenshotHolder[0].className.indexOf("games-main")!=-1){ //for main game page
            out="";
            //Starting with Flash first
            for(i=0;i<gameLib["flash"].length;i++){
                var gameInfo = gameLib["flash"][i];

                out+="<a href='playFlash.html?name="+gameInfo["filename"]+"' class='gameHolder"+((gameInfo["featured"] == true)?" featured":"")+"'>";
                    out+="<img src='../Images/GameScreenshots/"+gameInfo["filename"]+".png' alt='"+gameInfo["name"]+"'>";
                    out+="<div class='gameTitle'>"+gameInfo["name"]+"</div>";
                    out+="<div class='gameDesc'>"+gameInfo["description"]+"</div>";
                    out+="<div class='gameTagHolder'>";
                        out+="<div class='tag flash'>Flash</div>";
                    for(j=0;j<gameInfo["tags"].length;j++){
                        var clsNm = gameInfo["tags"][j].toLowerCase().split(" ").join("-");

                        out+="<div class='tag "+clsNm+"'>"+gameInfo["tags"][j]+"</div>";
                    }
                    out+="</div>";
                out+="</a>";
            }

            gameScreenshotHolder[0].innerHTML = out;

            out = "";
            //Then HTML
            for(i=0;i<gameLib["html"].length;i++){
                var gameInfo = gameLib["html"][i];

                out+="<a href='"+gameInfo["url"]+"' target='_blank' class='gameHolder"+((gameInfo["featured"] == true)?" featured":"")+"'>";
                    out+="<img src='../Images/GameScreenshots/"+gameInfo["filename"]+".png' alt='"+gameInfo["name"]+"'>";
                    out+="<div class='gameTitle'>"+gameInfo["name"]+"</div>";
                    out+="<div class='gameDesc'>"+gameInfo["description"]+"</div>";
                    out+="<div class='gameTagHolder'>";
                        out+="<div class='tag html'>HTML5</div>";
                    for(j=0;j<gameInfo["tags"].length;j++){
                        var clsNm = gameInfo["tags"][j].toLowerCase().split(" ").join("-");

                        out+="<div class='tag "+clsNm+"'>"+gameInfo["tags"][j]+"</div>";
                    }
                    out+="</div>";
                out+="</a>";
            }

            gameScreenshotHolder[1].innerHTML = out;
        }
        else{ //for research/other page which include these games

            //Look for the project game in both HTML and Flash games
            //Starting with Flash first
            for(i=0;i<gameLib["flash"].length;i++){
                var gameInfo = gameLib["flash"][i];

                if(gameInfo["project"]!=null && gameInfo["project"]!=undefined && gameInfo["project"]!=false && gameInfo["project"]!="false" && gameInfo["project"]!="none"){
                    out = "";

                    out+="<a href='../games/playFlash.html?name="+gameInfo["filename"]+"' class='gameHolder"+((gameInfo["featured"] == true)?" featured":"")+"'>";
                        out+="<img src='../Images/GameScreenshots/"+gameInfo["filename"]+".png' alt='"+gameInfo["name"]+"'>";
                        out+="<div class='gameTitle'>"+gameInfo["name"]+"</div>";
                        out+="<div class='gameDesc'>"+gameInfo["description"]+"</div>";
                        out+="</div>";
                    out+="</a>";

                    if(outEle[gameInfo["project"].toString()] != null &&
                    outEle[gameInfo["project"].toString()] != undefined) {
                        outEle[gameInfo["project"].toString()] += out;
                    }
                    else{
                        outEle[gameInfo["project"].toString()] = out;
                    }
                }
            }

            //Then HTML
            for(i=0;i<gameLib["html"].length;i++){
                var gameInfo = gameLib["html"][i];

                if(gameInfo["project"]!=null && gameInfo["project"]!=undefined && gameInfo["project"]!=false && gameInfo["project"]!="false" && gameInfo["project"]!="none"){
                    out = "";
                    out+="<a href='"+gameInfo["url"]+"' target='_blank' class='gameHolder"+((gameInfo["featured"] == true)?" featured":"")+"'>";
                        out+="<img src='../Images/GameScreenshots/"+gameInfo["filename"]+".png' alt='"+gameInfo["name"]+"'>";
                        out+="<div class='gameTitle'>"+gameInfo["name"]+"</div>";
                        out+="<div class='gameDesc'>"+gameInfo["description"]+"</div>";
                        out+="<div class='gameTagHolder'>";
                            out+="<div class='tag html'>HTML5</div>";
                        for(j=0;j<gameInfo["tags"].length;j++){
                            var clsNm = gameInfo["tags"][j].toLowerCase().split(" ").join("-");

                            out+="<div class='tag "+clsNm+"'>"+gameInfo["tags"][j]+"</div>";
                        }
                        out+="</div>";
                    out+="</a>";

                    if(outEle[gameInfo["project"].toString()] != null &&
                    outEle[gameInfo["project"].toString()] != undefined) {
                        outEle[gameInfo["project"].toString()] += out;
                    }
                    else{
                        outEle[gameInfo["project"].toString()] = out;
                    }
                }
            }

            for(var i in outEle){
                if(!outEle.hasOwnProperty(i)) continue;

                var e = document.getElementsByClassName("games-"+i.toString());
                for(var j=0;j<e.length;j++){
                    e[j].innerHTML = outEle[i];
                }
            }
        }
    }

    var outEle = {};
    //Photo Gallery setup
    for(var j in galleryLib){
        if(!galleryLib.hasOwnProperty(j)) continue;

        var galleryInfo = galleryLib[j.toString()];
        outEle[j.toString()] = "";

        for(var i=0;i<galleryInfo.length;i++){
            var photoInfo = galleryInfo[i];

            out = "";

            out+="<div class='photoHolder"+((photoInfo["featured"] == true)?" featured":"")+"'>";
                out+="<img src='../Images/gallery/"+j.toString()+"/"+photoInfo["filename"]+"' alt='"+photoInfo["description"]+"'>";
                out+="<div class='photoDesc'>"+photoInfo["description"]+"</div>";
                out+="</div>";
            out+="</a>";

            outEle[j.toString()] += out;
        }
    }

    for(var i in outEle){
        if(!outEle.hasOwnProperty(i)) continue;

        var e = document.getElementsByClassName("gallery-"+i.toString());
        for(var j=0;j<e.length;j++){
            e[j].innerHTML = outEle[i];
        }
    }

    //Add Event Listener for full-view photo
    var e = document.getElementsByClassName("photoHolder");
    for(var j=0;j<e.length;j++){
        e[j].addEventListener("mouseup", function(ev){ photoToggleView(this) });
    }

    //Accordion Setup
    var accEle = document.getElementsByClassName("accordion");

    for(var k=0;k<accEle.length;k++){
        var accItemEle = accEle[k].getElementsByClassName("accordion-item");

        for(var i=0;i<accItemEle.length;i++){
            //Set all to closed first
            accItemEle[i].className = accItemEle[i].className.replaceAll(" closed","");
            accItemEle[i].className = accItemEle[i].className.replaceAll(" open","");
            accItemEle[i].className += " closed";

            //Add event listener to title for opening and closing
            accTitle = accItemEle[i].getElementsByClassName("accordion-title")[0];
            accTitle.addEventListener("click",function(){
                var par = this.parentNode;

                if(par.className.indexOf(" open")!=-1){ //item is open, hence close it
                    par.className = par.className.replaceAll(" open"," closed");
                }
                else{
                    //item is closed
                    //  1. open this item
                    //  2. close all other items
                    var accItemEleTemp = par.parentNode.getElementsByClassName("accordion-item");
                    for(var j=0;j<accItemEleTemp.length;j++){
                        if(par!=accItemEleTemp[j])
                            accItemEleTemp[j].className = accItemEleTemp[j].className.replaceAll(" open"," closed");
                    }

                    par.className = par.className.replaceAll(" closed"," open");
                }
            });
        }
    }
}

function photoToggleView(ele){
    console.log(ele);

    //Need to change the width and height of the image...
    var img = ele.getElementsByTagName("img")[0];
    var r = img.width/img.height;

    if(ele.className.indexOf(" fullView")!=-1){
        ele.className = ele.className.replaceAll(" fullView","");

    }
    else{
        ele.className += " fullView";

        /*
        img.style.height = window.windowH;
        img.style.width = img.height*r;
        */
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

    circles = getElementsByClass("circle-height-width");
    for(i=0;i<circles.length;i++){
		var switchVar = circles[i].getAttribute("switch-var");
        circles[i].style = '';

        if(switchVar.split("-")[0] == "width" && window.windowW<=parseInt(switchVar.split("-")[1])){
            w = circles[i].offsetWidth;
            circles[i].style.height = w+"px";
        }
        else if(switchVar.split("-")[0] == "height" && window.windowH<=parseInt(switchVar.split("-")[1])){
            w = circles[i].offsetWidth;
            circles[i].style.height = w+"px";
        }
        else{
            h = circles[i].offsetHeight;
            circles[i].style.width = h+"px";
        }
    }

    circles = getElementsByClass("circle-width-height");
    for(i=0;i<circles.length;i++){
		var switchVar = circles[i].getAttribute("switch-var");
        circles[i].style = '';

        if(switchVar.split("-")[0] == "width" && window.windowW<=switchVar.split("-")[1]){
            h = circles[i].offsetHeight;
            circles[i].style.width = h+"px";
        }
        else if(switchVar.split("-")[0] == "height" && window.windowH<=switchVar.split("-")[1]){
            h = circles[i].offsetHeight;
            circles[i].style.width = h+"px";
        }
        else{
            w = circles[i].offsetWidth;
            circles[i].style.height = w+"px";
        }
    }

    circles = getElementsByClass("circle-height-none");
    for(i=0;i<circles.length;i++){
		var switchVar = circles[i].getAttribute("switch-var");
        circles[i].style = '';

        if(switchVar.split("-")[0] == "width" && window.windowW<=parseInt(switchVar.split("-")[1])){
            circles[i].style = '';
        }
        else if(switchVar.split("-")[0] == "height" && window.windowH<=parseInt(switchVar.split("-")[1])){
            circles[i].style = '';
        }
        else{
            h = circles[i].offsetHeight;
            circles[i].style.width = h+"px";
        }
    }

    circles = getElementsByClass("circle-width-none");
    for(i=0;i<circles.length;i++){
		var switchVar = circles[i].getAttribute("switch-var");
        circles[i].style = '';

        if(switchVar.split("-")[0] == "width" && window.windowW<=switchVar.split("-")[1]){
            circles[i].style = '';
        }
        else if(switchVar.split("-")[0] == "height" && window.windowH<=switchVar.split("-")[1]){
            circles[i].style = '';
        }
        else{
            w = circles[i].offsetWidth;
            circles[i].style.height = w+"px";
        }
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
