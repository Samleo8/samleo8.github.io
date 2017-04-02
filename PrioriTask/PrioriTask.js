var nHmwk = 0;

var task = new Array("");
var bgID = 1;

//Revision
var revision = new Array();
for(i=0;i<=7;i++){
	revision[i] = new Array('');
}
var revNameC = new Array("");
var revDateC = new Array("");

//Existing
var hmwkDue = new Array("");
var hmwkName = new Array("");
var hmwkTimeNeeded = new Array("");
var hmwkImpt = new Array("");
var hmwkSubject = new Array("");
var hmwkNotes = new Array("");
var priority = new Array();

//Completed
var hmwkDateC = new Array("");
var hmwkNameC = new Array("");


//Subject
var subjectName = new Array("English","Math","Chinese","Physics","Chemistry","Biology","Humanities","Others");
var subjectClr = new Array("#FFFF6D","#FFC3FC","#FF667B","#6AFFDC","#FFC27E","#A3CF82","#B782FF","#CAEDFF");
var fixedTaskClr = "#337DBF";
var subjectTxtClr = "#000";

//Sorting
 //Existing
 var hmwkSorting = new Array("");
 var hmwkDueSort = new Array("");
 var hmwkNameSort = new Array("");

 //Completed
 var hmwkCSorting = new Array("");
 var hmwkDateCSort = new Array("");
 var hmwkNameCSort = new Array("");

//Timeline
var daysOfWeekJS = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var monthNameJS = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var daysOfWeek = new Array("","Mon","Tue","Wed","Thu","Fri","Sat","Sun");

var timeSessionIndex = {
	"00:00":0,
	"00:30":1,
	"01:00":2,
	"01:30":3,
	"02:00":4,
	"02:30":5,
	"03:00":6,
	"03:30":7,
	"04:00":8,
	"04:30":9,
	"05:00":10,
	"05:30":11,
	"06:00":12,
	"06:30":13,
	"07:00":14,
	"07:30":15,
	"08:00":16,
	"08:30":17,
	"09:00":18,
	"09:30":19,
	"10:00":20,
	"10:30":21,
	"11:00":22,
	"11:30":23,
	"12:00":24,
	"12:30":25,
	"13:00":26,
	"13:30":27,
	"14:00":28,
	"14:30":29,
	"15:00":30,
	"15:30":31,
	"16:00":32,
	"16:30":33,
	"17:00":34,
	"17:30":35,
	"18:00":36,
	"18:30":37,
	"19:00":38,
	"19:30":39,
	"20:00":40,
	"20:30":41,
	"21:00":42,
	"21:30":43,
	"22:00":44,
	"22:30":45,
	"23:00":46,
	"23:30":47
};

var dayShortForm = {
	"Monday":"Mon",
	"Tuesday":"Tue",
	"Wednesday":"Wed",
	"Thursday":"Thu",
	"Friday":"Fri",
	"Saturday":"Sat",
	"Sunday":"Sun"
};

var dateChangeInc = 0;
var datesOfWeek = new Array();

//Timetable
var gradType = "whiteGrad";
//var gradType = "blackGrad";

var prioritask = new Array();
var fixedTasks = new Array();

var Timetable = new Array();

Timetable[0] = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"];

Timetable[1] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[2] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[3] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[4] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[5] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[6] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

Timetable[7] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

/*-------COMPACT MENU-------*/
function taskDropdown(event){
	if(document.getElementById("drop_menu_select").style.display == "none"){
		openTaskDropdown(event);
	}
	else{
		closeTaskDropdown(event);
	}
}	

function openTaskDropdown(event){
	event.stopPropagation();
	document.getElementById("drop_menu_select").style.display = "block";	
}

function closeTaskDropdown(event){
	event.stopPropagation();
	document.getElementById("drop_menu_select").style.display = "none";
}

function changeTaskType(id){
	typ = id.split("drop_")[1];
	
	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
	document.getElementById("hmwkNewMenu").className = document.getElementById("hmwkNewMenu").className.replace(" appear","");
	document.getElementById("revNewMenu").className = document.getElementById("revNewMenu").className.replace(" appear","");
	document.getElementById("prioritise_add_fixed").className = document.getElementById("prioritise_add_fixed").className.replace(" appear","");
	//document.getElementById("hmwkNewMenu").style.display = "none";
	//document.getElementById("revNewMenu").style.display = "none";
	//document.getElementById("prioritise_add_fixed").style.display = "none";
	
	if(typ=="hmwk"){
		txt = "Homework";
		document.getElementById("prioritise_add_btn_txt").onclick = function(){
			hmwkNew();
			
		}
	}
	else if(typ=="rev"){
		txt = "Revision";
		document.getElementById("prioritise_add_btn_txt").onclick = function(){
			revNew();
		}
	}
	else if(typ=="fixed"){
		txt = "Fixed Task";
		document.getElementById("prioritise_add_btn_txt").onclick = function(){
			fixedNew();
		}
	}
	
	document.getElementById("drop_menu_text").getElementsByTagName("span")[0].innerHTML = txt;	
}

/*------INIT---------*/
if (window.localStorage) {
	if(localStorage['saved']){ //if localStorage is already set
		console.log("localStorage set before!");
		
		retrieveData();
		
		//init();
	}
	else{
		console.log("No localStorage found!");
	}
}
else{
	console.log("Local Storage is not supported! :(");
}

function init(){
	document.getElementById("prioritise_existing_tasks_date").innerHTML = "";
	document.getElementById("prioritise_existing_tasks_tasks").innerHTML = "";

	document.getElementById("prioritise_complete_tasks_date").innerHTML = "";
	document.getElementById("prioritise_complete_tasks_tasks").innerHTML = "";
	
	sortHmwkByDate();
	
	for(a=1;a<=nHmwk;a++){
		var editDiv = "";
		var subjDiv = "";
		i = hmwkSorting[a].split("_")[1];
		
		editDiv = '';
		editDiv += '<div class="prioritise_existing_edit">'
		editDiv += '<span data-icon="&#xe000" onClick="editTask('+i+')"></span>';
		editDiv += '<span data-icon="&#xe001" onClick="removeTask('+i+');"></span>';
		//editDiv += '<img src="Images/settings.png">';
		editDiv += '<span data-icon="&#xe002" onClick="completeTask('+i+')"></span>';
		editDiv += '</div>';
		
		var subj = parseInt(hmwkSubject[i]);
		subjDiv += '<div class="prioritise_subjectTab" style="background-color:'+subjectClr[subj]+';" >';
		subjDiv += subjectName[subj]+'';
		subjDiv += '</div>';
		
		document.getElementById("prioritise_existing_tasks_date").innerHTML += hmwkDueSort[a]+"<br />";
		document.getElementById("prioritise_existing_tasks_tasks").innerHTML += hmwkNameSort[a]+subjDiv+editDiv+"<br />";
	}
	
	for(b=1;b<hmwkNameC.length;b++){
		document.getElementById("prioritise_complete_tasks_date").innerHTML += hmwkDateCSort[b]+"<br />";
		document.getElementById("prioritise_complete_tasks_tasks").innerHTML += hmwkNameCSort[b]+"<br />";
	}
}

function initFixed(){
	if (window.localStorage){
		if(localStorage['fixedSaved']){ //if localStorage is already set
			retrieveFixedTaskData();
		}
	}
	
	//Browser Friendly
	fTi = getElementsByClass("prioritise_tasks_date"); 
	fTk = getElementsByClass("prioritise_tasks_tasks");
	
	for(i=0;i<fTk.length;i++){
		fTi[i].innerHTML = "";
		fTk[i].innerHTML = "";
	}
	
	//sortFixedByTime();
	
	/*
	for(a=1;a<=;a++){
		var editDiv = "";
		i = hmwkSorting[a].split("_")[1];
		
		editDiv += '<div class="prioritise_existing_edit">'
		editDiv += '<img onClick="editFixedTask('+i+')" src="Images/wrench.png">';
		editDiv += '<img onClick="removeFixedTask('+i+')"src="Images/bin.png">';
		editDiv += '</div>';
		
		document.getElementById("prioritise_existing_fixed_time").innerHTML += hmwkDueSort[a]+"<br />";
		document.getElementById("prioritise_existing_fixed_tasks").innerHTML += hmwkNameSort[a]+editDiv+"<br />";
	}*/
	
	out=out2=out3 = '';
	strtIndXYZ = Math.min(strtWkdayInd,strtWkendInd);	
	strtIND = Timetable[0][strtIndXYZ].split(":")[0];
	
	for(i=parseInt(strtIND);i<=23;i++){
		i = ((i<10)?"0":"")+i;
		out+="<option value='"+i+"'>"+i+"</option>";
		out2+="<option value='"+i+"' id='fixed_timing_hr_start_op"+i+"'>"+i+"</option>";
		out3+="<option value='"+i+"' id='fixed_timing_hr_end_op"+i+"'>"+i+"</option>";
	}
	
	document.getElementById("fixed_timings_hr_start").innerHTML = out;
	document.getElementById("fixed_timings_hr_end").innerHTML = out;
	
	document.getElementById("fixed_timings_hr_start_edit").innerHTML = out2;
	document.getElementById("fixed_timings_hr_end_edit").innerHTML = out3;
	
	for(a=0;a<fixedTasks.length;a++){
		jiaks = fixedTasks[a].split("_");
		dayWk = parseInt(jiaks[0]);	
		strt = jiaks[1];
		end = jiaks[2]; 
		name = jiaks[3];
		if(name == "<BREAK>") name = "&lt;BREAK&gt;";

		editDiv = '';
		editDiv += '<div class="prioritise_existing_edit">'
		editDiv += '<span data-icon="&#xe000" onClick="editFixedTask('+a+')"></span>';
		editDiv += '<span data-icon="&#xe001" onClick="removeFixedTask('+a+')"></span>';
		editDiv += '</div>';
		
		document.getElementById("prioritise_fixed_tasks_time_"+dayWk).innerHTML += strt+"-"+end+"<br>";
		document.getElementById("prioritise_fixed_tasks_tasks_"+dayWk).innerHTML += name+editDiv+"<br>";
	}
}

function initColorLegend(){
	out='';
	
	for(i=0;i<subjectName.length;i++){
		out += '<div class="colorLegend_subjectTab prioritise_subjectTab" style="background-color:'+subjectClr[i]+';" >';
		out += subjectName[i];
		out += '</div>';
	}
	
	out += '<div class="colorLegend_subjectTab prioritise_subjectTab" style="background-color:'+fixedTaskClr+'; width:90%" >';
	out += "Fixed Tasks";
	out += '</div>';
	
	document.getElementById('color_legend_main').innerHTML = out;	
}

function sortHmwkByDate(){
	hmwkDueSort.clear();
	hmwkNameSort.clear();
	
	hmwkDateCSort.clear();
	hmwkNameCSort.clear();
	
	for(a=1;a<=nHmwk;a++){
		hmwkSorting[a] = hmwkDue[a]+"_"+a;
	}
	
	for(a=1;a<=hmwkNameC.length;a++){
		hmwkCSorting[a] = hmwkDateC[a]+"_"+a;
	}
	
	hmwkSorting.sort();
	hmwkCSorting.sort();
		
	for(a=1;a<=nHmwk;a++){
		dte = hmwkSorting[a].split("_")[0];
		if(dte == hmwkSorting[a-1].split("_")[0]) dte = "";
		nme = hmwkName[hmwkSorting[a].split("_")[1]];
		
		hmwkDueSort[a] = dte;
		hmwkNameSort[a] = nme;
	}
	
	for(a=1;a<=hmwkNameC.length;a++){
		dte = hmwkCSorting[a].split("_")[0];
		if(dte == hmwkCSorting[a-1].split("_")[0]) dte = "";
		nme = hmwkNameC[hmwkCSorting[a].split("_")[1]];
		
		hmwkDateCSort[a] = dte;
		hmwkNameCSort[a] = nme;
	}
}

/* Should not need this: fixedTasks is automatically sorted
function sortFixedByTime(){
	fixedTimeSort.clear();
	fixedNameSort.clear();
	
	for(a=1;a<=nHmwk;a++){
		hmwkSorting[a] = fixedTimeSort[a]+"_"+a;
	}
	
	hmwkSorting.sort();
	
	for(a=1;a<=fixedTasks.length;a++){
		dte = hmwkSorting[a].split("_")[0];
		if(dte == hmwkSorting[a-1].split("_")[0]) dte = "";
		nme = hmwkName[hmwkSorting[a].split("_")[1]];
		
		hmwkDueSort[a] = dte;
		hmwkNameSort[a] = nme;
	}
}
*/

/*
function hmwkAdd(){
	for(a=0;a<nHwmk;a++){
		document.getElementById("hmwkAdd").innerHTML+='<div id="hmwk'+a+'" class="hmwkBlock"><span class="hmwkDue">'+hmwkDue[a]+'</span><span class="hmwkName">'+hmwkName[a]+'</span><span class="hmwkEdit"><img src="Images/arrow.png" id="arrow'+a+'" height="34" width="20" onClick="hmwkEdit('+a+')" onMouseOut="changeBackArrow(this.id)" onMouseOver="changeArrow(this.id)"></span><div class="hmwkExEditMenu" id="hmExEdit'+a+'" style="display:none;">'+"[ADD ICONS HERE]"+'</div></div>';
	}	
}*/

/*---------ALGORITHM PROCESSING---------------*/
var blk = 2;

var hmwkTempTime = new Array();

