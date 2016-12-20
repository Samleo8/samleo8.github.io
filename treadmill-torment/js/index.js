/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var game;
var highscore = 0;
var app = {
    // Application Constructor
    initialize: function() {
        this.onDeviceReady();
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('onload', this.onDeviceReady, false);
        
        window.addEventListener("keydown", function (e) {
            for(i in game.isKeyDown)
                if(game.isKeyDown.hasOwnProperty(i) && e.keyCode == i)
                    game.isKeyDown[e.keyCode] = true;
        }, false);

        window.addEventListener("keyup", function (e) {
            if(game.isKeyDown[e.keyCode] != undefined)
                game.isKeyDown[e.keyCode] = false;
            
			for(var j=0;j<game.controls["game_pause"].length;j++)
				if(e.keyCode==game.controls["game_pause"][j]){
					game.pause();
					break;
				}
			
			for(var j=0;j<game.controls["game_over"].length;j++)            
				if(e.keyCode==game.controls["game_over"][j] && game.gameOver){
					document.getElementById("splashScreen").className = document.getElementById("splashScreen").className.replaceAll(" appear"," disappear");
					highscore = Math.max(game.score,highscore);
					game = new Game();
					game.start();
					break;
				}
           
        }, false);
        
		document.getElementsByClassName("game_button")[0].addEventListener("mousedown", function (e) {
            game.isButtonPressed["running"] = true;
        }, false);
		
		 document.getElementsByClassName("game_button")[0].addEventListener("mouseup", function (e) {
            game.isButtonPressed["running"] = false;
        }, false);
		
		document.getElementsByClassName("game_button")[1].addEventListener("mousedown", function (e) {
            game.isButtonPressed["backRunning"] = true;
        }, false);
		
		 document.getElementsByClassName("game_button")[1].addEventListener("mouseup", function (e) {
            game.isButtonPressed["backRunning"] = false;
        }, false);
		
		document.getElementsByClassName("game_button")[2].addEventListener("mousedown", function (e) {
            game.isButtonPressed["sprinting"] = true;
        }, false);
		
		 document.getElementsByClassName("game_button")[2].addEventListener("mouseup", function (e) {
            game.isButtonPressed["sprinting"] = false;
        }, false);
		
	},
    
    onDeviceReady: function() {
        document.getElementById("splashScreen").className += " disappear";
        game = new Game();
        game.start();
    }
};

