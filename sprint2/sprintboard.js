tempSprintIndex = retrieveLSData(SPRINT_NAME_KEY);
console.log(tempSprintIndex);

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

arr = []
let sprintName = savedSprints._allSprint[tempSprintIndex]._sprintName;

for (let i in savedTasks._allTask) {
	console.log(savedTasks._allTask[i][0]);
	if (savedTasks._allTask[i][0]._taskSprint == sprintName) {
		arr.push(savedTasks._allTask[i][0])
	}
}

console.log(arr)

function pageLoad() {

	let sprintBoard = document.getElementById("sprint_board");
	//change sprint board name according to the sprint name
	document.getElementById("sprint_board_title").innerHTML = "&nbsp; &nbsp;" + sprintName + " Board"

	let sprintBoardInnerHTML = "";
	let stopwatchId = "stopwatch";
	for (let i in arr) {
		if (arr[i]._inSprint == true) {
			stopwatchId = "stopwatch" + i;
			sprintBoardInnerHTML += `  
			<div class="mdl-cell mdl-cell--4-col" >
									<h5> 
							
									</h5>
									<div class="mdl-card"  > 
										<div class="mdl-card__supporting-text"> 
											<div class="row">
												<div class="column">
													<taskname>Task name: </taskname><tasknametext>${arr[i]._taskName}</tasknametext>
													<br><br>
													<img src="img/assignee.png" alt="lowpic" class="assigneeimg">  
													<assignee>Assignee: </assignee><assigneetext>${arr[i]._taskAssignee}</assigneetext>
													<br><br>
													<img src="img/date.png" alt="lowpic" class="dateimg">  
													<datetext>${arr[i]._taskDate}</datetext>
													<br><br>
													<status> Status: </status> <statustext>${arr[i]._taskStatus}</statustext>
													<br><br>
													<${arr[i]._taskTag}> ${arr[i]._taskTag} </${arr[i]._taskTag}>
													<br><br>
													<br><br>
												</div>
												<div class="column2">
													<img src="img/${arr[i]._taskType}.png" width="40" height="35" class="typeimgmain">
													<storypoint>${arr[i].storyPoint}</storypoint>
												</div>
												<img src="img/timer_icon.png" alt="lowpic" class="timerimg">
												<p id=${stopwatchId}> ${arr[i]._taskCompletionTime}</p>
												<br><br>
												<div>
													<button onclick="startTimer(${i})" id="startButton">Start / Reset ⏯ </button>
													<button onclick="stopTimer(${i})" id="stopButton">Stop ⏹</button>
												</div>
												<br>
												<p>
												<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprintBoardTask(${i})">  <i class="material-icons">delete</i> </button>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<button onclick="edit(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
												<br>
												<br>
												<button onclick="markAsDone(${i})" id="markAsDone">Mark as done ✅</button>
												</p>
												<br>
											</div>
										</div>
										<div class="mdl-card__actions mdl-card--border">
										</div> 
									</div> 
								</div>	`
			if (arr[i]._startTime != "") {
				countup(arr[i]._startTime, i);
			}
		}

	}
	sprintBoard.innerHTML = sprintBoardInnerHTML;
	calActualVelocity()
	calIdealVelocity()
}

function deleteSprintBoardTask(index) {
	arr[index]._inSprint = false;

	theSelectedTask = arr[index];

	let tempIndex = "";

	for (let i in savedTasks._allTask) {
		if (savedTasks._allTask[i][0]._taskName == theSelectedTask._taskName) {
			tempIndex = i;
		}
	}

		savedTasks._allTask[tempIndex][0]._inSprint = false;
		updateLSData(TASK_LIST_KEY, savedTasks);
		pageLoad();
}

function markAsDone(index){
	//arr[index]._inSprint = false;
	arr[index]._taskStatus= "done"

	theSelectedTask = arr[index];

	let tempIndex = "";

	for (let i in savedTasks._allTask) {
		if (savedTasks._allTask[i][0]._taskName == theSelectedTask._taskName) {
			tempIndex = i;
		}
	}
	//savedTasks._allTask[tempIndex][0]._inSprint = false;
	savedTasks._allTask[tempIndex][0]._taskStatus = "done";
	updateLSData(TASK_LIST_KEY, savedTasks);
	pageLoad();
}


//variables for timer
let [days, hours, minutes, seconds] = [0, 0, 0, 0];
let startTime;
let Interval = null;
let taskList = []
let taskDurationList = []
let storyPointList = []
let idealVelocity = []

// Timer
/**
 * Retrieved from https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html
 */
function startTimer(index) {

	theSelectedTask = arr[index];

	let tempIndex = "";

	for (let i in savedTasks._allTask) {
		if (savedTasks._allTask[i][0]._taskName == theSelectedTask._taskName) {
			tempIndex = i;
		}
	}

	savedTasks._allTask[tempIndex][0]._startTime = Date.now();

	updateLSData(TASK_LIST_KEY, savedTasks);
	countup(savedTasks._allTask[tempIndex][0]._startTime, index);
};

