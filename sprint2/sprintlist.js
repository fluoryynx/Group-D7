// If there is, store it into savedSprints
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

let arr = savedSprints._allSprint;
let filteredTag2 = "";
let sprintIndex = "";
let content = "";

function pageLoad() {

	let sprintList = document.getElementById("sprintList");

	let sprintListInnerHTML = "";

	let timerId="timer";

	for (let i in arr) {
		timerId="timer"+i;
	//	if (i != "1") {
			sprintListInnerHTML += ` 
		<div class="mdl-cell mdl-cell--4-col" >
			<sprint>Sprint ${Number(i) + 1}</sprint>
			<br><br>
				<div class="mdl-card">
					<div class="mdl-card__supporting-text">
						<div class="row">
							<div class="column">
								<sprintname>Sprint </sprintname><sprintnametext>${arr[i]._sprintName}</sprintnametext>
								<br><br>
								<fromdate>From:</fromdate>
								<br>
								<fromdatetext>${arr[i]._sprintStartingDate}</fromdatetext>
								<img src="img/date.png" class="dateimgsprint">
							</div>
							<div class="column2">
								<br><br>
								<todate>To: </todate><br><todatetext>${arr[i]._sprintEndingDate}</todatetext>
								<img src="img/date.png" class="dateimgsprint">
							</div>
							<br>
							<div>
							<p>Time remaining: </p>
							<p id=${timerId} > </p>
							</div>
							<br>
							</b><${arr[i]._sprintStatus}> ${arr[i]._sprintStatus} </${arr[i]._sprintStatus}>
							<br><br>
							<p>
							<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<button onclick="editSprint(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="viewBoard(${i})">Sprint board</button>
							</p>
						</div>
					</div>
					<div class="mdl-card__actions mdl-card--border">
					</div>
				</div>
			</div>  `
		countdown(arr[i]._sprintEndingDate, i);
//	}
	sprintList.innerHTML = sprintListInnerHTML;
 }
}
 
 
 function deleteSprint(index){
	 console.log(arr)
	selectedSprintName=arr[index]._sprintName;
	savedSprints._allSprint.splice(index, 1);
	console.log(selectedSprintName);
	console.log(savedTasks._allTask);

	for (let i in savedTasks._allTask){
		console.log(savedTasks._allTask);
		if (savedTasks._allTask[i][0]._taskSprint==selectedSprintName){
			savedTasks._allTask[i][0]._inSprint=false;
		}
	}
	updateLSData(SPRINT_LIST_KEY,savedSprints);
	updateLSData(TASK_LIST_KEY,savedTasks);
	pageLoad();
}


function viewBoard(index) {
	updateLSData(SPRINT_NAME_KEY, index)
    window.location = "sprintboard.html";
}


function countdown(endDate, index) {
	let countDownDate = new Date(endDate + " 23:59:59").getTime();

	// Update the count down every 1 second
	let x = setInterval(function () {

		// Get today's date and time
		let now = new Date().getTime();

		// Find the distance between now and the count down date
		let distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		console.log("timer"+index)
		document.getElementById("timer"+index).innerHTML = days + "d " + hours + "h "
			+ minutes + "m " + seconds + "s ";

		if (distance < 0) {
			clearInterval(x);
			document.getElementById("timer" + index).innerHTML = "overdue";
		}
	}, 1000);
}

pageLoad();