function Prioritise(){
	var x;
	var hmwkOldTime = hmwkTimeNeeded;
	
	priority.clear();
	prioritask.clear();
	
	hmwkTempTime = hmwkTimeNeeded;
	
	console.log(nHmwk);
	for(i=1;i<=nHmwk;i++){
		task[i] = hmwkName[i];
		
		if(hmwkTimeNeeded[i]>blk){
			var nblk = Math.ceil(hmwkTimeNeeded[i]/blk);
			var nmod = hmwkTimeNeeded[i]%blk;
			hmwkTempTime[i] = new Array("");
			for(a=0;a<nblk-1;a++){
				hmwkTempTime[i].push(blk);
			}
			if(!nmod) hmwkTempTime[i].push(nmod);
			
			importance = hmwkImpt[i]*73; //(365/5) = 73 
			urgency = 1/(parseInt(dateDiff(findTodayDate(),hmwkDue[i]))?parseInt(dateDiff(findTodayDate(),hmwkDue[i])):1);
			if(dateDiff(findTodayDate(),hmwkDue[i])<0){ //overdue already
				urgency = Math.abs(dateDiff(findTodayDate(),hmwkDue[i]))+0.5;
			}
			
			dec=0.1;
			for(a=0;a<nblk;a++){
				dec+=(a*dec+1);
				
				priority.push(getPriority(importance,urgency)-dec+"_"+importance+"_"+i+"."+parseInt(a+1)); 
				//sort first by priority, then by importance. Task id for reference later only.	
			}
		}
		else{
			importance = hmwkImpt[i]*73; //(365/5) = 73 
			urgency = 1/(parseInt(dateDiff(findTodayDate(),hmwkDue[i]))?parseInt(dateDiff(findTodayDate(),hmwkDue[i])):1);
			if(dateDiff(findTodayDate(),hmwkDue[i])<0){ //overdue already
				urgency = Math.abs(dateDiff(findTodayDate(),hmwkDue[i]))+0.5;
			}
			
			priority.push(getPriority(importance,urgency)+"_"+importance+"_"+i); 
			//sort first by priority, then by importance. Task id for reference later only.
			//hmwkTempTime.push(hmwkTimeNeeded[i]);
		}
	}
	
	hmwkTimeNeeded = hmwkOldTime;
	
	priority.reverse_sort();
	//console.log("New priority: "+priority);
	
	for(i=0;i<priority.length;i++){
		x = priority[i].split("_")[2];
		if(x != parseInt(x)){ //_._
			tempx = x;
			x = parseInt(tempx.split(".")[0]);
			y = parseInt(tempx.split(".")[1]);
			tme = hmwkTempTime[x][y];
			//console.log(tempx+" "+y+" "+tme);
		}
		else{
			tme = hmwkTempTime[x];
			/*if(tme=="undefined" || tme==null){
				tme = 1;
			}*/
		}
		
		prioritask.push(task[parseInt(x)]+"_"+tme+"_"+x);
	}
}

/*-----------REV PROCESSING-------------*/
function initRev(){
	document.getElementById("prioritise_existing_tasks_date").innerHTML = "";
	document.getElementById("prioritise_existing_tasks_tasks").innerHTML = "";

	document.getElementById("prioritise_complete_tasks_date").innerHTML = "";
	document.getElementById("prioritise_complete_tasks_tasks").innerHTML = "";
	
	//sortHmwkByDate();

	for(a=1;a<revision.length;a++){
		for(b=1;b<revision[a].length;b++){
			var editDiv = "";
			var subjDiv = "";
			//console.log(a+" "+b);
			//impt, tme, top, subj
			impt = revision[a][b].split("_")[0];
			dy = daysOfWeek[a];
			nme = revision[a][b].split("_")[2];
			id = revision[a][b].split("_")[3];
			
			editDiv = '';
			editDiv += '<div class="prioritise_existing_edit">'
			editDiv += '<span data-icon="&#xe000" onClick="editRev('+a+','+b+')"></span>';
			editDiv += '<span data-icon="&#xe001" onClick="removeRev('+a+','+b+')"></span>';
			//editDiv += '<img src="Images/settings.png">';
			editDiv += '<span data-icon="&#xe002" onClick="completeRev('+a+','+b+')"></span>';
			editDiv += '</div>';
							
			var subj = id;
			subjDiv += '<div class="prioritise_subjectTab" style="background-color:'+subjectClr[subj]+';" >';
			subjDiv += subjectName[subj]+'';
			subjDiv += '</div>';
			
			document.getElementById("prioritise_existing_tasks_date").innerHTML += dy+"<br />";
			document.getElementById("prioritise_existing_tasks_tasks").innerHTML += nme+subjDiv+editDiv+"<br />";
		}
	}
	
	for(b=1;b<revNameC.length;b++){
		document.getElementById("prioritise_complete_tasks_date").innerHTML += revDateC[b]+"<br />";
		document.getElementById("prioritise_complete_tasks_tasks").innerHTML += revNameC[b]+"<br />";
	}
}

function completeRev(a,b,tmtable){
	if(tmtable==null)tmtable=false;
	
	t = confirm("Are you sure you want to set this revision as complete?");
	if(!t) return;
	
	//console.log(revision[a][b]);
	
	nme = revision[a][b].split("_")[2];
	dte = findTodayDate();
	
	revNameC.push(nme);
	revDateC.push(dte);
	
	removeRev(a,b,false,tmtable); //init has been done in removeTask()
	//if(tmtable)removeTaskFromTimetable(a,i);
}

function removeRev(a,b,alr,tmtable){
	if(tmtable==null) tmtable = false;
	
	if(alr==null || alr==true){
		t = confirm("Are you sure you want to remove this task?");
		if(!t) return;
	}
	
	revision[a].splice(b,1);
	//console.log(tmtable);
	if(!tmtable){
		initRev();
	}

	saveRevData();
	if(tmtable){
		reschedule();
		scheduleTimelineShow();	
	}
}

function editRev(a,b,tmtable){
	if(tmtable==null) tmtable=false;
	
	if(revision[a][b] == rem){
		jiaks = revisionOld[a][b].split("_");
	}
	else{
		jiaks = revision[a][b].split("_");
	}
	
	revImpt = jiaks[0];
	revTme = jiaks[1];
	revNme = jiaks[2];
	revSubj = jiaks[3];
	
	document.getElementById("revEditTopic").value = revNme;
	
	thr = parseInt(revTme);
	tmin = (revTme-thr)*60;
	document.getElementById("revEditTimeH").value = (thr)?thr:"";
	document.getElementById("revEditTimeM").value = (tmin)?tmin:"";
	
	document.getElementById("revEditImpt_op"+revImpt).selected = true;
	document.getElementById("revEditSubject_op"+revSubj).selected = true;
	
	
	//document.getElementById("revEditDone").setAttribute("onclick","processRevEdit("+a+","+b+");");
	document.getElementById("revEditDone").onclick = function(){processRevEdit(a,b,tmtable);};

	/*
	for(i=0;i<document.getElementsByClassName("appear").length;i++){
		document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
	}
	//*/

	revEditNew();
}

function processRevEdit(a,b,tmtable){
	if(tmtable==null){
		tmtable = false;
	}
	
	//i = revision.length;
	topc = document.getElementById("revEditTopic").value;
	
	//console.log(top+" "+topc.length);
	
	if(topc.length>0){}
	else {
		alert("Topic not filled in!");
		return;	
	}
	
	val1 = document.getElementById("revEditTimeH").value;
	val2 = document.getElementById("revEditTimeM").value;
		
	if(val2>=30) val2 = 30;
	else val2 = 0;
	
	val2+="";
		
	if(val1.length>0 && val2.length>0) tme = parseInt(val1) + parseFloat(val2/60);
	else if(val1.length>0){
		tme = parseInt(val1);
	}
	else if(val2.length>0){
		tme = parseFloat(val2/60);
	}
	else{
		//i--;
		alert("Time Needed not filled in!");
		return;
	}
	
	var ele = document.getElementById("revEditImpt");
	impt = parseInt(ele.options[ele.selectedIndex].value);
	
	var ele = document.getElementById("revEditSubject");
	subj = parseInt(ele.options[ele.selectedIndex].value);
	
	var ele = document.getElementById("revEditDay");
	dy = parseInt(ele.options[ele.selectedIndex].value);
	
	if(a!=dy){ //difft day means we need to reset stuff			
		//Push into rev array
		revision[dy].push(impt+"_"+tme+"_"+topc+"_"+subj);
		revision[dy].reverse_sort();
		revision[dy].remove("");
		//revision[dy].remove(rem);
		revision[dy].unshift("");
		//console.log(a+" "+b);
		revision[a].splice(b,1);
	}
	else{
		revision[a][b] = impt+"_"+tme+"_"+topc+"_"+subj;
	
		/*
		revision[dy].reverse_sort();
		revision[dy].remove("");
		//revision[dy].remove(rem);
		revision[dy].unshift("");	
		*/
	}
	
	revEditNew();
	//initRev();
	saveRevData();
	
	if(tmtable){
		reschedule();
		scheduleTimelineShow();	
	}
}

function revNew(){
	if(document.getElementById("revNewMenu").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("revNewMenu").className += " appear";
		//document.getElementById("revNewMenu").style.display = "block";
		//document.getElementById("revPlusIcon").src = "Images/minus.png";
	   	document.getElementById("prioritise_add_btn_txt").innerHTML = "Cancel";
	}
	else{
		document.getElementById("revNewMenu").className = document.getElementById("revNewMenu").className.replace(" appear","");
		//document.getElementById("revNewMenu").style.display = "none";
		//document.getElementById("revPlusIcon").src = "Images/plus.png";
    	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
	}	 
}

function revEditNew(){
	if(document.getElementById("revEditMenu").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("revEditMenu").className += " appear";
	}
	else{
		document.getElementById("revEditMenu").className = document.getElementById("revEditMenu").className.replace(" appear","");
	}//	*/
	
	//document.getElementById("revPlusIcon").src = "Images/plus.png";
  	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
}

var topc,tme,subj,impt,dy;

function processRev(args){		
	//i = revision.length;
	if(args==null) topc = document.getElementById("revTopic").value;
	else topc = args['name'];
	
	//console.log(top+" "+topc.length);
	
	if(topc.length>0){}
	else {
		alert("Topic not filled in!");
		return;	
	}
	
	if(args==null){
		val1 = document.getElementById("revTimeH").value;
		val2 = document.getElementById("revTimeM").value;
			
		if(val2>=30) val2 = 30;
		else val2 = 0;
		val2+="";
			
		if(val1.length>0 && val2.length>0) tme = parseInt(val1) + parseFloat(val2/60);
		else if(val1.length>0){
			tme = parseInt(val1);
		}
		else if(val2.length>0){
			tme = parseFloat(val2/60);
		}
		else{
			//i--;
			alert("Time Needed not filled in!");
			return;
		}
	}
	else{
		tme = args['time'];	
	}
	
	var ele = document.getElementById("revImpt");
	impt = parseInt(ele.options[ele.selectedIndex].value);
	if(args!=null) impt = args['impt'];
	
	var ele = document.getElementById("revSubject");
	subj = parseInt(ele.options[ele.selectedIndex].value);
	if(args!=null) subj = args['subj'];
	
	var ele = document.getElementById("revDay");
	dy = parseInt(ele.options[ele.selectedIndex].value);
	if(args!=null){
		var currTime = new Date();
		var currTimez = new Date(currTime.getTime()+args['day']*24*60*60*1000);
		
		dy = currTimez.getDay();
	}
	
	//alert("WHY WHY WHY");
	//Push into rev array
	revision[dy].push(impt+"_"+tme+"_"+topc+"_"+subj);
	revision[dy].reverse_sort();
	revision[dy].remove("");
	//revision[dy].remove(rem);
	revision[dy].unshift("");
	
	revNew();
	//initRev();
	saveRevData();
}

/*------------FIXED PROCESSING------------*/
function removeFixedTask(i,alr){
	if(alr==null){
		t = confirm("Are you sure you want to remove this task?");
		if(!t) return;
	}
	
	fixedTasks.splice(i,1);
	saveFixedTaskData();
	//initFixed();
}

function editFixedTask(i,tmtable){
	if(tmtable==null)tmtable=false;
	jiaks = fixedTasks[i].split("_");
	dayWk = jiaks[0];
	strt = jiaks[1];
	strtHr = strt.split(":")[0];
	strtMin = strt.split(":")[1];
	end = jiaks[2];
	endHr = end.split(":")[0];
	endMin = end.split(":")[1];
	nme = jiaks[3];
	//timeTotal = jiaks[4];
	type = jiaks[5];

	document.getElementById("fixed_name_edit").value = nme;
	
	document.getElementById("daysOfWk_op"+dayWk).selected = true;
	
	console.log(nme+" "+type);
	if(type=="fixed"){
		document.getElementById("fixed_break_edit").checked = false;
	}
	else{
		document.getElementById("fixed_break_edit").checked = true;
		document.getElementById('fixed_name_edit').disabled=true;
	}
	
	document.getElementById("fixed_timing_hr_start_op"+strtHr).selected = true;
	document.getElementById("fixed_timing_min_start_op"+strtMin).selected = true;
	document.getElementById("fixed_timing_hr_end_op"+endHr).selected = true;
	document.getElementById("fixed_timing_min_end_op"+endMin).selected = true;

	
	//document.getElementById("revEditDone").setAttribute("onclick","processRevEdit("+a+","+b+");");
	document.getElementById("fixed_edit_done").onclick = function(){processFixedEdit(i,tmtable);};
	
	fixedEditNew();
}