function stopTimer(index) {

	theSelectedTask = arr[index];

	let tempIndex = "";

	for (let i in savedTasks._allTask) {
		if (savedTasks._allTask[i][0]._taskName == theSelectedTask._taskName) {
			tempIndex = i;
		}
	}

	savedTasks._allTask[tempIndex][0]._startTime = "";
	updateLSData(TASK_LIST_KEY, savedTasks);
};

function calActualVelocity() {
	// change to hours and minutes
	for (let i = 0; i < arr.length; i++) {
		extractedDate = document.getElementById("stopwatch" + i ).innerHTML;
		var arr1 = extractedDate.split(" ");
		console.log(extractedDate)
		console.log(arr1)
		days = arr1[1].split("d");
		console.log(days[0])

		// taskDurationIndex = arr1[index];
		// taskDurationIndex._taskDuration = [days[0], hours, minutes, seconds]

		// taskDurationList.push(arr[i]._taskDuration)
		// storyPointList.push(arr[i].storyPoint * 2)
	}

	//clearInterval(Interval);
	//[milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
	//document.getElementById("stopwatch" + index).innerHTML;
};

console.log(taskDurationList)

function countup(startTime, index) {

	// Update the count down every 1 second

	let x = setInterval(function () {
		// Get today's date and time
		let now = new Date().getTime();

		// Find the distance between now and the count down date
		let distance = now - startTime;

		// Time calculations for days, hours, minutes and seconds
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById("stopwatch" + index).innerHTML = days + "d " + hours + "h "
			+ minutes + "m " + seconds + "s ";

		savedTasks._allTask[index][0]._taskCompletionTime = days + "d " + hours + "h "
		+ minutes + "m " + seconds + "s ";

		updateLSData(TASK_LIST_KEY, savedTasks);

		if (savedTasks._allTask[index][0]._startTime == "") {
			clearInterval(x);
		}

	}, 1000);

}


for (let i = 0; i < arr.length; i++) {
	taskList.push(arr[i]._taskName)
	taskDurationList.push(arr[i]._taskDuration)
	storyPointList.push(arr[i].storyPoint * 2)
}

console.log(taskList)
console.log(taskDurationList)

// create an array of date
var startDate = savedSprints._allSprint[tempSprintIndex]._sprintStartingDate; //YYYY-MM-DD
var endDate = savedSprints._allSprint[tempSprintIndex]._sprintEndingDate; //YYYY-MM-DD

var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
	var end2 = new Date(end)

    while (dt <= end2) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

var dateArr = getDateArray(startDate, endDate);
var formattedDate = new Array();

for (var i = 0; i < dateArr.length; i++) {
	var d = new Date(dateArr[i]),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;
	formattedDate.push([year, month, day].join('-'));
}

//console.log(dateArr)
//console.log(formattedDate)
console.log(storyPointList)

function linspace(startVal, endVal, space){
	var arr = [];
	var step = (endVal - startVal) / (space - 1);
	for (var i = 0; i < space; i++){
		arr.push(startVal + (step * i));
	}
	return arr
}

var totalStoryPoints = 0;
for(var j = 0; j < storyPointList.length; j++){
	totalStoryPoints += Number(storyPointList[j])
}

function calIdealVelocity(){
	idealVelocity = linspace(totalStoryPoints, 0, arr.length)
	//console.log(idealVelocity)
}

// Burndown Chart
/**
 * Retrieved from https://jsfiddle.net/user/bcmoney/fiddles/
 */
$(function () {
	$('#burndown').highcharts({
		title: {
			text: 'Burndown Chart',
			x: -20 //center
		},
		colors: ['blue', 'red'],
		plotOptions: {
			line: {
				lineWidth: 3
			},
			tooltip: {
				hideDelay: 200
			}
		},
		xAxis: {
			title: {
				text: 'Days'
			},
			categories: [formattedDate[0], formattedDate[1], formattedDate[2], formattedDate[3], formattedDate[4]]
		},
		yAxis: {
			title: {
				text: 'Hours'
			},
			plotLines: [{
				value: 0,
				width: 1
			}]
		},
		tooltip: {
			valueSuffix: ' hrs',
			crosshairs: true,
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: [{
			name: 'Ideal Velocity',
			color: 'rgba(255,0,0,0.25)',
			lineWidth: 2,
			data: [idealVelocity[0], idealVelocity[1], idealVelocity[2], idealVelocity[3], idealVelocity[4]]
		}, {
			name: 'Actual Velocity',
			color: 'rgba(0,120,200,0.75)',
			marker: {
				radius: 6
			},
			data: [taskDurationList[0], taskDurationList[1], taskDurationList[2]]
		}]
	});
});

pageLoad();