function Game(_args){
    if(_args == null){
        _args = {};    
    }
    
    var self = this;
    
    //Canvas
    this.canvas = null;
    this.canvasRatio = 6/4; // width:height
    this.canvasWidth;
    this.canvasHeight;
    this.oldCanvasWidth = null;
    this.oldCanvasHeight = null;
    
    //Scores
    this.score = 0;
    
    //Others
    this.scoreTimer;
    this.timer;
    this.refreshTimer;
    this.pauseTimer;
    this.timePaused = 0;
    this.gamePaused = false;
    this.gameOver = false;
    
    //Controls
    this.controls = {
        "back_run":[65,37],
        "run":[83,40],
        "sprint":[68,39],
        "game_over":[32,13],
        "game_pause":[80]
    };
    
	this.isButtonPressed = {
		"running":false,
		"backRunning":false,
		"sprinting":false
	};
    this.isKeyDown = {};
    
    //Obstacles (0: Spikes | 1: Staglamite)
    
    this.obstacleArray = [];
    this.firstObstacle = true;
    this.obstacleTimer = new Date().getTime();
    this.obstaclesReloadTime = 800; //ms
    this.obstacleWidth = 7; //percent of canvas width
    
    //Buttons & Misc
    this.flagEle;
    this.sprintBar;
    this.scoreDiv;
    this.pauseBtn;
    this.muteBtn;
        
    //Player
    this.treadmill = {
        speed: 35
    };
    
    this.hero = {
        x:0,
        y:0,
        width:430,
        height:307,
        hwratio:0,
        pwidth: 10, //percentage width relative to canvas
        sprintLevel: 100,
        sprintSpeed: 1.6, //multiplier
        sprinting: false,
        sprintReload: {"time":100,"add":0.1}, //milliseconds
        backRunningSpeed: 0.8,
        backRunning: false,
        portalsPassed:0,
        
        speed: 100,
        running: false,
        holder: null,
        img: null,
        destroy: function(){
            this.holder.style.opacity = 0;
		}
    };
    
    this.start = function(){
        //Allow arguments to override default
        if(_args["hero"]!=null)
            this.hero = _args["hero"];
        
        if(_args["treadmill"]!=null)
            this.treadmill = _args["treadmill"];
        
        if(_args["controls"]!=null)
            this.canvasHeight = _args["controls"];
        
        if(_args["obstaclesReloadTime"]!=null)
            this.obstaclesReloadTime = _args["obstaclesReloadTime"];
        
        if(_args["obstacleWidth"]!=null)
            this.obstacleWidth = _args["obstacleWidth"];
        
        if(_args["canvasRatio"]!=null)
            this.canvasRatio = _args["canvasRatio"];
        
        if(_args["canvasWidth"]!=null)
            this.canvasWidth = _args["canvasWidth"];
        
        if(_args["canvasHeight"]!=null)
            this.canvasHeight = _args["canvasHeight"];   
        
        console.log(_args);
        
        //Controls & Event Listeners
        for(var i in this.controls)
            if(this.controls.hasOwnProperty(i))
                for(var j=0;j<this.controls[i].length;j++)
                    this.isKeyDown[this.controls[i][j]] = false;

        //Canvas
        this.canvas = document.getElementById("game_canvas");
        window.addEventListener("resize",
            function(){
                self.canvasResize(self);
            }
        );
        
        document.getElementById("splashScreen").className = document.getElementById("splashScreen").className.replaceAll(" appear"," disappear");
        
        self.sprintBar = document.getElementById("sprintlevel");
        self.scoreDiv = document.getElementById("scoreDiv");
        
        //Hero Holder + Img init
        self.hero.hwratio = self.hero.height/self.hero.width;
        
        self.hero.holder = document.getElementById("game_player");
        self.hero.img = self.hero.holder.getElementsByTagName("img")[0];
        
        self.hero.holder.style.opacity = 1;
        
        //Set Canvas
        self.canvasResize(self);
        
        //Set hero stats (after resize)        
        self.hero.x = self.canvasHeight/2-self.hero.width/2;
        self.hero.y = self.canvasHeight*0.9-self.hero.height;
        
        //Timer & Tick
        this.timer = new Date().getTime();
        this.scoreTimer = new Date().getTime();
        this.refreshTimer = new Date().getTime();
        
        this.tick();
    };
    
    this.canvasResize = function(obj){
        if(obj.oldCanvasHeight == null && obj.oldCanvasWidth == null){
            obj.oldCanvasWidth = document.body.clientWidth;
            obj.oldCanvasHeight = document.body.clientHeight;
        }
        
        //Resize Canvas        
        obj.canvas.style.width = document.body.clientWidth + "px";
        obj.canvas.style.height = document.body.clientWidth/obj.canvasRatio +"px";
        
        if(parseFloat(obj.canvas.style.height) >= document.body.clientHeight){
            obj.canvas.style.height = document.body.clientHeight + "px";
            obj.canvas.style.width = document.body.clientHeight*obj.canvasRatio +"px";
        }
        
        obj.oldCanvasWidth = obj.canvasWidth;
        obj.oldCanvasHeight = obj.canvasHeight;
        
        obj.canvasWidth = parseFloat(obj.canvas.style.width);
        obj.canvasHeight = parseFloat(obj.canvas.style.height);
        
        //Change x & y coords of objects accordingly
        for(var i=0;i<obj.obstacleArray.length;i++){
            var obs = obj.obstacleArray[i];
            
            obs.x /= obj.oldCanvasWidth/obj.canvasWidth;
            obs.y /= obj.oldCanvasHeight/obj.canvasHeight;
            obs.updateWidthHeight();
        }
        
        obj.hero.x /= obj.oldCanvasWidth/obj.canvasWidth;
        obj.hero.y /= obj.oldCanvasHeight/obj.canvasHeight;
        
        obj.hero.img.style.width = obj.canvasWidth*(obj.hero.pwidth/100)+"px";
        obj.hero.holder.style.width = obj.hero.img.style.width;
        
        obj.hero.width = parseInt(obj.hero.holder.style.width);
        obj.hero.height = obj.hero.width*obj.hero.hwratio;
    }
    
    this.render = function () {
        var ob;

        for(var i=0;i<self.obstacleArray.length;i++){
            //if(!self.obstacleArray.hasOwnProperty(i)) return;
            ob = self.obstacleArray[i];
            
            ob.img.style.left = ob.x + "px";
            ob.img.style.top = ob.y + "px";
        }
        
        var plyr = self.hero;
        
        plyr.holder.style.left = plyr.x + "px";
        plyr.holder.style.top = plyr.y + "px";
        
        self.sprintBar.style.width = plyr.sprintLevel+"%";
        
        if(!self.gamePaused){
            var delta = new Date().getTime() - self.scoreTimer - self.timePaused;
            var seconds = parseFloat((delta/1000)%60).toFixed(2);
            if(seconds<10){
                seconds = "0"+seconds;   
            }
            var minutes = Math.floor(delta/60000)%60+plyr.portalsPassed;
            if(minutes<10){
                minutes = "0"+minutes;   
            }
            var hours = Math.floor(delta/3.6E6)%60;
            if(hours<10){
                hours = "0"+hours;   
            }
            
            self.score = hours+":"+minutes+":"+seconds;
            self.scoreDiv.innerHTML = self.score;
            
            var delta = new Date().getTime() - self.refreshTimer;
            if(delta>=plyr.sprintReload["time"]){
                self.refreshTimer = new Date().getTime();
                plyr.sprintLevel+=plyr.sprintReload["add"];
            }
        }
    };
    
    this.movePlayer = function(mod){
        var plyr = self.hero;
        var overallSpd = -self.treadmill.speed*mod;

        if(plyr.sprinting){
            if(plyr.sprintLevel>0){
                overallSpd += plyr.speed*plyr.sprintSpeed*mod;
                plyr.sprintLevel--;
            }
            else{
                overallSpd += plyr.speed*mod;
            }
        }
        else if(plyr.backRunning){
            if(plyr.sprintLevel>0){
                overallSpd -= plyr.speed*plyr.backRunningSpeed*mod;
                plyr.sprintLevel--;
            }
            else{
                overallSpd -= plyr.backRunningSpeed*mod;
            }
        }
        else if(plyr.running) overallSpd += plyr.speed*mod;
        else{
            plyr.sprintLevel += 0.1;    
        }
        
        plyr.sprintLevel = Math.max(Math.min(100,plyr.sprintLevel),0);
        plyr.x += overallSpd;
    };
    
    this.moveObstacles = function(mod){
        var ob;
        for(var i=0;i<self.obstacleArray.length;i++){
            if(!self.obstacleArray.hasOwnProperty(i)) return;
            
            ob = self.obstacleArray[i];

            //Move Obstacle
            if(ob.type == 0){
                ob.x += ob.speed*mod;   
                ob.speed += ob.acc;
            }
            else{
                ob.y += ob.speed*mod;
                ob.speed += ob.acc;
            }

            //Check for Gameover
            // * Check for obstacle out of stage
            if(ob.x<0 || ob.y>self.canvasHeight){
                ob.destroy();
            }
            
            // * Centered Player & Obstacle Co-ordinates
            obx = ob.x+ob.width/2; 
            oby = ob.y+ob.height/2;
            
            plyrx = self.hero.x+self.hero.width/2;
            plyry = self.hero.y+self.hero.height/2;
            
            if(Math.abs(obx-plyrx)<=(ob.width+self.hero.width-ob.hitTestPadX)/2 && Math.abs(oby-plyry)<=(ob.height+self.hero.height-ob.hitTestPadY)/2){ //hittest with player
                self.game_over(false);
            }
        }
    };
    
    this.generateObstacles = function(){
        var self = this;
        
        var d = new Date().getTime();
        
        if(!self.firstObstacle) if(Math.abs(d-self.obstacleTimer)<=self.obstaclesReloadTime) return;
        
        var plyrx = self.hero.x+self.hero.width/2;
        
        var t = Math.random()<0.95;
        var w = self.canvasWidth*(self.obstacleWidth/100);
        var h = w;
        var range = w*5; //how far away from center of player
        var pad = 10;

        if(!t){
            //Bottom Spike
            //self.obstacleArray.push(new obstacle(t,w+self.canvasWidth,self.canvasHeight-h));
        }
        else{ //Staglamite
            if(Math.random()<0.3) dir=-1; else dir = 1; //choose whether spike is behind or in front of player
            var r = dir*rand(0,range)+plyrx; //make it such that it's near to the player positon (muhaha)
            r = Math.min(self.canvasWidth-w, Math.max(w,r)); //ensure still within range
            
            self.obstacleArray.push(new obstacle(t,r,-h-pad));
        }    
        
        self.obstacleTimer = new Date().getTime();
        self.firstObstacle = false;
    }
    
    this.tick = function(){
        if(self.gameOver){
            self.game_over();
            return;
        }
        var now = new Date().getTime();
        var delta = now - self.timer;
        self.timer = now;
        
        if(!self.gamePaused){            
            //Check keyPresses
            
			//FOR RUNNING
            self.hero.running = false;
            for(var j=0;j<self.controls["run"].length;j++)
                if(self.isKeyDown[self.controls["run"][j]]){
                    self.hero.running = true;
                }
			if(self.isButtonPressed["running"]) self.hero.running = true;
			
			//FOR BACKRUNNING
            self.hero.backRunning = false;
            for(var j=0;j<self.controls["back_run"].length;j++)
                if(self.isKeyDown[self.controls["back_run"][j]]){
                    self.hero.backRunning = true;
                }
			if(self.isButtonPressed["backRunning"]) self.hero.backRunning = true;
			           
			//FOR SPRINTING
            self.hero.sprinting = false;
            for(var j=0;j<self.controls["sprint"].length;j++)
                if(self.isKeyDown[self.controls["sprint"][j]]){
                    self.hero.sprinting = true;
                }
			if(self.isButtonPressed["sprinting"]) self.hero.sprinting = true;
            
            self.movePlayer(delta/ 1000);
            self.moveObstacles(delta/ 1000);
            self.render();
            
            //Check for gameover by offscreen
            //NOTE: Gameover by obstacle is in moveObstacles function
            if(self.hero.x<=-self.hero.width){
                self.game_over();
                return;
            }
            
            //Check for win status
            if(self.hero.x>=self.canvasWidth-self.hero.width){
                self.game_over(true);
                return;
            }
            
            self.generateObstacles(); //Constantly generate obstacles
        }
        
        if(!self.gameOver) requestAnimationFrame(self.tick);
    };
    
    this.pause = function(){
        self.gamePaused = !self.gamePaused;
        
        if(self.gamePaused){
            self.pauseTimer = new Date().getTime();    
        }
        else if(!self.gamePaused){
            var now = new Date().getTime();
            self.timePaused += now-self.pauseTimer;
        }
    }
    
    this.upLevel = function(){
        self.hero.portalsPassed+=1;
            
        self.hero.sprintLevel += 25;

        self.obstaclesReloadTime *= 0.9;
        self.obstaclesReloadTime = Math.max(self.obstaclesReloadTime,400);
        self.treadmill.speed *= 1.1;
        self.treadmill.speed = Math.min(self.treadmill.speed,self.hero.speed*0.7);

    }
    
    this.game_over = function(win){
        self.firstObstacle = true;
        self.gameOver = true;
        
        if(win==null) win = false;
        
        //Destroy everything
        while(self.obstacleArray.length){
               self.obstacleArray[0].destroy();
        }
        
        self.hero.destroy();
        
        if(win){
            console.log("Keep Going!");
            console.log("Score: "+self.score);    
            
            self.gameOver = false;
            
            self.upLevel();
            self.start();
            
            return;
        }
        else{
            console.log("-----GAME OVER-----");
            console.log("Score: "+self.score);
        }
        
        //Show New Game screen
        document.getElementById("splashScreen").className = document.getElementById("splashScreen").className.replaceAll(" disappear"," appear");
    };
};