function processFixedEdit(i,tmtable){
	dayWk = getDayFixedTasksEdit();
	//alert(dayWk);
	
	var ele = document.getElementById("fixed_timings_hr_start_edit");
	var ele2 = document.getElementById("fixed_timings_min_start_edit");
	var hrzS = ele.options[ele.selectedIndex].value;
	var minzS = ele2.options[ele2.selectedIndex].value;
	
	strt = hrzS+":"+minzS;	
	
	var ele = document.getElementById("fixed_timings_hr_end_edit");
	var ele2 = document.getElementById("fixed_timings_min_end_edit");
	
	var hrzE = ele.options[ele.selectedIndex].value;
	var minzE = ele2.options[ele2.selectedIndex].value;
	
	end = hrzE+":"+minzE;
	
	timeTotal = parseInt(hrzE)+parseFloat(minzE/60);
	timeTotal -= parseInt(hrzS)+parseFloat(minzS/60);
	
	name = document.getElementById("fixed_name_edit").value;
	
	if(document.getElementById("fixed_break_edit").checked){
		type="break";
		name = "<BREAK>";
	}
	else type = "fixed";
	
	//check if day changed
	fixedTasks[i] = dayWk+"_"+strt+"_"+end+"_"+name+"_"+timeTotal+"_"+type;
	fixedTasks.sort();
	
	out="";

	fixedTasks = fixedTasks.removeDup();
	
	saveFixedTaskData();
	//initFixed();
	if(document.getElementById("hmwkEditMenu").className.indexOf("appear")==-1){
		fixedEditNew();
	}
	//fixedEditNew();
	
	if(tmtable){
		reschedule();
		scheduleTimelineShow();	
	}
}

/*----------EDITABLE TIMETABLE-----------*/


/*-------------EVENTS PROCESSING------------*/
var events = new Array(); 
//name_strt_end_date_notes 
var eventsC = new Array(); 
  
function initEvent(){ 
    if(localStorage['eventsSaved']){
		retrieveEventsData();
	}
	
	//Init Events Output if there are no events
  	document.getElementById("events_existing_date").innerHTML = "";
	document.getElementById("events_existing_name").innerHTML = "<i>No Upcoming Events</i>";

	document.getElementById("events_complete_date").innerHTML = "";
	document.getElementById("events_complete_name").innerHTML = "<i>No Complete Events</i>";
	
	//Check which events are over
	for(a=0;a<events.length;a++){	
		dteE = events[a].split("_")[0];
		strtE = events[a].split("_")[1];
		endE = events[a].split("_")[2];
		nmeE = events[a].split("_")[3];
		notesE = events[a].split("_")[4];
			
		todayDate = findTodayDate();
		if(parseInt(dateDiff(todayDate,dteE))<0){
			eventsC.push(events[a]);
			events.splice(a,1);
		}
	}
	eventsC.sort();
	
	saveEventsData();
	
	//Existing Events
	out = out2 = prevDte = '';
	for(a=0;a<events.length;a++){
		var editDiv = "";
		//dte+"_"+strt+"_"+end+"_"+nme+"_"+notes
		dteE = events[a].split("_")[0];
		strtE = events[a].split("_")[1];
		endE = events[a].split("_")[2];
		nmeE = events[a].split("_")[3];
		notesE = events[a].split("_")[4];
		
		//Reprocess date
		var dteSp = dteE.split("-");
		
		var yrSp = dteSp[0].split("");
		var shrtYr = yrSp[yrSp.length-2]+yrSp[yrSp.length-1];
		var dy = ((dteSp[2].length<2)?0:"")+dteSp[2];
		
		var dte = dy+" "+getShort(monthNameJS[parseInt(dteSp[1]-1)])+" "+shrtYr;	
		dteO = (dte==prevDte)?"":dte;
		
		/*
		editDiv += '<div class="prioritise_existing_edit">'
		editDiv += '<img onClick="editTask('+i+')" src="Images/wrench.png">';
		editDiv += '<img onClick="removeTask('+i+')"src="Images/bin.png">';
		//editDiv += '<img src="Images/settings.png">';
		editDiv += '<img src="Images/done.png" onClick="completeTask('+i+')">';
		editDiv += '</div>';
		//*/
		
		out += dteO+"<br />";
		out2 += nmeE+editDiv+"<br />";
	}
	document.getElementById("events_existing_date").innerHTML = out;
	document.getElementById("events_existing_name").innerHTML = out2;
	
	//Complete Events
	prevDte = out = out2 = '';
	for(b=0;b<eventsC.length;b++){
		dteC = eventsC[b].split("_")[0];
		nmeC = eventsC[b].split("_")[3];
		
		//Reprocess date
		var dteSp = dteC.split("-");
		
		var yrSp = dteSp[0].split("");
		var shrtYr = yrSp[yrSp.length-2]+yrSp[yrSp.length-1];
		var dy = ((parseInt(dteSp[2])<10)?0:"")+dteSp[2];
		
		var dte = dy+" "+getShort(monthNameJS[parseInt(dteSp[1]-1)])+" "+shrtYr;	
		dteO = (dte==prevDte)?"":dte;
		
		out += dteO+"<br />";
		out2 += nmeC+"<br />";
		
		prevDte = dte;		
	}
	document.getElementById("events_complete_date").innerHTML = out;
	document.getElementById("events_complete_name").innerHTML = out2;
} 
  
function processEvent(){ 
    nme = document.getElementById("event_name").value; 
    notes = document.getElementById("event_notes").value; 
      
    if(nme.length>0) hmwkName[i] = val; 
    else{ 
        alert("Name not filled in!"); 
        return;  
    } 
      
    var val = document.getElementById("eventDeadline").innerHTML; 
      
    todayDate = findTodayDate(); 
	  
    if(val == "Show Calendar") { 
        alert("Deadline set automatically to tomorrows's date"); 
        val = findTomorrowDate(); 
    } 
    dte = val; 
      
    var ele = document.getElementById("event_timings_hr_start"); 
    var ele2 = document.getElementById("event_timings_min_start"); 
    strt = ele.options[ele.selectedIndex].value+":"+ele2.options[ele2.selectedIndex].value; 
      
    var ele = document.getElementById("event_timings_hr_end"); 
    var ele2 = document.getElementById("event_timings_min_end"); 
    end = ele.options[ele.selectedIndex].value+":"+ele2.options[ele2.selectedIndex].value; 
    
	//go find a way to get ids (nEvents?).
	
    events.push(dte+"_"+strt+"_"+end+"_"+nme+"_"+notes); 
	events.sort();
    eventNew();
	
	saveEventsData();
	initEvent();
} 
  
function eventNew(){ 
    if(document.getElementById("eventNewMenu").className.indexOf("appear")==-1){
		
		document.getElementById("eventNewMenu").className += " appear";
		//document.getElementById("hmwkNewMenu").style.display = "block";
		//document.getElementById("hmwkPlusIcon").src = "Images/minus.png";
	   	document.getElementById("addEventBtn").innerHTML = "Cancel";
	}
	else{
		document.getElementById("eventNewMenu").className = document.getElementById("eventNewMenu").className.replace(" appear","");
		//document.getElementById("hmwkNewMenu").style.display = "none";
	//	document.getElementById("hmwkPlusIcon").src = "Images/plus.png";
    	document.getElementById("addEventBtn").innerHTML = "Add Event";
	}	 
}

/*-----------HMWK PROCESSING---------*/
/*function hmwkEdit(){
	//Show and Hide
	if(document.getElementById("hmExEdit"+n).style.display == "none") document.getElementById("hmExEdit"+n).style.display = "block";
	else document.getElementById("hmExEdit"+n).style.display = "none";
}
*/
function hmwkNew(){
	if(document.getElementById("hmwkNewMenu").className.indexOf("appear")==-1){
		
		document.getElementById("hmwkNewMenu").className += " appear";
		//document.getElementById("hmwkNewMenu").style.display = "block";
	//	document.getElementById("hmwkPlusIcon").src = "Images/minus.png";
	   	document.getElementById("prioritise_add_btn_txt").innerHTML = "Cancel";
	}
	else{
		document.getElementById("hmwkNewMenu").className = document.getElementById("hmwkNewMenu").className.replace(" appear","");
		//document.getElementById("hmwkNewMenu").style.display = "none";
	//	document.getElementById("hmwkPlusIcon").src = "Images/plus.png";
    	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
	}	 
}

function hmwkEditNew(){
	if(document.getElementById("hmwkEditMenu").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("hmwkEditMenu").className += " appear";
		//document.getElementById("hmwkNewMenu").style.display = "none";
	}
	else{
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("hmwkEditMenu").className = document.getElementById("hmwkEditMenu").className.replace(" appear","");
	}
	
	//document.getElementById("hmwkPlusIcon").src = "Images/plus.png";
  	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
}

function processHmwk(args){
	nHmwk++;
	i=nHmwk;
	
	//Name
	if(args==null) val = document.getElementById("hmwkName").value;
	else val = args['name'];
	
	if(val.length>0) hmwkName[i] = val;
	else{
		nHmwk--;
		alert("Name not filled in!");
		return;	
	}
	
	//Time Needed
	if(args==null){
		val1 = document.getElementById("hmwkTimeH").value;
		val2 = document.getElementById("hmwkTimeM").value;
		
		if(val2>=30){
			val2 = 30;
		}
		else{
			val2 = 0;
		}
		val2+="";
		
		if(val1.length>0 && val2.length>0){
			hmwkTimeNeeded[i] = parseInt(val1) + parseFloat(val2/60);
		}
		else if(val1.length>0){
			hmwkTimeNeeded[i] = parseInt(val1);
		}
		else if(val2.length>0){
			hmwkTimeNeeded[i] = parseFloat(val2/60);
		}
		else{
			nHmwk--;
			alert("Time Needed not filled in!");
			return;
		}
	}
	else{
		hmwkTimeNeeded[i] = args['time'];	
	}
	
	//Deadline
	if(args==null) val = document.getElementById("hmwkDeadline").innerHTML;
	else val = findNextDayDate(args['due']);
	
	todayDate = findTodayDate();
	
	if(val == "Show Calendar" || parseInt(dateDiff(todayDate,val))<=0) {
		alert("Deadline set automatically to tomorrows's date");
		val = findTomorrowDate();
	}
	hmwkDue[i] = val;
	
	var ele = document.getElementById("hmwkImpt");
	if(args == null) hmwkImpt[i] = parseInt(ele.options[ele.selectedIndex].value);
	else hmwkImpt[i] = args['impt'];
	
	var ele = document.getElementById("hmwkSubject");
	if(args == null) hmwkSubject[i] = parseInt(ele.options[ele.selectedIndex].value);
	else hmwkSubject[i] = args['subj'];
	
	if(args == null) hmwkNotes[i] = document.getElementById("hmwkNotes").value;
	else hmwkNotes[i] = "";

	if(args == null) hmwkNew();
	//init();
	saveData();
	
	//*
	reschedule();
	scheduleTimelineShow();
	//*/
}

/*------------HMWK EDITING--------------*/
function editTask(n,tmtable){
	if(tmtable==null){
		tmtable = false;
	}
	document.getElementById("hmwkEditName").value = hmwkName[n];
	
	document.getElementById("hmwkEditNotes").value = hmwkNotes[n];
	
	thr = parseInt(hmwkTimeNeeded[n]);
	tmin = (hmwkTimeNeeded[n]-thr)*60;
	document.getElementById("hmwkEditTimeH").value = (thr)?thr:"";
	document.getElementById("hmwkEditTimeM").value = (tmin)?tmin:"";
	
	document.getElementById("hmwkEditDeadline").innerHTML = hmwkDue[n];
	document.getElementById("hmwkEditImpt_op"+hmwkImpt[n]).selected = true;
	document.getElementById("hmwkEditSubject_op"+hmwkSubject[n]).selected = true;
	
	document.getElementById("hmwkEditDone").onclick = function(){processEdit(n,tmtable);};
	
	hmwkEditNew();
	if(document.getElementById("hmwkEditMenu").className.indexOf("appear")==-1){
		hmwkEditNew();
	}
}

function processEdit(i,tmtable){	
	val = document.getElementById("hmwkEditName").value;
	
	if(val.length>0) hmwkName[i] = val;
	else{
		alert("Name not filled in!");
		return;	
	}
	
	val1 = document.getElementById("hmwkEditTimeH").value;
	val2 = document.getElementById("hmwkEditTimeM").value;
	if(val2>=30){
		val2 = 30;
	}
	else{
		val2 = 0;
	}
	val2+="";
	
	if(val1.length>0 && val2.length>0) hmwkTimeNeeded[i] = parseInt(val1) + parseFloat(val2/60);
	else if(val1.length>0){
		hmwkTimeNeeded[i] = parseInt(val1);
	}
	else if(val2.length>0){
		hmwkTimeNeeded[i] = parseFloat(val2/60);
	}
	else{
		alert("Time Needed not filled in!");
		return;
	}
	
	val = document.getElementById("hmwkEditDeadline").innerHTML;
	
	todayDate = findTodayDate();
	
	if(val == "Show Calendar" || parseInt(dateDiff(todayDate,val))<=0) {
		alert("Deadline set automatically to tomorrows's date");
		val = findTomorrowDate();
	}
	hmwkDue[i] = val;
	
	var ele = document.getElementById("hmwkEditImpt");
	hmwkImpt[i] = parseInt(ele.options[ele.selectedIndex].value);
	
	var ele = document.getElementById("hmwkEditSubject");
	hmwkSubject[i] = parseInt(ele.options[ele.selectedIndex].value);
	
	hmwkNotes[i] = document.getElementById("hmwkEditNotes").value;
	
	//init();
	hmwkEditNew();
	saveData();
	
	if(tmtable){
		reschedule();
		scheduleTimelineShow();
	}
}	

