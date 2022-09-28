// If there is, store it into savedSprints
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

let arr = savedSprints._allSprint;
let filteredTag2 = "";
let sprintIndex = "";
let content = "";

function pageLoad() {

	let sprintList = document.getElementById("sprintList");

	let sprintListInnerHTML = "";

	for (let i in arr) {
		sprintListInnerHTML += ` 
		<div class="mdl-cell mdl-cell--4-col" >
			<sprint>Sprint ${Number(i) + 1}</sprint>
			<br><br>
				<div class="mdl-card">
					<div class="mdl-card__supporting-text">
						<div class="row">
							
							</b><${arr[i][0]._sprintStatus}> ${arr[i][0]._sprintStatus} </${arr[i][0]._sprintStatus}>
							<br><br>
							<p>
							<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<button onclick="editSprint(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
							</p>
						</div>
					</div>
					<div class="mdl-card__actions mdl-card--border">
					</div>
				</div>
			</div>  `
		countdown(arr[i][0]._sprintEndingDate, i);
	}
	sprintList.innerHTML = sprintListInnerHTML;
 }
 
 
 function deleteSprint(index){
	deleteIndex = index
	savedSprints._allSprint.splice(index, 1);
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

		document.getElementById("timer" + index).innerHTML = days + "d " + hours + "h "
			+ minutes + "m " + seconds + "s ";

		if (distance < 0) {
			clearInterval(x);
			document.getElementById("timer" + index).innerHTML = "overdue";
		}
	}, 1000);
}

pageLoad();
