/* CONNECT 4 */
var Game = function(){
	this.board = [];

	this.gameArea;

	this.player = 0;
	this.playerColor = ["orange", "green"];

	this.animation = false;
	this.dropDelay = 100;

	this.rows = 6;
	this.cols = 7;

	this.init = function(args){
		var x,y,i,j,k;

		if(typeof args != "undefined"){
			if(typeof args["rows"] != "undefined") this.rows = args["rows"];

			if(typeof args["cols"] != "undefined") this.rows = args["cols"];
		}

		this.totalPiecesDropped=0;
		this.animation = false;

		//Generate board array
		for(i=0;i<this.cols;i++){
			this.board[i] = [];
			for(j=0;j<this.rows;j++){
				this.board[i][j] = -1;
			}
		}

		//Create Game Area
		var gA = document.getElementById("game_area");
		if(gA != null){
			gA.parentElement.removeChild(gA);
		}

		this.gameArea = document.createElement("div");
		this.gameArea.id = "game_area";

		document.body.appendChild(this.gameArea);

		//Create Title
		var title = document.createElement("div");
		title.className = "title";
		title.innerHTML = "Connect{ <span>4</span>";

		this.gameArea.appendChild(title);

		//Dynamically Generate Table for board
		var table = document.createElement("table");
		for(j=0;j<this.rows;j++){
			var tr = document.createElement("tr");
			for(i=0;i<this.cols;i++){
				var td = document.createElement("td");
				td.id = "cell_"+i+"_"+j;
				var pc = document.createElement("div");
				pc.id = "piece_"+i+"_"+j;
				pc.className = "piece empty";
				td.appendChild(pc);

				var self = this;

			td.addEventListener("mouseup",function(){
				if(self.animation == false){
					var x = this.id.split("_")[1];
					self.animation = true;
					self.dropPiece(x,0);
				}
			});

			td.addEventListener("touchend",function(){
				if(self.animation == false){
					var x = this.id.split("_")[1];
					self.animation = true;
					self.dropPiece(x,0);
				}
			});


				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		this.gameArea.appendChild(table);

		//Create Options part
		var optionsEle = document.createElement("div");
		optionsEle.className = "options-container";

		optionsEle.innerHTML = "<div class='options-animation'>Animation : <span class='checkbox'><input type='checkbox' checked='checked' /><span class='checkmark'></span></span></div>";

		optionsEle.innerHTML += "<div class='options-player'>Player : <span id='player-indicator' class='piece "+this.playerColor[this.player]+"'></span> </div>";

		this.gameArea.appendChild(optionsEle);

		var chBx = optionsEle.getElementsByTagName("input")[0];
		chBx.checked = true;
		this.animationEnabled = true;
		
		chBx.addEventListener("change",function(){
			self.animationEnabled = !self.animationEnabled;
		});

		//self.gameArea.style.height = (180+(this.rows*53+1))+"px";
	}

	this.dropPiece = function(x,y){
		//console.log(x+","+y+" "+this.board[x][y]);
		if(y == 0 && this.board[x][y] != -1){
			this.animation = false;
			return;
		}

		if(this.board[x][y] != -1 || y==this.rows){
			this.animation = false;

			this.board[x][y-1] = this.player;

			this.checkEndGame(x,y-1);

			var oldPlayer = this.player;

			this.player = (this.player)?0:1;
			document.getElementById("player-indicator").className = document.getElementById("player-indicator").className.replaceAll(" "+this.playerColor[oldPlayer]," "+this.playerColor[this.player]);

			return;
		}
		else{
			this.animation = true;				this.colorCell(x,y,this.playerColor[this.player],"empty");
	if(y){
			this.colorCell(x,y-1,"empty",this.playerColor[this.player]);
	}

			var self = this;

			setTimeout(function(){
				self.dropPiece(x,y+1)
			}, self.dropDelay);
		}
	}

	this.colorCell = function(x,y,color_to,color_from){
		if(color_from == null || typeof color_from == "undefined"){
			color_from = "empty"
		}

		var ele = document.getElementById("piece_"+x+"_"+y);

		ele.className = ele.className.replaceAll(" "+color_from," "+color_to);
	}

	this.checkEndGame = function(x,y){
		this.totalPiecesDropped++;

		console.log(x+","+y);
		x = parseInt(x);
		y = parseInt(y);

		var i, cnt;
		var dir = {
			"up":-1,
			"down":1,
			"left":-1,
			"right":1
		}
		//Check Vertical (need only check down)
		cnt = 1;
		for(i=1;i<4;i++){
			if(y+i*dir.down<0) break;

			if(this.board[x][y+i*dir.down] == this.player){
				cnt++;
			}
			else break;
		}

		if(cnt>=4){
			this.gameOver(true);
			return;
		}

		//Check Horizontal
		cnt = 1;
		for(i=1;i<4;i++){
			if(x+i*dir.left<0) break;

			if(this.board[x+i*dir.left][y] == this.player){
				cnt++;
			}
			else break;
		}

		for(i=1;i<4;i++){
			if(x+i*dir.right>=this.cols) break;

			if(this.board[x+i*dir.right][y] == this.player){
				cnt++;
			}
			else break;
		}

		if(cnt>=4){
			this.gameOver(true);
			return;
		}

		//Check Diagonal (UP-LEFT/DOWN-RIGHT)
		cnt = 1;
		for(i=1;i<4;i++){
			if(x+i*dir.left<0 || y+i*dir.up<0) break;

			if(this.board[x+i*dir.left][y+i*dir.up] == this.player){
				cnt++;
			}
			else break;
		}

		for(i=1;i<4;i++){
			if(x+i*dir.right>=this.cols || y+i*dir.down>=this.rows) break;

			if(this.board[x+i*dir.right][y+i*dir.down] == this.player){
				cnt++;
			}
			else break;
		}

		if(cnt>=4){
			this.gameOver(true);
			return;
		}

		//Check Diagonal (UP-RIGHT/DOWN-LEFT)
		cnt = 1;
		for(i=1;i<4;i++){
			if(x+i*dir.right>=this.cols || y+i*dir.up<0) break;

			if(this.board[x+i*dir.right][y+i*dir.up] == this.player){
				cnt++;
			}
			else break;
		}

		for(i=1;i<4;i++){
			if(x+i*dir.left<0 || y+i*dir.down>=this.rows) break;

			if(this.board[x+i*dir.left][y+i*dir.down] == this.player){
				cnt++;
			}
			else break;
		}

		if(cnt>=4){
			this.gameOver(true);
			return;
		}

		if(this.totalPiecesDropped>=this.rows*this.cols){
			this.gameOver(false);
			return;
		}
	}

	this.gameOver = function(win){ //win (true) or draw (false)?
		if(win){
			this.message("Player "+parseInt(this.player+1)+" ("+this.playerColor[this.player].toUpperCase()+") wins!");
		}
		else{
			this.message("Draw!");
		}

		this.init();
	}

	this.message = function(msg){
		console.log(msg);
		alert(msg);
	}
}

var game = new Game();

window.addEventListener("load", function(){
	game.init({});
},false);

String.prototype.replaceAll = function(x,y){
	return this.split(x).join(y);
}