function completeTask(n,tmtable,j,i){
	if(tmtable == null){
		tmtable = false;	
	}
	
	if(tmtable){
		completedTaskId = n;
	}
	
	t = confirm("Are you sure you want to set this task as complete?");
	if(!t) return;	
	
	nme = hmwkName[n];
	dte = findTodayDate();
	
	hmwkNameC.push(nme);
	hmwkDateC.push(dte);
	
	removeTask(n,false,tmtable); //init has been done in removeTask()
	//if(tmtable) removeTaskFromTimetable(j,i);
}

function removeTask(n,alr,tmtable){	
	if(tmtable == null){
		tmtable = false;
	}
	if(alr==null||alr==true){
		var t = confirm("Are you sure you want to delete this task?");
		if(!t) return;
	}
	
	(nHmwk==0)? nHmwk=0 : nHmwk--;
	
	hmwkDue.splice(n,1);
	hmwkName.splice(n,1);
	hmwkTimeNeeded.splice(n,1);
	hmwkImpt.splice(n,1);
	hmwkSubject.splice(n,1);
	hmwkNotes.splice(n,1);
	
	if(!tmtable) init();
	
	saveData();
	
	if(tmtable){
		 reschedule();
		 scheduleTimelineShow();
	}
	
}

/*-------------SCHEDULE--------------*/
var hr24 = true;
var WKDAY;
var View; //1:wkday,2:wkend,3:day
var minView = 1;
var maxView = 2;

var nDays;
var strtDay; //day it starts
//strtDay-=1;

var timetableOutputId = "schedule_main";

var strtInd,endInd;
var strtWkdayInd = timeSessionIndex['14:00'];
var strtWkendInd = timeSessionIndex['09:00'];
var strtIndX;// = Math.max(strtInd,timeSessionIndex[nearestInterval()]);
var endInd = timeSessionIndex['23:00'];

var prevIds = new Array();

var boxHt = 45; //ht of normal box
var boxWidth,sessionBoxWidth;

var completedTaskId,completedRevId;

function reschedule(){
	if(localStorage['saved']){
		retrieveData();
	}
	if(localStorage['fixedSaved']){
		retrieveFixedTaskData();	
	}
	if(localStorage['revSaved']){
		retrieveRevData();
	}
	
	//reset revision
	for(a=1;a<revision.length;a++)
		for(b=1;b<revision[a].length;b++){
			revisionRem[a][b] = revision[a][b];
		}
	
	Prioritise();
	insertFixedTasks();
	freeeeSlots();
	insertIntoTimetable();
}

function changeView(inc,set){
	if(View!=3){
		View+=inc;
		if(View<minView){
			View = maxView;
		}
		else if(View>maxView){
			View = minView;
		}
	}
	
	if(set!=null){
		for(i=0;i<2;i++) document.getElementById("timelineChangeViewMenu").getElementsByTagName("li")[i].className = "";
		document.getElementById("timelineView"+set).className = "timelineCurrView";
	}
	
	if(set==1 || set==2){
		if(todayWkday == 6 || todayWkday == 7){
			set = 2;
		}
		else set = 1;
	}
	
	if(set!=null){
		View = set;
	}
	
	if(View == 3){
		dateChange(inc);
		return;
	}
	
	scheduleTime();
	scheduleTimelineShow();
	
	if(View == 1){
		jiaks = (strtIndX%2==0)?strtIndX:strtIndX+1;
		
		if(jiaks>=endInd){
			jiaks = endInd-2;
		}
	
		document.getElementById("time_"+Timetable[0][jiaks]).scrollIntoView();
	}
}

function changeViewMenu(e){
	e.stopPropagation();
	if(document.getElementById("timelineChangeViewMenu").style.display == "none"){
		openViewMenu(e);
	}
	else{
		closeViewMenu(e);
	}
}

function closeViewMenu(e){
	document.getElementById("timelineChangeViewMenu").style.display = "none";
}

function openViewMenu(e){
	document.getElementById("timelineChangeViewMenu").style.display = "block";
}

function timetableClock(currHrs,currMin){
	clockDiv = document.getElementById("timelineClock");
	
	strtHrs = Timetable[0][strtInd].split(":")[0];
	strtMin = Timetable[0][strtInd].split(":")[1];
	endHrs = Timetable[0][endInd].split(":")[0];
	endMin = Timetable[0][endInd].split(":")[1];
	var sch_tme = (currHrs-strtHrs+(currMin-strtMin)/60); 
	topz = sessionBoxHt+(sch_tme)*((boxHt+1)/(intvl*0.5))+"px";
	leftz = (todayWkday-strtDay-1)*(boxWidth)+sessionBoxWidth+"px";
		
	clockDiv.style.left = leftz;
	clockDiv.style.top = topz;
	
	//alert(currHrs+" "+endHrs);
	
	if((currHrs<=strtHrs && currMin<=strtMin) || (currHrs>=endHrs && currMin>=endMin)){
		//alert("hi");
		clockDiv.style.display = "none";
	}
	
	clockDiv.onmouseover = function(){
		
	}
}

function scheduleTime(){
	//DATE & TIME INIT	
	var currTime = new Date();
	var currTime = new Date(currTime.getTime()+dateChangeInc*24*60*60*1000);
	
	var currDay = currTime.getDate()<10?"0"+currTime.getDate():""+currTime.getDate();
	var currMon = currTime.getMonth();
	var currDayName = daysOfWeekJS[currTime.getDay()];
	var currYear = currTime.getFullYear();
	var currDate = currDay+" "+monthNameJS[currMon]+" "+currYear;
	
	var currHrs = currTime.getHours();
	var currMin = currTime.getMinutes();
	var currSec = currTime.getSeconds();
	
	currMin = currMin < 10 ? "0"+currMin:""+currMin;
	currSec = currSec < 10 ? "0"+currSec:""+currSec;
	
	//AM or PM
	var timeOfDay = (currHrs<12)?"AM":"PM";
	
	//24 or 12 hour format
	if(!hr24) currHrs = ( currHrs > 12 ) ? currHrs - 12 : currHrs;
	//Convert "0" to "12"
	currHrs = (!currHrs)?12:currHrs;
	
	currYearShort = currTime.getShortYear();
	if(View!=3){
		currDayName = dayShortForm[currDayName]+", "+currDay+" "+getShort(monthNameJS[currMon])+" "+currYearShort;	
	}
	
	if(View==1){
		currDate = "WEEKDAY VIEW";
	}
	else if(View==2){
		currDate = "WEEKEND VIEW";
	}
	
	//Output
	document.getElementById("timelineDay").innerHTML = currDayName;
	document.getElementById("timelineDate").innerHTML = currDate;
	document.getElementById("schedule_time_time").innerHTML = currHrs+":"+currMin+":"+currSec+" "+timeOfDay;
	
	timetableClock(currHrs,currMin);
	
	//Reset strtIndX
	strtIndX = Math.max(strtInd,timeSessionIndex[nearestInterval()]);
}

