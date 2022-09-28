
if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

// If there is, store it into savedSprints
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

let arr = savedSprints._allSprint;
// arr=arr1.filter((v,i,a)=>a.findLastIndex(v2=>(v2._sprintName === v._sprintName))===i)
// console.log(arr1);
// updateLSData(SPRINT_LIST_KEY,arr);
let filteredTag2 = "";
let sprintIndex = "";
let content = "";

function pageLoad() {

	let sprintList = document.getElementById("sprintList");

	//let sprintBoardSelections = document.getElementById("sprint_boards_filter");

	//dropdown list to select sprint board
	// let option = "<option>"
	// "</option>";
	// for (let i in removeDuplicates(boards)) {
	// 	option += `<option>${boards[i]}</option>}`;
	// }
	// sprintBoardSelections.innerHTML = option;

	let sprintListInnerHTML = "";

	for (let i in arr) {
		sprint_name=arr[i]._sprintName
		sprintListInnerHTML += `  
		<div class="mdl-cell mdl-cell--3-col" >
            <h5> 
            Sprint ${Number(i) + 1}
            </h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
                                    <b>Sprint name:</b> ${arr[i]._sprintName}
                                    <br><br>
									<b>From:</b> ${arr[i]._sprintStartingDate}
									<br><br>
									<b>To: </b> ${arr[i]._sprintEndingDate}
									<br><br>
									<b> Time remaining: </b>
									<p id="timer${i}"></p>
									<b> Status: </b><${arr[i]._sprintStatus}> ${arr[i]._sprintStatus} </${arr[i]._sprintStatus}>
									<br><br>
									<p>
									<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="viewBoard(${i})"> Sprint board </button>
									<button onclick="editSprint(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
									</p>
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div> 
								</div> 
							</div>	`
		countdown(arr[i]._sprintEndingDate, i);
	}
	sprintList.innerHTML = sprintListInnerHTML;
 }
 
 
 function deleteSprint(index){
	deleteIndex = index
	savedSprints._allSprint.splice(index, 1);
	updateLSData(SPRINT_LIST_KEY,savedSprints);
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

function filterBySprintBoards() {
	let tagRef = document.getElementById("sprint_boards_filter");
	filteredTag2 = tagRef.options[tagRef.selectedIndex].value;
	pageLoad()
}

function searchSprintWithBoard(sprint) {
	let searchedSprints = [];
	for (let i in savedSprints._allSprint) {
		if (savedSprints._allSprint[i]._sprintBoard == sprint) {
			searchedSprints.push(savedSprints._allSprint[i]);
		}
	}
	return searchedSprints;
}

pageLoad();



