
if (checkLSData(TASK_LIST_KEY)) {
	let data = retrieveLSData(TASK_LIST_KEY);
	let savedTasks = new SavedTasks();
	savedTasks.fromData(data);
}

if (savedTasks._allTask.length > 0) {
	savedTasks=retrieveLSData(TASK_LIST_KEY);
}

let arr = savedTasks._allTask;
let filteredTag="";


/**
 * pageLoad function
 * runs when the list.html page is load
 * use to show list of planned vacation on the page in mdl cards sorted by date
 */
function pageLoad() { 
	let taskList = document.getElementById("taskList"); 


	if (filteredTag != ""){
		arr=searchTaskWithTag(filteredTag);

	}
	console.log(arr); 
	let taskListInnerHTML = ""; 
	for (let i in arr) { 
		taskListInnerHTML += `  
		<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" color="yellow">
								<h5>  <${arr[i][0]._taskPriority}> Task ${Number(i) + 1} </${arr[i][0]._taskPriority}><button onclick="edit(${i})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Details </button> </h5>
								<div class="mdl-card"> 
									<div class="mdl-card__supporting-text"> 
                                    <b>Task name:</b> ${arr[i][0]._taskName}  <${arr[i][0]._taskTag}> ${arr[i][0]._taskTag} </${arr[i][0]._taskTag}>
									<br><br>
									<b>Date:</b> ${arr[i][0]._taskDate}
									<br><br>
									<b> Assignee: </b> ${arr[i][0]._taskAssignee}
									<br><br>
									<b> Status: </b> ${arr[i][0]._taskStatus}
									<br><br>
									<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">  <i class="material-icons">delete</i> </button>
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div> 
								</div> 
							</div>	`
	}
	taskList.innerHTML = taskListInnerHTML;
}

function deleteTask(index){
	deleteIndex = index
	savedTasks._allTask.splice(index, 1);
	updateLSData(TASK_LIST_KEY,savedTasks);
	pageLoad();
}

function searchTaskWithTag(tag){
	let searchedTasks=[];
	for (let i in savedTasks._allTask){
		if (savedTasks._allTask[i][0]._taskTag==tag){
			searchedTasks.push([savedTasks._allTask[i][0]]);
		}
	}
	return searchedTasks;
}


function filterByTag(){
	let tagRef = document.getElementById("filterBy");
	filteredTag = tagRef.options[tagRef.selectedIndex].value;
	console.log(filteredTag);
	pageLoad() 
}

function removeFilter(){
	filteredTag = "";
	arr = savedTasks._allTask;
	pageLoad();
}

pageLoad();