function scheduleTimelineShow(){
	var editDiv = "";
	
	var d = new Date();
	todayWkday = d.getDay()?d.getDay():7;
	/*
	if(tdy!=null){
		todayWkday = tdy;
	}
	//*/
	//console.log(todayWkday);
	
	var dateChangeIncz = 0;
	//console.log(todayWkday);
	//Dates for each of the days
	for(i=todayWkday;i<=7;i++){		
		var currTime = new Date();
		var currTime = new Date(currTime.getTime()+dateChangeIncz*24*60*60*1000);
		
		var currDay = currTime.getDate()<10?"0"+currTime.getDate():""+currTime.getDate();
		var currMon = currTime.getMonth();
		var currDayName = daysOfWeekJS[currTime.getDay()];
		var currYear = currTime.getFullYear();
		var currDate = currDay+" "+monthNameJS[currMon]+" "+currYear;
		
		datesOfWeek[i] = currDate;
		dateChangeIncz++;
		
		//console.log(dateChangeInc+" "+datesOfWeek);
	}
	
	for(i=1;i<todayWkday;i++){
		var currTime = new Date();
		var currTime = new Date(currTime.getTime()+dateChangeIncz*24*60*60*1000);
		
		var currDay = currTime.getDate()<10?"0"+currTime.getDate():""+currTime.getDate();
		var currMon = currTime.getMonth();
		var currDayName = daysOfWeekJS[currTime.getDay()];
		var currYear = currTime.getFullYear();
		var currDate = currDay+" "+monthNameJS[currMon]+" "+currYear;
		
		datesOfWeek[i] = currDate;
		//console.log(dateChangeInc+" "+datesOfWeek);
		dateChangeIncz++;
	}
	
	//INIT FOR WEEKDAY/WEEKEND
	if(View==1){ //Weekday
		nDays = 5;
		strtDay = 1; //starts on monday
		strtInd = strtWkdayInd;
		document.getElementById('schedule_main').className = "wkday";
		console.log("Weekday View");
	}
	else if(View==2){ //Weekend
		nDays = 2;
		strtDay = 6; //starts on sat
		strtInd = strtWkendInd;
		document.getElementById('schedule_main').className = "wkend";
		console.log("Weekend View");
	}
	else if(View==3){ //Day view
		nDays = 1;
		document.getElementById('schedule_main').className = "daily";
		
	}
	strtDay-=1;
	
	var hrintvl = 1; //in hrs
	intvl = parseFloat(hrintvl)*2;
	
	var out = '';
	sessionBoxWidth = getDimSessionBox('w'); //can be w,width
	sessionBoxHt = getDimSessionBox('h'); //can be h,height,ht
	boxWidth = getWidthTimetableBox();
	
	/*
	if(hrintvl == 1) dec = intvl;
	else dec = 0;
	//*/
	dec = intvl;
	var zinx = 10;
	
	console.log(View);
	
	if(View==3){
		var d = new Date();
		var d = new Date(d.getTime()+(dateChangeInc)*24*60*60*1000);
		
		strtDay = d.getDay()?d.getDay():7;

		strtInd = (strtDay==6||strtDay==7)?timeSessionIndex['09:00']:timeSessionIndex['14:00'];
		document.getElementById('schedule_main').className = "daily";
		strtDay-=1;
	}
	
	for(i=strtInd-dec,i2=strtInd-dec;i<endInd;i++){ //timeSessions
		zinx++;
		if(i!=i2 || hrintvl!=1){
			i2+=intvl;
		}
		//alert(i+" "+i2);
		for(j=strtDay;j<=nDays+strtDay;j++){
			if(i==strtInd-dec && j == strtDay){ //First (empty) box
				out+="<div class='timetable_sessionInt'>Date<br />Time</div>";
			}
			else if(j==strtDay){ //Session Interval
				if(i==i2 || hrintvl!=1){
					if((i+intvl)>endInd){
						out+="<div id='time_"+Timetable[0][i]+"' class='timetable_sessionInt' style='height:"+parseInt(boxHt)+"px;'>"+Timetable[0][i]+"<br>TMR</div>";
					}
					else{
						out+="<div id='time_"+Timetable[0][i]+"' class='timetable_sessionInt' style='height:"+parseInt(boxHt)+"px;'>"+Timetable[0][i]+"<br>"+Timetable[0][i+intvl]+"</div>";
					}
				}
			}
			else if(i==strtInd-dec){ //Day
				if(j==todayWkday){
					out+="<div class='timetable_dayToday'>"+daysOfWeek[j]+"<br>"+datesOfWeek[j]+"</div>";
				}
				else{
					out+="<div>"+daysOfWeek[j]+"<br>"+datesOfWeek[j]+"</div>";
				}
			}
			else{
				taskz = Timetable[j][i];
			
				if(taskz.indexOf("fixed_")!=-1){ //task is a fixed task and is not homework task		
					taskzTemp = taskz.split("fixed_")[1];
					taskz = taskzTemp.split("_")[0];
					tme = taskzTemp.split("_")[1];
					id = taskzTemp.split("_")[2];
					
					if(i>(strtInd-dec) && Timetable[j][i] == Timetable[j][i-1]){ //if the task is the same as before
						if(i==i2 || hrintvl!=1){
							if(j == todayWkday){
								out+="<div class='timetable_empty timetable_dayToday' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";
							}
							else {
								out+="<div class='timetable_empty' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";	
							}
						}
						continue;
					}
					
					editDiv = '';
					editDiv += '<div class="schedule_edit">'
					editDiv += '<span data-icon="&#xe000" onClick="editFixedTask('+id+',true)"></span>';
					editDiv += '<span data-icon="&#xe001" onClick="removeFixedTask('+id+',true,true)"></span>';
					//editDiv += '<img src="Images/settings.png">';
					editDiv += '</div>';

					topz = sessionBoxHt+(timeSessionIndex[Timetable[0][i]]-strtInd)*((boxHt+1)/intvl)+"px";
					leftz = (j-strtDay-1)*(boxWidth-0.5)+sessionBoxWidth+"px";
					bgClr = fixedTaskClr;
					
					//Set height of box
				  	if(hrintvl == 0.5){ //1/2 hr intvl
						ht = (boxHt*tme*2)+"px";
					}
					else{ //1hr intvl
						ht = (boxHt*tme)+"px";
					}
					
					out+="<div class='timetable_fixed' style='background-color:"+bgClr+"; height:"+ht+";top:"+topz+"; width:"+boxWidth+"px; z-index:"+zinx+";left:"+leftz+"; '>"+editDiv+taskz+"</div>";
				}
				else if(taskz.indexOf("break_")!=-1){
					taskzTemp = taskz.split("break_")[1];
					taskz = taskzTemp.split("_")[0];
					tme = taskzTemp.split("_")[1];
					id = taskzTemp.split("_")[2];
					
					if(i>(strtInd-dec) && Timetable[j][i] == Timetable[j][i-1]){ //if the task is the same as before
						if(i==i2 || hrintvl!=1){
							if(j==todayWkday){
								out+="<div class='timetable_empty timetable_dayToday' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";		
							}
							else{
								out+="<div class='timetable_empty' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";
							}
						}
						continue;
					}

					editDiv = '';
					editDiv += '<div class="schedule_edit">'
					editDiv += '<span data-icon="&#xe000" onClick="editFixedTask('+id+',true)"></span>';
					editDiv += '<span data-icon="&#xe001" onClick="removeFixedTask('+id+',true,true)"></span>';
					//editDiv += '<img src="Images/settings.png">';
					editDiv += '</div>';
					
					topz = sessionBoxHt+(timeSessionIndex[Timetable[0][i]]-strtInd)*((boxHt+1)/intvl)+"px";
					leftz = (j-strtDay-1)*(boxWidth-0.5)+sessionBoxWidth+"px";
					//bgClr = "grey";
					
					//Set height of box
				  	if(hrintvl == 0.5){ //1/2 hr intvl
						ht = (boxHt*tme*2)+"px";
					}
					else{ //1hr intvl
						ht = (boxHt*tme)+"px";
					}
					
					bgClr = fixedTaskClr;
					out+="<div class='timetable_break' style='height:"+ht+"; width:"+boxWidth+"px; z-index:"+zinx+"; top:"+topz+"; left:"+leftz+"; background:"+bgClr+";'>"+editDiv+taskz+"</div>";
				}
				else if(taskz.indexOf("rev_")!=-1){
					taskzTemp = taskz.split("rev_")[1];
					taskz = taskzTemp.split("_")[0];
					tme = taskzTemp.split("_")[1];
					subj = taskzTemp.split("_")[2];
					iz = taskzTemp.split("_")[3];
					
					if(i>(strtInd-dec) && Timetable[j][i] == Timetable[j][i-1]){ //if the task is the same as before
						if(i==i2 || hrintvl!=1){
							if(j == todayWkday){
								out+="<div class='timetable_empty timetable_dayToday' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";
							}
							else {
								out+="<div class='timetable_empty' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";	
							}
						}
						continue;
					}
					
					//Positioning
					topz = sessionBoxHt+(timeSessionIndex[Timetable[0][i]]-strtInd)*((boxHt+1)/intvl)+"px";
					leftz = (j-strtDay-1)*(boxWidth-0.5)+sessionBoxWidth+"px";
					
					//Edit Div
					editDiv = '';
					editDiv += '<div class="schedule_edit">'
					editDiv += '<span data-icon="&#xe000" onClick="editRev('+j+','+iz+',true)"></span>';
					editDiv += '<span data-icon="&#xe001" onClick="removeRev('+j+','+iz+',true,true)"></span>';
					//editDiv += '<img src="Images/settings.png">';
					editDiv += '<span data-icon="&#xe002" onClick="retrieveRevData();completeRev('+j+','+iz+',true,'+i+')"></span>';
					editDiv += '</div>';
										
					//Set height of box
				  	if(hrintvl == 0.5){ //1/2 hr intvl
						ht = (boxHt*tme*2)+"px";
					}
					else{ //1hr intvl
						ht = (boxHt*tme)+"px";
					}
					
					out+="<div class='timetable_rev "+gradType+"' style='background-color:"+subjectClr[subj]+"; color:"+subjectTxtClr+"; height:"+ht+"; width:"+boxWidth+"px; z-index:100; top:"+topz+";left:"+leftz+";' onMouseOver='showRevInfo(event,"+j+","+iz+",this);' onMouseOut='hideRevInfo();'>"+editDiv+"REV: "+taskz+"</div>";
				}
				else if(taskz.indexOf("task_")!=-1){ //task is a homework task
					var overdueDiv = '';
					taskzTemp = taskz;
					
					typ = taskzTemp.split("_")[0];
					taskz = taskzTemp.split("_")[1];
					id = parseInt(taskzTemp.split("_")[2]);
					tme = parseFloat(taskzTemp.split("_")[3]);
					overdue = taskzTemp.split("_")[4];
					
					if(completedTaskId!=null && completedTaskId<id){
						id--;
					}
					
					if(i>(strtInd-dec)){ //prep to check Timetable row before current
						prevID = Timetable[j][i-1].split("_")[2];
						if(Timetable[j][i-1].indexOf(typ+"_")!=-1 && prevID == id){ //if the task is the same as before and task type is the same
							if(i==i2 || hrintvl!=1){
								if(j==todayWkday){
									out+="<div class='timetable_empty timetable_dayToday' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";		
								}
								else{
									out+="<div class='timetable_empty' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";
								}
							}
							if(Timetable[j][i-1]==Timetable[j][i]) continue;
							else{ //Split task that ended up together
								topz = sessionBoxHt+(timeSessionIndex[Timetable[0][i]]-strtInd)*((boxHt+1)/intvl)+"px";
								leftz = (j-strtDay-1)*(boxWidth-0.5)+sessionBoxWidth+"px";
								
								if(hrintvl == 0.5){ //1/2 hr intvl
									ht = ((boxHt)*tme*2)+"px";
								}
								else{ //1hr intvl
									ht = ((boxHt)*tme)+"px";
								}
								
								overdueDiv = (overdue)?" overdueAlert":"";
								
								out+="<div class='timetable_task"+overdueDiv+"' onMouseOver='showTaskInfo(event,"+id+",this);' onMouseOut='hideTaskInfo();' style='background-color:"+subjectClr[hmwkSubject[id]]+"; border-top:0px; height:"+ht+"; width:"+boxWidth+"px; z-index:"+zinx+";left:"+leftz+";top:"+topz+";'></div>";
								continue;
							}
						}
					}
					
					//Set height of box
					if(hrintvl == 0.5){ //1/2 hr intvl
						ht = ((boxHt)*tme*2)+"px";
					}
					else{ //1hr intvl
						ht = ((boxHt)*tme)+"px";
					}
					//lnht = (boxHt*hmwkTimeNeeded[id])*20+"px";
					
					//fontSz = scaleFontSizeToFit(boxWidth,ht,taskz)+"px";
					
					//out+="<div class='timetable_task' style='background-color:"+subjectClr[hmwkSubject[id]]+"; height:"+ht+"; z-index:100;'><span>"+taskz+"</span></div>";
					//*
					
					//Edit Div
					/*
					editDiv+="<div class='timetable_editComplete' onclick='completeTask("+id+",true,"+j+","+i+");'>";
					editDiv+="<img src='Images/doneBtn.png' />"
					editDiv+="</div>";
					*/

					editDiv = '';
					editDiv += '<div class="schedule_edit">'
					editDiv += '<span data-icon="&#xe000" onClick="editTask('+id+',true)"></span>';
					editDiv += '<span data-icon="&#xe001" onClick="removeTask('+id+',true,true)"></span>';
					//editDiv += '<img src="Images/settings.png">';
					editDiv += '<span data-icon="&#xe002" onClick="completeTask('+id+',true,'+j+','+i+')"></span>';
					editDiv += '</div>';

					//Positioning
					topz = sessionBoxHt+(timeSessionIndex[Timetable[0][i]]-strtInd)*((boxHt+1)/intvl)+"px";
					leftz = (j-strtDay-1)*(boxWidth-0.5)+sessionBoxWidth+"px";
					
					overdueDiv = (overdue)?" overdueAlert":"";
					out+="<div class='timetable_task "+gradType+overdueDiv+"' style='background-color:"+subjectClr[hmwkSubject[id]]+"; color:"+subjectTxtClr+"; height:"+ht+"; width:"+boxWidth+"px; z-index:"+zinx+";left:"+leftz+";top:"+topz+";' onMouseOver='showTaskInfo(event,"+id+",this);' onMouseOut='hideTaskInfo();'>"+editDiv+"<span>HW: "+taskz+"</span></div>";
					
					//out+="<div class='timetable_task' style='background-color:"+subjectClr[hmwkSubject[id]]+"; height:"+ht+"; z-index:100;'><span>"+taskz+"</span></div>";
					
					//prevIds.push(id);
					//*/
				}

				if(i==i2){ //output empty div
					if(j==todayWkday){
						out+="<div class='timetable_empty timetable_dayToday' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";		
					}
					else{
						out+="<div class='timetable_empty' style='height:"+boxHt+"px;'>&lt;EMPTY&gt;</div>";
					}
				}
			}
		}		
	}
	
	//Timeline clock
	out+="<div id='timelineClock'> </div>";	
	
	document.getElementById(timetableOutputId).innerHTML = out;
}

var imptFull = {
	0.5:"Optional",
	1:"V. Low",
	2:"Low",
	3:"Medium",
	4:"High",
	5:"V. High"
};

function showTaskInfo(e,id,obj){
	e.stopPropagation();
	document.getElementById("schedule_infoBox").className += " appear";
	
	//*
	var offsetT = obj.offsetTop;
	var offsetL = obj.offsetLeft;
	offsetT -= obj.offsetHeight/2;
	offsetL += obj.offsetWidth/4;
	document.getElementById("schedule_infoBox").style.top = offsetT+"px";
	document.getElementById("schedule_infoBox").style.left = offsetL+"px";
	
	//console.log("Top:"+obj.offsetTop+" Left:"+obj.offsetLeft+" T:"+offsetT+" L:"+offsetL);
	//*/
	
	document.getElementById("schedule_info_name").innerHTML = hmwkName[id];
	document.getElementById("schedule_info_due").innerHTML = hmwkDue[id];
	document.getElementById("schedule_info_timeNeeded").innerHTML = hmwkTimeNeeded[id]+" h";
	document.getElementById("schedule_info_impt").innerHTML = imptFull[hmwkImpt[id]];
	document.getElementById("schedule_info_notes").innerHTML = (hmwkNotes[id].length>0)?hmwkNotes[id]:"<i>No notes added</i>";
}

function hideTaskInfo(){
	document.getElementById("schedule_infoBox").className = document.getElementById("schedule_infoBox").className.replace(" appear","");
	
	document.getElementById("schedule_infoBox").style.top = "-1000px";
}

function showRevInfo(event,a,b,obj){
	event.stopPropagation();
	//alert("a");
	
	//*
	var offsetT = obj.offsetTop;
	var offsetL = obj.offsetLeft;
	offsetT -= obj.offsetHeight/2;
	offsetL += obj.offsetWidth/4;
	document.getElementById("schedule_infoBox_rev").style.top = offsetT+"px";
	document.getElementById("schedule_infoBox_rev").style.left = offsetL+"px";
	
	//console.log("Top:"+obj.offsetTop+" Left:"+obj.offsetLeft+" T:"+offsetT+" L:"+offsetL);
	//*/
	
	dy = daysOfWeek[a];
	
	x = revision[a][b];
	//console.log(a+" "+b);
	//if(x == rem){
	//	x = revisionOld[a][b];
	//}
	impt = x.split("_")[0];
	tme = x.split("_")[1];
	nme = x.split("_")[2];
	
	document.getElementById("schedule_infoBox_rev").className += " appear";
	
	document.getElementById("schedule_info_name_rev").innerHTML = nme;
	document.getElementById("schedule_info_day_rev").innerHTML = dy;
	document.getElementById("schedule_info_timeNeeded_rev").innerHTML = tme+" h";
	document.getElementById("schedule_info_impt_rev").innerHTML = imptFull[impt];
}

function hideRevInfo(){
	document.getElementById("schedule_infoBox_rev").className = document.getElementById("schedule_infoBox_rev").className.replace(" appear","");
	
	document.getElementById("schedule_infoBox_rev").style.top = "-1000px";
}

function removeTaskFromTimetable(j,i){
	Timetable[j].replaceWith(Timetable[j][i],"");

	saveTimetableData();	
	scheduleTimelineShow();
}

function getWidthTimetableBox(){
	document.getElementById("schedule_main").innerHTML = "<div class='timetable_empty'>a</div>";
	w = document.getElementsByClassName("timetable_empty")[0].offsetWidth;
	document.getElementById("schedule_main").innerHTML = "";
	return w;
}

function getDimSessionBox(dimType){
	document.getElementById("schedule_main").innerHTML = "<div class='timetable_sessionInt'>a<br>a</div>";
	w = document.getElementsByClassName("timetable_sessionInt")[0].offsetWidth;
	h = document.getElementsByClassName("timetable_sessionInt")[0].offsetHeight;
	document.getElementById("schedule_main").innerHTML = "";
	if(dimType == 'w' || dimType == 'width' || dimType == 'wth'){
		return w;
	}
	else if(dimType == 'h' || dimType == 'height' || dimType == 'ht'){
		return h;
	}
	else{
		return 0;	
	}
}

