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
	for (let i in arr) {
		if (arr[i]._inSprint == true) {
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
												<timertext>
												<span id = "timer">
													00 : 00 : 00 : 000
												</span>
												</timertext>
												<br><br>
												<div>
													<button onclick="startTimer()" id="startButton">Start</button>
													<button onclick="stopTimer()" id="stopButton">Stop</button>
													<button onclick="resetTimer(${i})" id="resetButton">Reset</button>
												</div>
												<br>
												<p>
												<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprintBoardTask(${i})">  <i class="material-icons">delete</i> </button>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<button onclick="edit(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>

												</p>
											</div>
										</div>
										<div class="mdl-card__actions mdl-card--border">
										</div> 
									</div> 
								</div>	`
		}

	}
	sprintBoard.innerHTML = sprintBoardInnerHTML;
}

function deleteSprintBoardTask(index) {
	arr[index]._inSprint = false;

	theSelectedTask = arr[index];

	let tempIndex = "";

	for (let i in savedTasks._allTask) {
		console.log(savedTasks._allTask[i][0]==theSelectedTask)
		console.log(savedTasks._allTask[i][0])
		console.log(theSelectedTask)
		if (savedTasks._allTask[i][0]._taskName == theSelectedTask._taskName) {
			console.log('found')
			tempIndex = i;
		}
	}
	console.log(tempIndex)
	savedTasks._allTask[tempIndex][0]._inSprint = false;
	updateLSData(TASK_LIST_KEY, savedTasks);
	//updateLSData(SPRINT_LIST_KEY,savedSprints);
	pageLoad();
}

//variables for timer
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let startTime;
let Interval = null;
let taskList = []
let taskDurationList = []
let storyPointList = []

// Timer
/**
 * Retrieved from https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html
 */
function startTimer() {
	if (Interval !== null) {
		clearInterval(Interval);
	}
	// startTime = parseInt(localStorage.getItem('startTime') || Date.now());
	// localStorage.setItem('startTime', startTime);
	Interval = setInterval(displayTimer, 10);
};

function stopTimer() {
	clearInterval(Interval);
};

function resetTimer(index) {
	// change to hours and minutes
	taskDurationIndex = arr[index]
	taskDurationIndex._taskDuration = [hours, minutes, seconds, milliseconds]

	for (let i = 0; i < arr.length; i++){
		taskDurationList.push(arr[i]._taskDuration.seconds)
		storyPointList.push(arr[i].storyPoint * 2)
	}

	clearInterval(Interval);
	//localStorage.removeItem('startTime');
	[milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
	document.getElementById("timer").innerHTML = '00 : 00 : 00 : 000';
	// displaySeconds.innerHTML = seconds;
	// displayMinutes.innerHTML = minutes;
	//addTaskDuration()
};

console.log(taskDurationList)

function displayTimer() {
	milliseconds += 10;
	if (milliseconds == 1000) {
		milliseconds = 0;
		seconds++;
		if (seconds == 60) {
			seconds = 0;
			minutes++;

			if (minutes == 60) {
				minutes = 0;
				hours++;
			}
		}
	}
	let h = hours < 10 ? "0" + hours : hours;
	let m = minutes < 10 ? "0" + minutes : minutes;
	let s = seconds < 10 ? "0" + seconds : seconds;
	let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

	document.getElementById("timer").innerHTML = `${h} : ${m} : ${s} : ${ms}`;

	window.onload = function () {
		displayTimer();
	}

}

for (let i = 0; i < arr.length; i++){
	taskList.push(arr[i]._taskName)
	taskDurationList.push(arr[i]._taskDuration)
	storyPointList.push(arr[i].storyPoint * 2)
}

console.log(taskList)
console.log(taskDurationList)


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
			text: 'Task'
		  },
		categories: [taskList[0], taskList[1], taskList[2]]
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
		data: [storyPointList[0], storyPointList[1], storyPointList[2]]
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