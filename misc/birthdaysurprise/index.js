// Probably wanna dynamically load everything?
var slideIndex = 0;
var slidesBaseClasses = "slide-container fade ";

var poem = [
    "Here's the sonnet I've always owed you!\nClick the left and right buttons to continue!",
    "A lonely boi at CMU",
    "Until the day I found out you:",
    "A Christian girl, with heart so kind",
    "A love for God that's hard to find!",
    "Not the prettiest, a little blur",
    "But the girl I love - that's for sure <3",
    "With memories forged through food and hugs",
    "And stressful studying and computer bugs",
    // TODO: More verses
    "By God's grace, our love just grew and grew...",
    "And now I can even imagine a future with you!",
    "But while I can't predict the following days,",
    "One thing I know - and that's to pray:",
    "I pray for blessings in both our lives",
    "For strength and wisdom amidst the strife.",
    "I pray for peace amidst the fights",
    "With plenty of hugs to make it right.",
    "I pray for love that always lasts",
    "Our love for God to stay steadfast.",
    "Through ups and downs, lows and highs",
    "May our lives' centers always be Christ",
    "And then God-willing, we shall spend our days",
    "Together, forever, in God's embrace."
];

var images = [
    "happybirthday",
    "lonelyboi",
    "yitaocute",
    "kindpenguin",
    "glassesyitao",
    "actblur",
    "cutetgt",
    "classyitao",
    "computerbugs",
    // TODO: more verses
    "morelove",
    "jewel",
    "dunno",
    "pray", 
    "images/blessings.gif",
    "jiayou",
    "peace",
    "hugs",
    "love2",
    "pray",
    "upsanddowns",
    "cross",
    "penguintgt",
    "hugs2"
];

function buildSlides(){
    var container = document.getElementsByClassName("container")[0];
    for(var i = 0; i < poem.length; i++) {
        var imgSrc;

        if(i >= images.length || !images[i].length) {
            imgSrc = "images/blank.png";
        }
        // Full path already specified
        else if (images[i].indexOf(".") != -1) {
            imgSrc = images[i];
        }
        else {
            imgSrc = "images/" + images[i] + ".png";
        }

        poemText = poem[i];
        
        var slideContainer = document.createElement("div");
        slideContainer.className = slidesBaseClasses + "hidden";
        
        var imgEle = document.createElement("img");
        imgEle.src = imgSrc;
        imgEle.alt = poemText;

        var txtEle = document.createElement("div");
        txtEle.innerText = poemText;
        txtEle.className = "text bold";

        slideContainer.appendChild(imgEle);
        slideContainer.appendChild(txtEle);
        container.appendChild(slideContainer);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    buildSlides();
    showSlides(slideIndex);
});

document.addEventListener("keyup", function(event){
    if (event.keyCode == 37) {
        plusSlide(-1);
    }
    else if (event.keyCode == 39) {
        plusSlide(1);
    }
});
    
// Next/previous controls
function plusSlide(inc) {
    showSlides(slideIndex + inc);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("slide-container");

    slideIndex = Math.max(0, Math.min(n, slides.length-1));

    document.getElementsByClassName("prev")[0].style.opacity = (slideIndex <= 0) ? 0 : 1 ;
    document.getElementsByClassName("next")[0].style.opacity = (slideIndex >= slides.length) ? 0 : 1;


    for (var i = 0; i < slides.length; i++) {
        slides[i].className = slidesBaseClasses;
        slides[i].className += ((i == slideIndex) ? "display" : "hidden");
    }
}