function dateChange(increment){
	dateChangeInc+=increment;
	
	if(View == 3){
		scheduleTimelineShow();
	}
	
	if(!increment || dateChangeInc>6) dateChangeInc = 0;
	if(dateChangeInc<0) dateChangeInc = 6;
}

function nearestInterval(){
	var currTime = new Date();
	var currTime = new Date(currTime.getTime());
	
	var currHrs = currTime.getHours();
	var currMin = currTime.getMinutes();
	
	currHrs = currHrs < 10 ? "0"+currHrs:""+currHrs;
	currMin = currMin < 10 ? "0"+currMin:""+currMin;
	
	if(currMin<30){
		return currHrs+":00";
	}
	else{
		return currHrs+":30";
	}
}

function scaleFontSizeToFit(w,h,txt){
	var size;
	
	var resizer = document.getElementById("hiddenResizer");
	resizer.innerHTML = longestWord(txt);
	
	while(resizer.offsetWidth > w) {
	  size = parseInt(resizer.style.fontSize);
	  resizer.style.fontSize = size-1;
	}
	
	return Math.min(size,16);
}

/*-----------------FIXED TASKS------------------*/
function fixedNew(){
	if(document.getElementById("prioritise_add_fixed").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("prioritise_add_fixed").className += " appear";
		//document.getElementById("prioritise_add_fixed").style.display = "block";
		//document.getElementById("prioritise_add_fixed_edit").style.display = "none";
		//document.getElementById("fixedPlusIcon").src = "Images/minus.png";
	   	document.getElementById("prioritise_add_btn_txt").innerHTML = "Cancel";
	}
	else{
		document.getElementById("prioritise_add_fixed").className = document.getElementById("prioritise_add_fixed").className.replace(" appear","");
		//document.getElementById("prioritise_add_fixed").style.display = "none";
		//document.getElementById("fixedPlusIcon").src = "Images/plus.png";
    	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
	}
}

function fixedEditNew(){
	if(document.getElementById("prioritise_add_fixed_edit").className.indexOf("appear")==-1){	
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("prioritise_add_fixed_edit").className += " appear";
	}
	else{
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("prioritise_add_fixed_edit").className = document.getElementById("prioritise_add_fixed_edit").className.replace(" appear","");
		//document.getElementById("fixedPlusIcon").src = "Images/plus.png";
	}
    
	document.getElementById("prioritise_add_btn_txt").innerHTML = "Add Task";
}

/*---------FIXED TASK PROCESSING---------*/
var timeSessions = new Array("0:00","0:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30");

/*
out="";
for(i=0;i<=23;i++){
	i<10?i="0"+i:i;
	out+="<option value='"+i+"'>"+i+"</option>";
}

document.getElementById("fixed_timings_hr_start").innerHTML = out;
document.getElementById("fixed_timings_hr_end").innerHTML = out;
//*/

var dayWk,strt,end,name,out="";

function getDayFixedTasks(){
	var ele = document.getElementById("daysOfWeek");
	return dayWk = parseInt(ele.options[ele.selectedIndex].value);	
}

function getDayFixedTasksEdit(){
	var ele = document.getElementById("daysOfWeekEdit");
	return dayWk = parseInt(ele.options[ele.selectedIndex].value);	
}

function makeFixedTasks(){
	dayWk = getDayFixedTasks();
	//alert(dayWk);
	
	var ele = document.getElementById("fixed_timings_hr_start");
	var ele2 = document.getElementById("fixed_timings_min_start");
	var hrzS = ele.options[ele.selectedIndex].value;
	var minzS = ele2.options[ele2.selectedIndex].value;
	
	strt = hrzS+":"+minzS;	
	
	var ele = document.getElementById("fixed_timings_hr_end");
	var ele2 = document.getElementById("fixed_timings_min_end");
	
	var hrzE = ele.options[ele.selectedIndex].value;
	var minzE = ele2.options[ele2.selectedIndex].value;
	
	end = hrzE+":"+minzE;
	
	timeTotal = parseInt(hrzE)+parseFloat(minzE/60);
	timeTotal -= parseInt(hrzS)+parseFloat(minzS/60);
	
	name = document.getElementById("fixed_name").value;
	
	if(document.getElementById("fixed_break").checked){
		type="break";
		name = "<BREAK>";
	}
	else type = "fixed";
	
	fixedTasks.push(dayWk+"_"+strt+"_"+end+"_"+name+"_"+timeTotal+"_"+type);
	fixedTasks.sort();
	
	out="";

	fixedTasks = fixedTasks.removeDup();
	
	saveFixedTaskData();
	//initFixed();
	fixedNew();
}

function insertFixedTasks(){
	clearTimetable();
	
	for(i=0;i<fixedTasks.length;i++){
		jiaks = fixedTasks[i].split("_");
		dayWk = daysOfWeek[parseInt(jiaks[0])];	
		strt = jiaks[1];
		end = jiaks[2]; 
		name = jiaks[3];
		tme = jiaks[4]
		type = jiaks[5];
		
		//console.log(tme);
		
//		console.log(strt+" "+end+" "+name+" "+parseInt(timeSessionIndex[strt]));
		
		//*
		for(j=parseInt(timeSessionIndex[strt]);j<parseInt(timeSessionIndex[end]);j++){
			Timetable[parseInt(jiaks[0])][j] = type+"_"+name+"_"+tme+"_"+i;
		}
		//*/
		
		//console.log("Fixed Task: "+name+" Timing: "+dayWk+" "+strt+"-"+end+" "+tme+"h");
	}	
}

/*--------------ENTIRE 2D ARRAY MANIPULATION---------------*/
var d = new Date();
var todayWkday = d.getDay()?d.getDay():7;

var freeSlots = new Array();
var freeSlotsTime = new Array();

var totalTimeAvail;

function freeeeSlots(day){
	if(day == null){
		day = todayWkday;
	}
	
	if(day == todayWkday){ //Should start from current time
		sI = strtIndX;
		
		/*
		//We should thus clear everything before strtIndX that is not a fixed task
		for(i=0;i<strtIndX;i++){
			if(Timetable[day][i].indexOf("task_")!=-1 && Timetable[day][i].indexOf("fixed_")==-1){ //this is a hmwk task
				Timetable[day][i] = ''; //clear
			}
		}*/
	}
	else{ //Can start from beginning of day
		if(day==6||day==7){
			strtInd = strtWkendInd;	
		}
		else{
			strtInd = strtWkdayInd;	
		}
		sI = strtInd;	
	}
	
	totalTimeAvail = 0;
	ind = 0;

	freeSlots.clear();
	freeSlotsTime.clear();
	freeSlots[0] = 0;
	freeSlotsTime[0] = new Array();

	for(i=sI;i<endInd;i++){
		if(Timetable[day][i].indexOf("fixed_")==-1 && Timetable[day][i].indexOf("break_")==-1){ //not a fixed task or break
			//Timetable[day][i] = ''; //clear
			freeSlots[ind]++;
			//totalTimeAvail++;
			freeSlotsTime[ind].push(Timetable[0][i]);
		}
		else{
			if(freeSlots[ind]){ //if !0
				ind++;
				freeSlots[ind] = 0;
				freeSlotsTime[ind] = new Array();
			}
		}
	}
	
	//console.log(freeSlots);
}

var cnt, overDue;
var rem = "REMOVED";
var ttlTime = 0;
function insertIntoTimetable(day){
	if(day==todayWkday){ //second week alr
		return;
	}
	
	if(day == null){
		day = todayWkday;
	}

	//Check
	if(todayWkday>day){ //next week
		dayDiff = 7+day-todayWkday;
	}
	else if(day==todayWkday){
		dayDiff=0;
	}
	else {
		dayDiff = day-todayWkday;	
	}
	
	/*
	ttlTime = 0;
	
	for(i=0;i<hmwkTimeNeeded.length;i++){
		dteDiff = dateDiff(findNextDayDate(dayDiff),hmwkDue[i]);
		if(dteDiff<1){ //check if task is due tomorrow or already overdue
			ttlTime+=parseInt(hmwkTimeNeeded[i]);
		}
	}
	console.log(day+" "+ttlTime);
	*/
	
	console.log("Inserting into Timetable... Day: "+day);
	
	len = prioritask.length;
	
	for(i=0;i<len;i++){
		for(j=0;j<freeSlots.length;j++){
			if(prioritask[i] == rem){ //if item has already been placed into Timetable
				continue;
			}

			cnt=0;
			taskName = prioritask[i].split("_")[0];
			taskTime = parseFloat(prioritask[i].split("_")[1]);
			taskTime*=2; //multiply task time by 2 because 1 timeslot = 1/2 hr
			taskId = parseInt(prioritask[i].split("_")[2]);

			//console.log("FREEEEEEE "+taskName+" "+taskTime+" "+freeSlots[j]);
			if(taskTime<=freeSlots[j]){ //when task can be inserted into such a slot
				//totalTimeAvail -= taskTime;
				
				//remove task frpm prioritask array
				//prioritask.splice(i,1);
				//console.log(prioritask);
				//console.log(freeSlotsTime[0]+" "+taskName);
				
				/*
				if(freeSlots[j] == 0){
					freeSlots.splice(j,1); //remove from array for quicker computation
				}
				//*/
				
				//add task into timetable
				
				//*
				
				//Check for errors
				wr = false;
				
				for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]+taskTime);k++){
					//check if there is a fixed task in there. If so, its wrong...
					if(Timetable[day][k].indexOf("fixed_")!=-1 || Timetable[day][k].indexOf("break_")!=-1){
						//console.log(k+" "+freeSlots[j]+" "+taskName+" "+taskTime+" "+Timetable[day][k]+" "+freeSlotsTime[0]);
						wr = true;
						//break;
					}
					else{
						cnt++;
					}
					//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId);
				}
			
				if(wr){
					for(k=0;k<cnt;k++){
						//console.log(freeSlotsTime[j][0]);
						freeSlotsTime[j].shift(); //remove timing from FRONT
					}	
				}
				//*/
				
				/*
				//Check for Revision
				cnt = 0;
				rev = false;
				mustPutIn = false;
				
				for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k++){
					//check if there is a rev task in there
					if(Timetable[day][k].indexOf("rev_")!=-1){
						//console.log(k+" "+freeSlots[j]+" "+taskName+" "+taskTime+" "+Timetable[day][k]+" "+freeSlotsTime[0]);
						//Check if task is due the next day or overdue
						dteDiff = dateDiff(findNextDayDate(dayDiff),hmwkDue[i]);
						rev = true;
						if(dteDiff<1){ //if task is due tomorrow or already overdue
							mustPutIn = true;
						}
					}
					
					cnt++;
					//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId);
				}
				
				if(rev){
					if(!mustPutIn){
						//Time is not free anymore, remove
						for(k=0;k<cnt;k++){
							console.log(freeSlotsTime[j][0]);
							freeSlotsTime[j].shift(); //remove timing from FRONT
						}
						
						//Goto front of loop
						j--;
						continue;
					}
					else{
						//Replace rev with current task
						Timetable[day][k] = "task_"+taskName+"_"+taskId+"_"+(taskTime/2);
						
						//Remove the freeSlotsTime
						for(k=0;k<cnt;k++){
							//console.log(freeSlotsTime[j][0]);
							freeSlotsTime[j].shift(); //remove timing from FRONT
						}
						
						//Shift revision down
						for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k++){
							//check if there is a rev task in there
							if(Timetable[day][k].indexOf("rev_")!=-1){
								//console.log(k+" "+freeSlots[j]+" "+taskName+" "+taskTime+" "+Timetable[day][k]+" "+freeSlotsTime[0]);
								//Check if task is due the next day or overdue
								dteDiff = dateDiff(findNextDayDate(dayDiff),hmwkDue[i]);
								rev = true;
								if(dteDiff<1){ //if task is due tomorrow or already overdue
									mustPutIn = true;
								}
							}
							
							cnt++;
							//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId);
						}
					}
				}
				//*/
				
				//*
				//Check if task is due the next day or overdue
				dteDiff = parseInt(dateDiff(findNextDayDate(dayDiff),hmwkDue[taskId]));
				//console.log(dayDiff+" "+dteDiff);
				//console.log(hmwkName[i+1]+" "+hmwkDue[i+1]);
				if(dteDiff>0){ //if dont have to do today
					if(revision[day].length>1 && !revisionRem[day].allValuesEqual(rem)){
						insertRevIntoTimetable(day);

						overDue = false;
						//goto front of loop
						i-=2;
						//console.log("I"+i);
						break;
					}
				}
				if(dteDiff<=0){ //overdue tasks
					//alert("ALERT: The task "+taskName+" is going to be overdue!");
					overDue = true;
				}
				//*/
				
				freeSlots[j]-=taskTime; //decrease free timing
				prioritask[i] = rem;
				
				//Adding into Timetable
				cnt = 0;
				
				for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]+taskTime);k++){
					Timetable[day][k] = "task_"+taskName+"_"+taskId+"_"+(taskTime/2)+"_"+overDue;
					
					//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId+", "+(taskTime/2));					
					cnt++;
				}

				
				for(k=0;k<cnt;k++){
					freeSlotsTime[j].shift(); //remove timing from FRONT
				}
				
				//freeeed = true;
				
				break;	//move on to next task
			}
		}
		/*
		if(!freeeed){ //particular timeslot didnt have any tasks to add into
			
			for(a=0;a<freeSlots[0];a++){ //ARGH. WONT WORK
				freeSlotsTime.shift(); //remove unused timing from front
			}

			freeSlotsTime.shift(); //remove unused timing from front
		}
		*/
	}
	
	if(!prioritask.allValuesEqual(rem)){ //Not all tasks can be fit into a single day
		//Repeat for next day
		if(day==7){
			day = 0;
		}
		
		freeeeSlots(day+1);
		insertIntoTimetable(day+1);
	}
	
	//*
	if(day==0) day=7;
	if(revision[day].length!=1)
	if(!revisionRem[day].allValuesEqual(rem)){ //Not all rev can be fit into a single day
		if(prioritask.allValuesEqual(rem)){
			insertRevIntoTimetable(day);
		}
		else{
			//Repeat for next day
			for(i=1;i<revision[day].length;i++){
				if(revisionRem[day][i]!=rem){ //not able to fit in this task
					if(day!=7){
						revision[day+1].insert(revision[day][i],1); //insert into index 1 of array
						revisionRem[day+1].insert(revisionRem[day][i],1); //insert into index 1 of array
					}
					else{
						revision[1].insert(revision[day][i],1); //insert into index 1 of array	
						revisionRem[1].insert(revisionRem[day][i],1); //insert into index 1 of array
					}

					//revisionRem[day][i]=rem; //remove from array
					revisionOld[day][i] = revision[day][i];
					revision[day].splice(i,1);
					revisionRem[day].splice(i,1);
				}
			}
		}
	}
	//*/
	
	//*
 	//Tasks have all been added in but revision has not
 	if(prioritask.allValuesEqual(rem) || !prioritask.length){
		for(i2=1;i2<revision.length;i2++){
			if(!revisionRem[i2].allValuesEqual(rem)){ //not able to fit in this task
				freeeeSlots(i2);
				insertRevIntoTimetable(i2);
			}
		}
	}
	
	/*
	if(prioritask.allValuesEqual(rem)){
		for(i2=1;i2<revision.length;i2++){
			for(j2=1;j2<revision[i2].length;j2++){
				if(revisionRem[i2][j2] == rem){
					revision[i2][j2] = revisionOld[i2][j2];
				}
			}
		}
		
		saveRevData();
		
		revisionOld = revision;
	}
	//*/
	
	//console.log(Timetable);
	saveTimetableData();
}

