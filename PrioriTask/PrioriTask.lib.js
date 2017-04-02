// PrioriTask Functions Library

Array.prototype.reverse_sort = function(){
	this.sort();
	this.reverse();	
};

Array.prototype.clear = function(){
	this.length = 0;	
};

Array.prototype.setVal = function(val,nVal){
	if(nVal == null) nVal = this.length;
	for (var i=0;i<nVal;i++) {
		this[i] = val;
	}
};

Array.prototype.inArray = function (val) {
	for (var i=0; i < this.length; i++) {
		if (this[i] == val){
			return true;
		}
	}

	return false;
};

Array.prototype.insert = function (itemz,index) {
  this.splice(index, 0, itemz);
};

Array.prototype.remove = function (itemz) {
	for (var i=0;i<this.length;i++) {
		if (this[i] === itemz) {
			this.splice(i,1);
		}
	}
};

Array.prototype.replaceWith = function (itemz,rep) {
	if(rep==null) rep = "";
	for (var i=0;i<this.length;i++) {
		if (this[i] === itemz) {
			this[i] = rep;
		}
	}
};

Array.prototype.removeDup = function() {
	var prim = {"boolean":{}, "number":{}, "string":{}}, obj = [];

	return this.filter(function(x) {
		var t = typeof x;
		return (t in prim) ? 
			!prim[t][x] && (prim[t][x] = 1) :
			obj.indexOf(x) < 0 && obj.push(x);
	});
}

Array.prototype.allValuesEqual = function (val) {
	for (var i=0; i < this.length; i++) {
		if (this[i] != val && this[i].length!=0){
			return false;
		}
	}

	return true;
};	

Date.prototype.getShortYear = function(){
	y = this.getFullYear()+"";
	s = y.split("");
	return s[s.length-2]+s[s.length-1];
}

function rand(lowest,highest){
	num = Math.floor(Math.random()*(highest-lowest)+lowest);
	if(num>highest){
		num = highest;
	}
	else if(num<lowest){
		num = lowest;
	}
	return num;
}

function error(msg){
	console.log(msg);
	alert(msg);
}

function longestWord(str){
	strArr = str.split(" ");
	
	mx = 0;
	longestWrd = "";
	
	for(i=0;i<strArr.length;i++){
		len = strArr[i].length;
		if(len>mx){
			mx=len;
			longestWrd = strArr[i];
		}
	}
	
	return longestWrd;
}

