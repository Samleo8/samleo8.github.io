var Cursor = function(){
	this.time = 1500; //milliseconds
	this.tickColor = "#EEE";
	this.bgColor = "rgba(240,240,240,0.2)";
    
    this.invertTickColor = "rgb(0,100,100)";
    this.invertBgColor = "rgba(141,211,107,0.4)";
    
	this.timer = 0;
	this.ttlProgress = 0;
    this.hidden = false;
    
	this.element = getElementsByClass("cursor")[0];
    this.hoverElement; //element being hovered on
    
	this.init = function(tickColor,bgColor){
        if(tickColor == null) tickColor = this.tickColor;
        if(bgColor == null) bgColor = this.bgColor;
        
		this.renderProgress(0);
        var el = getElementsByClass("loader-spiner",this.element);
        for(var i=0;i<el.length;i++){
            el[i].style.borderColor = tickColor;
        }
        
        var el = getElementsByClass("cursor-bg",this.element);
        for(var i=0;i<el.length;i++){
            el[i].style.borderColor = bgColor;
        }
        
        if(!options["eyeCursorEnabled"]){
            console.log("I-Focus Cursor has been disabled.");
            this.hide();   
        }
	};
    
    this.reset = function(){
        clearInterval(this.timer);        
        this.ttlProgress = 0;
        this.init();
    }
    
    this.invertColor = function(){
        this.init(this.invertTickColor,this.invertBgColor);
    }

	this.activate = function(time){
        if(time==null) time = this.time; 
        this.deactivate();
        this.show();
		this.timer = setInterval(ani,time/100);
	}
    
	this.deactivate = function(){
		clearInterval(this.timer);
		this.ttlProgress = 0;
		this.renderProgress(0);

	}

	function ani(){
		if(cur.ttlProgress<100){
			cur.ttlProgress++;
			cur.renderProgress(cur.ttlProgress);
		}
		else{
			cur.deactivate();
			cur.triggerClick();
		}
	}

	this.show = function(){
        this.hidden = false;
        this.element.style.display = "block";
	};
	
	this.hide = function(){
		this.hidden = true;
        this.element.style.display = "none";
	};
    
    this.triggerClick = function(){
        if(!options["eyeCursorEnabled"]){
            console.log("I-Focus Cursor Disabled! Unable to perform click.");
            return;
        }
        if (document.createEvent && this.hoverElement!=null){
            this.hoverElement.dispatchEvent(new MouseEvent("click"));
            this.hoverElement = null;
        }
    }
	
	this.renderProgress = function(progress){
        progress = Math.floor(progress);
        //Must reset b4 continue with actual transformation
        
        if(progress<25){
            var angle = -90 + (progress/100)*360;
            
            this.doTransform("animate-0-25-b","rotate("+angle+"deg)");
            this.doTransform("animate-25-50-b","rotate(90deg)");
            this.doTransform("animate-50-75-b","rotate(90deg)");
            this.doTransform("animate-75-100-b","rotate(90deg)");
        }
        else if(progress>=25 && progress<50){
            var angle = -90 + ((progress-25)/100)*360;
            this.doTransform("animate-0-25-b","rotate(0deg)");
            this.doTransform("animate-25-50-b","rotate("+angle+"deg)");
            this.doTransform("animate-50-75-b","rotate(90deg)");
            this.doTransform("animate-75-100-b","rotate(90deg)");
        }
        else if(progress>=50 && progress<75){
            var angle = -90 + ((progress-50)/100)*360;
            this.doTransform("animate-0-25-b","rotate(0deg)");
            this.doTransform("animate-25-50-b","rotate(0deg)");
   		   this.doTransform("animate-50-75-b","rotate("+angle+"deg)");
            this.doTransform("animate-75-100-b","rotate(90deg)");
        }
        else if(progress>=75 && progress<=100){
            var angle = -90 + ((progress-75)/100)*360;
            
            this.doTransform("animate-0-25-b","rotate(0deg)");
            this.doTransform("animate-25-50-b","rotate(0deg)");
            this.doTransform("animate-50-75-b","rotate(0deg)");
            this.doTransform("animate-75-100-b","rotate("+angle+"deg)");
        }
        
        var progDiv = getElementsByClass("loader-text");
        for(i=0;i<progDiv.length;i++){
            progDiv[i].innerHTML = progress+"%";
        }
    };
    
    this.doTransform = function(cls,trans){
        var eles = getElementsByClass(cls);
        for(var i=0;i<eles.length;i++){
            var element = eles[i];
            element.style.webkitTransform = trans;
            element.style.MozTransform = trans;
            element.style.msTransform = trans;
            element.style.OTransform = trans;
            element.style.transform = trans;
        }
    }


}