var revisionOld=revision;
var revisionRem=revision;

function insertRevIntoTimetable(day){
	if(revisionRem[day].allValuesEqual(rem)){
		return;
	}
	
	console.log("Inserting revision... Day "+day);
	//console.log(revision[day]);
	for(i=1;i<revision[day].length;i++){
		//alert(i);
		//console.log("i:"+i);
		for(j=0;j<freeSlots.length;j++){
			//alert("i:"+i+" j:"+j+" T:"+freeSlots[j]);			
			if(revisionRem[day][i] == rem){ //if item has already been placed into Timetable
				continue;
			}
			
			//impt, tme, top, subj
			//*
			revImpt = revision[day][i].split("_")[0];
			revTime = revision[day][i].split("_")[1];
			revTime*=2;
			revName = revision[day][i].split("_")[2];
			revSubj = revision[day][i].split("_")[3];
			//*/
			
			console.log(revImpt+" "+revTime+" "+revName+" "+revSubj+" "+freeSlots[j]);
			if(revTime<=freeSlots[j]){ //when task can be inserted into such a slot		
				//Check for errors
				wr = false;
				
				for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]+revTime);k++){
					//check if there is a fixed task in there. If so, its wrong...
					if(Timetable[day][k].indexOf("fixed_")!=-1 || Timetable[day][k].indexOf("break_")!=-1){
						console.log(k+" "+freeSlots[j]+" "+taskName+" "+taskTime+" "+Timetable[day][k]+" "+freeSlotsTime[0]);
						wr = true;
						//break;
					}
					else{
						cnt++;
					}
					//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId);
				}
			
				if(wr){
					for(k=0;k<cnt;k++){
						console.log(freeSlotsTime[j][0]);
						freeSlotsTime[j].shift(); //remove timing from FRONT
					}	
				}
				//*/
				
				freeSlots[j]-=revTime; //decrease free timing
				revisionOld[day][i] = revision[day][i];
				revisionRem[day][i] = rem;
				
				//Adding revision into Timetable
				cnt = 0;
				
				for(k=parseInt(timeSessionIndex[freeSlotsTime[j][0]]);k<parseInt(timeSessionIndex[freeSlotsTime[j][0]]+revTime);k++){
					Timetable[day][k] = "rev_"+revName+"_"+(revTime/2)+"_"+revSubj+"_"+i;
					
					//console.log(Timetable[day][k]+"; Name:"+taskName+", Id:"+taskId+", "+(taskTime/2));					
					cnt++;
				}

				for(k=0;k<cnt;k++){
					freeSlotsTime[j].shift(); //remove timing from FRONT
				}
				
				console.log(freeSlots+" "+freeSlotsTime);
				break;	//move on to next task
			}
		}
	}

	if(revision[day].length!=1)
	if(!revisionRem[day].allValuesEqual(rem)){ //Not all rev can be fit into a single day
		console.log(revision[day]);
		//Repeat for next day
		for(i=1;i<revision[day].length;i++){
			if(revisionRem[day][i]!=rem){ //not able to fit in this task
				if(day!=7){
					revision[day+1].insert(revision[day][i],1); //insert into index 1 of array
					revisionRem[day+1].insert(revisionRem[day][i],1); //insert into index 1 of array
				} else {
					revision[1].insert(revision[day][i],1); //insert into index 1 of array
					revisionRem[1].insert(revisionRem[day][i],1); //insert into index 1 of array
				}
				//revisionRem[day][i]=rem; //remove from array
				revisionOld[day][i] = revision[day][i];
				revision[day].splice(i,1);
				revisionRem[day].splice(i,1);
				//revisionRem[day].splice(i,1);
				//revisionOld[day].splice(i,1);
			}
		}
	}
}

/*------------QUICK ADD----------*/
//Quick Add Var
var quickAdd = new Array(); // [what is in the array?]

function changeQuickTaskType(){
	ele = document.getElementById("quickTaskType");	
	
	document.getElementById("quick_hmwk").style.display = " none";
	document.getElementById("quick_rev").style.display = "none";

	document.getElementById("quick_"+ele.options[ele.selectedIndex].value).style.display = "block";	
}

function initQuickAdd(){
	if(window.localStorage && localStorage['quickAddSaved']){
		retrieveQuickAddData();
	}
	
	//Due init
	var out = out2 = outE = out2E = '';
	for(i=1;i<=7;i++){
		switch(i){
			case 1:
				dy = "Next Day";		
				break;
			case 2:
				dy = "Day After";
				break;
			case 7:
				dy = "Next Week";
				break;
			default:
				dy = "In "+i+" days";
				break;
		}

		out	+= "<option value='"+i+"'>"+dy+"</option>";
		if(i!=7) out2 += "<option value='"+i+"'>"+dy+"</option>";
		
		outE += "<option value='"+i+"' id='quickDue_hmwkEdit_op"+i+"'>"+dy+"</option>";
		if(i!=7) out2E += "<option value='"+i+"' id='quickDue_revEdit_op"+i+"'>"+dy+"</option>";
	}
	document.getElementById("quickDue_hmwk").innerHTML = out;
	document.getElementById("quickDue_rev").innerHTML = out2;
	document.getElementById("quickDue_hmwkEdit").innerHTML = outE;
	document.getElementById("quickDue_revEdit").innerHTML = out2E;
	
	var quickTask;
	var out='';
	//Quick Add menu init
	for(i=0;i<quickAdd.length;i++){
		quickTask = '';
		
		quickSplit = quickAdd[i].split("_");
		taskType = quickSplit[5];
		nme = quickSplit[0];
		due = quickSplit[1];
		impt = quickSplit[2];
		subj = quickSplit[3];
		tme = quickSplit[4];
		
		var dueIn;
		switch(parseInt(due)){
			case 1:
				dueIn = "Next Day";		
				break;
			case 2:
				dueIn = "Day After";
				break;
			case 7:
				dueIn = "Next Week";
				break;
			default:
				dueIn = "In "+due+" days";
				break;
		}
		
		quickTask = nme+", "+dueIn+", "+imptFull[impt];		
		quickTask += ", "+tme+"h";
		
		editDiv = '';
		editDiv += '<div class="quick_add_edit">'
		editDiv += '<span data-icon="&#xe000" onClick="editQuick('+i+')"></span>';
		editDiv += '<span data-icon="&#xe001" onClick="removeQuick('+i+');"></span>';
		editDiv += '</div>';
		
		out+= "<div style='background-color:"+subjectClr[subj]+"' onClick='quickAddTask("+i+")'>"+quickTask+editDiv+"</div>";
	}
	
	if(!quickAdd.length){
		out+="<div onclick='quickNew(); closeQuickAddDropdown(event);' style='background-color:"+subjectClr[subjectClr.length-1]+"'><em>You have no Quick Tasks...</em></div>";	
	}
	
	document.getElementById("quick_menu").innerHTML = out;	
}

function quickNew(){
	//dropdown popup
	if(document.getElementById("quickAddNewMenu").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("quickAddNewMenu").className += " appear";
	}
	else{
		document.getElementById("quickAddNewMenu").className = document.getElementById("quickAddNewMenu").className.replace(" appear","");
	}	 
}

function quickEditNew(){
	if(document.getElementById("quickAddEditMenu").className.indexOf("appear")==-1){
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}
		document.getElementById("quickAddEditMenu").className += " appear";
		//document.getElementById("hmwkNewMenu").style.display = "none";
	}
	else{
		/*
		for(i=0;i<document.getElementsByClassName("appear").length;i++){
			document.getElementsByClassName("appear")[i].className = document.getElementsByClassName("appear")[i].className.replace(" appear","");
		}//*/
		document.getElementById("quickAddEditMenu").className = document.getElementById("quickAddEditMenu").className.replace(" appear","");
	}
}


function quickAddProcess(){
	var ele = document.getElementById("quickTaskType");
	taskType = ele.options[ele.selectedIndex].value;
	
	nme = document.getElementById("quickName_"+taskType).value;
	
	if(nme.length<=0){
		alert("Task name not filled in!");
		return;	
	}
	
	val1 = document.getElementById("quickTimeH_"+taskType).value;
	val2 = document.getElementById("quickTimeM_"+taskType).value;
	
	if(val1.length>0 && val2.length>0){			
		if(val2>=30){
			val2 = 30;
		}
		else{
			val2 = 0;
		}
		val2+="";
		
		tme = parseInt(val1) + parseFloat(val2/60);
	}
	else if(val1.length>0){
		tme = parseInt(val1);
	}
	else if(val2.length>0){			
		if(val2>=30){
			val2 = 30;
		}
		else{
			val2 = 0;
		}
		val2+="";
		
		tme = parseFloat(val2/60);
	}
	else{
		alert("Time Needed not filled in!");
		return;
	}
	
	var ele = document.getElementById("quickDue_"+taskType);
	due = ele.options[ele.selectedIndex].value;
	
	var ele = document.getElementById("quickImpt_"+taskType);
	impt = parseInt(ele.options[ele.selectedIndex].value);
	
	var ele = document.getElementById("quickSubject_"+taskType);
	subj = parseInt(ele.options[ele.selectedIndex].value);

	quickAdd.push(nme+"_"+due+"_"+impt+"_"+subj+"_"+tme+"_"+taskType);

	quickNew();
	saveQuickAddData();
	initQuickAdd();
}

function quickEditProcess(i){
	var ele = document.getElementById("quickTaskTypeEdit");
	taskType = ele.options[ele.selectedIndex].value;
	
	nme = document.getElementById("quickName_"+taskType+"Edit").value;
	
	if(nme.length<=0){
		alert("Task name not filled in!");
		return;	
	}
	
	val1 = document.getElementById("quickTimeH_"+taskType+"Edit").value;
	val2 = document.getElementById("quickTimeM_"+taskType+"Edit").value;
	
	if(val1.length>0 && val2.length>0){			
		if(val2>=30){
			val2 = 30;
		}
		else{
			val2 = 0;
		}
		val2+="";
		
		tme = parseInt(val1) + parseFloat(val2/60);
	}
	else if(val1.length>0){
		tme = parseInt(val1);
	}
	else if(val2.length>0){			
		if(val2>=30){
			val2 = 30;
		}
		else{
			val2 = 0;
		}
		val2+="";
		
		tme = parseFloat(val2/60);
	}
	else{
		alert("Time Needed not filled in!");
		return;
	}
	
	var ele = document.getElementById("quickDue_"+taskType+"Edit");
	due = ele.options[ele.selectedIndex].value;
	
	var ele = document.getElementById("quickImpt_"+taskType+"Edit");
	impt = parseInt(ele.options[ele.selectedIndex].value);
	
	var ele = document.getElementById("quickSubject_"+taskType+"Edit");
	subj = parseInt(ele.options[ele.selectedIndex].value);

	quickAdd[i] = (nme+"_"+due+"_"+impt+"_"+subj+"_"+tme+"_"+taskType);

	quickEditNew();
	saveQuickAddData();
	initQuickAdd();
}

function removeQuick(i){
	taskType = quickAdd[i].split("_")[5];
	
	/*
	if(taskType == 'hmwk'){
		removeTask(nHmwk,false,true);
	}
	else if(taskType == 'rev'){
		//remove revision
		//removeRev(?,?,false,true);
	}
	*/
	
	quickAdd.splice(i,1);
	saveQuickAddData();
	initQuickAdd();
}