function getElementsByClass(searchClass,node,tag) {
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

/*---------PRIORITASK RELATED--------*/
function dateDiff(date1,date2){
	var date1z = new Date(date1);
	var date2z = new Date(date2);
	
	var timeDiff = date2z.getTime()-date1z.getTime();
	return Math.ceil(parseInt(timeDiff/(1000*3600*24))); 
}

function findTodayDate(){
	var currTimez = new Date();
	return currTimez.getFullYear()+"-"+(parseInt(currTimez.getMonth()+1)<10?"0"+parseInt(currTimez.getMonth()+1):currTimez.getMonth()+1)+"-"+(parseInt(currTimez.getDate())<10?"0"+currTimez.getDate():currTimez.getDate());
}

function findTomorrowDate(){
	var currTimez = new Date();
	return currTimez.getFullYear()+"-"+(parseInt(currTimez.getMonth()+1)<10?"0"+parseInt(currTimez.getMonth()+1):parseInt(currTimez.getMonth()+1))+"-"+(parseInt(currTimez.getDate()+1)<10?"0"+parseInt(currTimez.getDate()+1):parseInt(currTimez.getDate()+1));
}


function findNextDayDate(dayDiff){
	var currTime = new Date();
	var currTimez = new Date(currTime.getTime()+dayDiff*24*60*60*1000);
	
	return currTimez.getFullYear()+"-"+(parseInt(currTimez.getMonth()+1)<10?"0"+parseInt(currTimez.getMonth()+1):parseInt(currTimez.getMonth()+1))+"-"+(parseInt(currTimez.getDate()+1)<10?"0"+parseInt(currTimez.getDate()+1):parseInt(currTimez.getDate()+1));
}


function getShort(dte){
	str = dte.split("");
	return str[0]+str[1]+str[2]
}

function isArray(val){
	if (val instanceof Array) {
		return true;
	}
	else {
		return false;
	}
}

function getMousePositions(e) {
	if (e == null){
		e = window.event;	
	}
	var _mouseX = e.clientX;
	var _mouseY = e.clientY;
	
	return _mouseX+","+_mouseY;
}

function clearData(){
	localStorage.clear();
}

/*------MISCELLANEOUS----*/ //Not so used...

//Format number to decimal places
function formatDecimal(argvalue, addzero, decimaln) {
  var numOfDecimal = (decimaln == null) ? 2 : decimaln;
  var number = 1;

  number = Math.pow(10, numOfDecimal);

  argvalue = Math.round(parseFloat(argvalue) * number) / number;
  // If you're using IE3.x, you will get error with the following line.
  // argvalue = argvalue.toString();
  // It works fine in IE4.
  argvalue = "" + argvalue;

  if (argvalue.indexOf(".") == 0)
    argvalue = "0" + argvalue;

  if (addzero == true) {
    if (argvalue.indexOf(".") == -1)
      argvalue = argvalue + ".";

    while ((argvalue.indexOf(".") + 1) > (argvalue.length - numOfDecimal))
      argvalue = argvalue + "0";
  }

  return argvalue;
}

//Check if string is email
function isEmail(argvalue) {
  if (argvalue.indexOf(" ") != -1)
    return false;
  else if (argvalue.indexOf("@") == -1)
    return false;
  else if (argvalue.indexOf("@") == 0)
    return false;
  else if (argvalue.indexOf("@") == (argvalue.length-1))
    return false;

  var arrayString = argvalue.split("@"); //works only in netscape3 and above.
  //retSize = argvalue.split("@");

  if (arrayString[1].indexOf(".") == -1)
    return false;
  else if (arrayString[1].indexOf(".") == 0)
    return false;
  else if (arrayString[1].charAt(arrayString[1].length-1) == ".") {
    return false;
  }

  return true;
}

//Check if URL
function isURL(argvalue) {
  if (argvalue.indexOf(" ") != -1)
    return false;
  else if (argvalue.indexOf("http://") == -1)
    return false;
  else if (argvalue == "http://")
    return false;
  else if (argvalue.indexOf("http://") > 0)
    return false;

  argvalue = argvalue.substring(7, argvalue.length);
  if (argvalue.indexOf(".") == -1)
    return false;
  else if (argvalue.indexOf(".") == 0)
    return false;
  else if (argvalue.charAt(argvalue.length - 1) == ".")
    return false;

  if (argvalue.indexOf("/") != -1) {
    argvalue = argvalue.substring(0, argvalue.indexOf("/"));
    if (argvalue.charAt(argvalue.length - 1) == ".")
      return false;
  }

  if (argvalue.indexOf(":") != -1) {
    if (argvalue.indexOf(":") == (argvalue.length - 1))
      return false;
    else if (argvalue.charAt(argvalue.indexOf(":") + 1) == ".")
      return false;
    argvalue = argvalue.substring(0, argvalue.indexOf(":"));
    if (argvalue.charAt(argvalue.length - 1) == ".")
      return false;
  }

  return true;

}

//Trim leading spaces
function ltrim(argvalue) {
  while (1) {
    if (argvalue.substring(0, 1) != " ")
      break;
    argvalue = argvalue.substring(1, argvalue.length);
  }

  return argvalue;
}

//Trim trailing spaces
function ttrim(argvalue) {
  while (1) {
    if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
      break;
    argvalue = argvalue.substring(0, argvalue.length - 1);
  }

  return argvalue;
}