var obstacle = function(_type,_x,_y,_args){
    /* Obstacles
     * 0: Spikes
     * 1: Staglamite
    //*/
    
    var self = this;
    
    this.type = _type;
    this.x = _x;
    this.y = _y;
    this.args = _args;
    
    this.hitTestPadX = 10;
    this.hitTestPadY = 10;
    
    this.updateWidthHeight = function(updateImg){
        if(updateImg == null) updateImg = true;
        
        self.width = game.canvasWidth*(game.obstacleWidth/100);
        self.height = self.width;
        
        if(updateImg){
            self.img.getElementsByTagName("img")[0].width = self.width;
            self.img.getElementsByTagName("img")[0].height = self.height;
        }
    }
    
    this.updateWidthHeight(false);
    
    this.multiplier = 1;
    
    this.destroyed = false;
    
    //Create div element
    var obs_ele = document.createElement("div");
    obs_ele.className = "obstacle ";
    var obs_img = document.createElement("img");

    if(!this.type){
        obs_ele.className += "spike";
        obs_img.src = "img/spike.png";
    }
    else{
        obs_ele.className += "spike_top";
        obs_img.src = "img/spike_top.png";
    }

    obs_ele.style.width = this.width + "px";
    obs_ele.style.height = this.height + "px";
    
    obs_img.width = this.width;
    obs_img.height = this.height;
    
    obs_ele.style.top = _y+"px";
    obs_ele.style.left = _x+"px";
    
    obs_ele.appendChild(obs_img);
    
    document.getElementById("game_canvas").appendChild(obs_ele);
    
    this.img = obs_ele;

    //Set Speed
    if(this.type){
        this.speed = 0;
        this.acc = 1.2;
    }
    else{
        this.speed = -game.treadmill.speed*this.multiplier;
        this.acc = 0;
    }
    
    this.destroy = function(){
        self.destroyed = true;
        self.img.parentElement.removeChild(self.img);
        game.obstacleArray.removeItem(self);
    }
}

Array.prototype.removeItem = function(item){
    var ind = this.indexOf(item);
    if(ind!=-1) this.splice(ind,1);
}

Image.prototype.resize = function(w,h){
    var r = this.width/this.height;
    if(w==-1){
        this.height = h;
        this.width = h*r;
    }
    else if(h==-1){
        this.width = w;
        this.height = w/r;
    }
    else{
        this.width = w;
        this.height = h;
    }
}

function rand(lw,hg){
    var randNo = Math.floor(Math.random()*(1+hg-lw))+lw;
	return randNo;
}

String.prototype.replaceAll = function(find,rep){
    return this.split(find).join(rep);
}
    
app.initialize();