function editQuick(i){
	quickSplit = quickAdd[i].split("_");
	taskType = quickSplit[5];
	nme = quickSplit[0];
	due = quickSplit[1];
	impt = quickSplit[2];
	subj = quickSplit[3];
	tme = quickSplit[4];
	
	//Remove tasks to override adding of tasks when clicking on quickAdd menu
	if(taskType == 'hmwk'){
		removeTask(nHmwk,false,true);
	}
	else if(taskType == 'rev'){
		//remove revision
		//removeRev(?,?,false,true);
	}
	
	
	if(taskType == 'hmwk'){
		document.getElementById("quickName_"+taskType+"Edit").value = nme;
		
		thr = parseInt(tme);
		tmin = (tme-thr)*60;
		
		document.getElementById("quickTimeH_"+taskType+"Edit").value = (thr)?thr:"";
		document.getElementById("quickTimeM_"+taskType+"Edit").value = (tmin)?tmin:"";
		
		document.getElementById("quickDue_"+taskType+"Edit_op"+due).selected = true;
		
		document.getElementById("quickImpt_"+taskType+"_op"+impt).selected = true;
		
		document.getElementById("quickEditSubject_"+taskType+"_op"+subj).selected = true;
	}
	
	document.getElementById("quickEdit").onclick = function(){quickEditProcess(i);};
	
	quickEditNew();
	/*
	if(document.getElementById("quickAddEditMenu").className.indexOf("appear")==-1){
		quickEditNew();
	}
	//*/
}

function quickAddTask(id){ //quick add the task
	if(id>=quickAdd.length){
		return;
	}

	quickSplit = quickAdd[id].split("_");
	taskType = quickSplit[5];
	nme = quickSplit[0];
	due = quickSplit[1];
	impt = quickSplit[2];
	subj = quickSplit[3];
	tme = quickSplit[4];
	
	if(taskType == "hmwk"){
		args = {
			"name":nme,
			"due":parseInt(due-1),
			"impt":impt,
			"subj":subj,
			"time":tme
		}
		processHmwk(args);
	}
	else if(taskType == "rev"){
		args = {
			"name":nme,
			"day":due,
			"impt":impt,
			"subj":subj,
			"time":tme
		}
		processRev(args);
	}
	
	/*
	reschedule();
	scheduleTimelineShow();	
	//*/
}

//Menus
function openQuickAddDropdown(event){
	event.stopPropagation();
	
	document.getElementById("quick_menu").style.display = "block";
}

function closeQuickAddDropdown(event){
	event.stopPropagation();
	
	document.getElementById("quick_menu").style.display = "none";
}

function quickAddDropdown(event){
	event.stopPropagation();
	
	if(document.getElementById("quick_menu").style.display == "block"){
		openQuickAddDropdown(event);
	}
	else{
		closeQuickAddDropdown(event);
	}
	
}

/*---------OTHER FUNCTIONS--------*/
function takeTimetableScreenshot(){
	var fileType = "png";
	
	var ele = document.getElementById("schedule_main");
	var out = '';
	
	html2canvas(ele, {
	  onrendered: function(canvas){
		var dataURL = canvas.toDataURL("image/"+fileType);
		newWin=window.open(dataURL,'_blank');
		newWin.document.body.appendChild(canvas);
		newWin.focus();
	  },
	  background:"rgba(186,223,255,0.85)",
	});
}

function addSubjectPrefix(type,repStr){
	var ele = document.getElementById(type+"Subject");
	subj = parseInt(ele.options[ele.selectedIndex].value);
	
	if(type == "hmwk"){
		ele1 = document.getElementById("hmwkName");
	}
	else if(type == "rev"){
		ele1 = document.getElementById("revTopic");
	}
	
	var str = ele1.value;
	
	for(i=0;i<subjectName.length;i++){
		str = str.replace(subjectName[i],"");
	}
	
	if(repStr!=null){
		str = repStr+" "+str;	
	}
	else{
		str = subjectName[subj]+str;
	}
	ele1.value = str;
}

/*-----------SETTINGS-----------*/
function changeWebsiteBg(n){
	document.body.style.backgroundImage = x;
	console.log(document.body.style.backgroundImage);
	bgID = n;
	
	saveOptionsData();
}

/*----------LOCALSTORAGE----------*/
function saveOptionsData(){
	localStorage['optionsSaved'] = true;
	localStorage['bg'] = bgID;
}

function retrieveOptionsData(){
	bgID = localStorage['bg'];
}

function saveData(){
	localStorage['saved'] = true;
	localStorage['nHmwk'] = nHmwk;
		
	localStorage['hmwkDue'] = JSON.stringify(hmwkDue);

	localStorage['hmwkName'] = JSON.stringify(hmwkName);
		
	localStorage['hmwkTimeNeeded'] = JSON.stringify(hmwkTimeNeeded);	
	
	localStorage['hmwkImpt'] = JSON.stringify(hmwkImpt);
	
	localStorage['hmwkSubject'] = JSON.stringify(hmwkSubject);

	localStorage['hmwkNotes'] = JSON.stringify(hmwkNotes);
		
	localStorage['hmwkDateC'] = JSON.stringify(hmwkDateC);
	localStorage['hmwkNameC'] = JSON.stringify(hmwkNameC);
	
	//localStorage['Timetable'] = JSON.stringify(Timetable);
}

function retrieveData(){
	nHmwk = parseInt(localStorage['nHmwk']);
		
	hmwkDue = (JSON.parse(localStorage['hmwkDue']));
	if(!(hmwkDue instanceof Array)){ //this is not an array
		hmwkDue = JSON.parse(JSON.parse(localStorage['hmwkDue']));
	}
	console.log("Retrieved hmwkDue: "+hmwkDue);
	
	hmwkName = (JSON.parse(localStorage['hmwkName']));
	if(!(hmwkName instanceof Array)){ //this is not an array
		hmwkName = JSON.parse(JSON.parse(localStorage['hmwkName']));
	}
	console.log("Retrieved hmwkName: "+hmwkName);
	
	hmwkTimeNeeded = (JSON.parse(localStorage['hmwkTimeNeeded']));
	if(!(hmwkTimeNeeded instanceof Array)){ //this is not an array
		hmwkTimeNeeded = JSON.parse(JSON.parse(localStorage['hmwkTimeNeeded']));
	}
	console.log("Retrieved hmwkTimeNeeded: "+hmwkTimeNeeded);
			
	hmwkImpt = (JSON.parse(localStorage['hmwkImpt']));
	if(!(hmwkImpt instanceof Array)){ //this is not an array
		hmwkImpt = JSON.parse(JSON.parse(localStorage['hmwkImpt']));
	}
	console.log("Retrieved hmwkImpt: "+hmwkImpt);
	
	hmwkSubject = (JSON.parse(localStorage['hmwkSubject']));
	if(!(hmwkSubject instanceof Array)){ //this is not an array
		hmwkSubject = JSON.parse(JSON.parse(localStorage['hmwkSubject']));
	}
	console.log("Retrieved hmwkSubject: "+hmwkSubject);
	
	hmwkNotes = (JSON.parse(localStorage['hmwkNotes']));
	if(!(hmwkNotes instanceof Array)){ //this is not an array
		hmwkNotes = JSON.parse(JSON.parse(localStorage['hmwkNotes']));
	}
	console.log("Retrieved hmwkNotes: "+hmwkNotes);
	
	hmwkDateC = (JSON.parse(localStorage['hmwkDateC']));
	if(!(hmwkDateC instanceof Array)){ //this is not an array
		hmwkDateC = JSON.parse(JSON.parse(localStorage['hmwkDateC']));
	}
	console.log("Retrieved hmwkDueC: "+hmwkDateC);
	
	hmwkNameC = (JSON.parse(localStorage['hmwkNameC']));
	if(!(hmwkNameC instanceof Array)){ //this is not an array
		hmwkNameC = JSON.parse(JSON.parse(localStorage['hmwkNameC']));
	}
	console.log("Retrieved hmwkNameC: "+hmwkNameC);
}

function saveRevData(){
	localStorage['revSaved'] = true;

	localStorage['revision'] = JSON.stringify(revision);
	
	localStorage['revDateC'] = JSON.stringify(revDateC);
	localStorage['revNameC'] = JSON.stringify(revNameC);
	
	//localStorage['Timetable'] = JSON.stringify(Timetable);
}

function retrieveRevData(){
	revision = (JSON.parse(localStorage['revision']));
	console.log("Retrieved revision: "+revision);
	
	if(!(revision instanceof Array)){ //this is not an array
		revision = JSON.parse(JSON.parse(localStorage['revision']));
	}
	
	if(revision.length!=8){
		revision.unshift("");
	}
	
	revDateC = (JSON.parse(localStorage['revDateC']));
	console.log("Retrieved revDateC: "+revDateC);
	
	revNameC = (JSON.parse(localStorage['revNameC']));
	console.log("Retrieved revNameC: "+revNameC);
	
	if(!(revNameC instanceof Array)){ //this is not an array
		revNameC = JSON.parse(JSON.parse(localStorage['revNameC']));
		revDateC = JSON.parse(JSON.parse(localStorage['revDateC']));
	}
	
	//Timetable = JSON.parse(localStorage['Timetable']));
	//console.log("Retrieved Timetable!");
}

function saveFixedTaskData(){
	//console.log("abc");
	localStorage['fixedSaved'] = true;
	localStorage['fixedTasks'] = JSON.stringify(fixedTasks);
}	

function retrieveFixedTaskData(){
	//console.log("cba");
	fixedTasks = JSON.parse(localStorage['fixedTasks']);
	if(!(fixedTasks instanceof Array)){ //this is not an array
		fixedTasks = JSON.parse(JSON.parse(localStorage['fixedTasks']));
	}
	console.log("Retrieved fixedTasks: "+fixedTasks);	
}


function saveQuickAddData(){
	//console.log("abc");
	localStorage['quickAddSaved'] = true;
	localStorage['quickAdd'] = JSON.stringify(quickAdd);
}	

function retrieveQuickAddData(){
	//console.log("cba");
	quickAdd = JSON.parse(localStorage['quickAdd']);
	if(!(quickAdd instanceof Array)){ //this is not an array
		quickAdd = JSON.parse(JSON.parse(localStorage['quickAdd']));
	}
	console.log("Retrieved quickTasks: "+quickAdd);	
}


function saveEventsData(){
	localStorage['eventsSaved'] = true;

	localStorage['events'] = JSON.stringify(events);
	
	localStorage['eventsC'] = JSON.stringify(eventsC);
	
	//localStorage['Timetable'] = JSON.stringify(Timetable);
}

function retrieveEventsData(){
	events = (JSON.parse(localStorage['events']));
	console.log("Retrieved events: "+events);
	
	if(!(events instanceof Array)){ //this is not an array
		events = JSON.parse(JSON.parse(localStorage['events']));
	}
	
	eventsC = (JSON.parse(localStorage['eventsC']));
	console.log("Retrieved eventsC: "+eventsC);
	
	if(!(eventsC instanceof Array)){ //this is not an array
		eventsC = JSON.parse(JSON.parse(localStorage['eventsC']));
	}
	
	//Timetable = JSON.parse(localStorage['Timetable']));
	//console.log("Retrieved Timetable!");
}

function saveTimetableData(){
	localStorage['timetableSaved'] = true;
	localStorage['Timetable'] = JSON.stringify(Timetable);
}

function retrieveTimetableData(){
	Timetable = JSON.parse(localStorage['Timetable']);
	console.log("Retrieved Timetable!");
	
	if(!(Timetable instanceof Array)){ //this is not an array
		Timetable = JSON.parse(JSON.parse(localStorage['Timetable']));
	}
}

/*---------OTHERS---------*/
function openUserMenu(event){
	event.stopPropagation();
	
	document.getElementById("user_menu").style.display = "block";
}

function closeUserMenu(event){
	event.stopPropagation();
	
	document.getElementById("user_menu").style.display = "none";
}

function userMenu(event){
	event.stopPropagation();
	
	if(document.getElementById("user_menu").style.display == "block"){
		openUserMenu(event);
	}
	else{
		closeUserMenu(event);
	}
	
}

function changeBackArrow(id){
	document.getElementById(id).src = "Images/arrow.png";
}

function changeArrow(id){
	document.getElementById(id).src = "Images/arrow_over.png";
}

function checkInt(event,id){
	val  = document.getElementById(id).value;
	
	var ek = parseInt(event.keyCode);
	if((ek>=65 && ek<=90) || (ek>=106 && ek<=111) || (ek>=186)){
		document.getElementById(id).value = val.substring(0, val.length-1);
	}
}

function initScrollbarSchedule(){
	//Scrollbar
	$('#schedule_main').jScrollPane({
		horizontalGutter:5,
		verticalGutter:5,
		'showArrows': false
	});
	
	$('.jspDrag').hide();
	$('.jspScrollable').mouseenter(function(){
		$(this).find('.jspDrag').stop(true, true).fadeIn('medium');
	});
	$('.jspScrollable').mouseleave(function(){
		$(this).find('.jspDrag').stop(true, true).fadeOut('medium');
	});
}	

//clearData();

function clearTimetable(){
	Timetable[0] = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"];

	Timetable[1] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[2] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[3] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[4] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[5] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[6] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	
	Timetable[7] = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];	
}