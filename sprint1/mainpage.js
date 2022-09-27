// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

let arr = savedTasks._allTask;
let filteredTag="";
let taskInfo="";
let taskIndex="";

/**
 * pageLoad function
 * runs when the list.html page is load
 * use to show list of planned vacation on the page in mdl cards sorted by date
 */
 function pageLoad() {
	let taskList = document.getElementById("taskList");

	if (filteredTag != "") {
		arr = searchTaskWithTag(filteredTag);

	}
	// console.log(arr);
	let taskListInnerHTML = "";
	console.log(arr);
	for (let i in arr) {
		//temp="Task name: " + arr[i][0]._taskName , "\n" , "tag: " , (arr[i][0]._taskTag) , "\n description: ",arr[i][0]._taskDescription,"\n" , "assignee(s): " , arr[i][0]._taskAssignee , "\n" , "story point: " , arr[i][0]._storyPoint, "\n Priority: ", arr[i][0]._taskPriority;
		taskListInnerHTML += `  
		<div class="mdl-cell mdl-cell--3-col" >
								<h5> 
								<${arr[i][0]._taskPriority}> Task ${Number(i) + 1} </${arr[i][0]._taskPriority}> 
								</h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
                                    <b>Task name:</b> ${arr[i][0]._taskName}
									<br><br>
									<b>Tag:</b> <${arr[i][0]._taskTag}> ${arr[i][0]._taskTag} </${arr[i][0]._taskTag}>
									<br><br>
									<b>Date:</b> ${arr[i][0]._taskDate}
									<br><br>
									<b> Assignee: </b> ${arr[i][0]._taskAssignee}
									<br><br>
									<b> Status: </b> ${arr[i][0]._taskStatus}
									<br><br>
									<b> Type: </b> ${arr[i][0]._taskType}
									<br><br>
									<b> Story Point: </b> ${arr[i][0].storyPoint}
									<br><br>
									<p>
									<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">  <i class="material-icons">delete</i> </button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<button onclick="edit(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
									<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="addToSprint(${i})"> Add to sprint board</button>
									</p>
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
	var dropDown = document.getElementById("filterBy");
	dropDown.selectedIndex = 0;
	pageLoad();
}

//dialog that pops out when the add to sprint button is clicked
let dialog = document.getElementById("sprintDialog");
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

//show dialog for user to input sprint details
function addToSprint(index){
taskIndex=index;
dialog.showModal();
}

//cancel add to sprint
function cancel() {
	dialog.close();
  }

function confirmAddSprint(){
let sprintBoard=document.getElementById("sprintBoard");
let sprintName=document.getElementById("sprintName");
let startDate=document.getElementById("sprintStartDate");
let endDate=document.getElementById("sprintEndDate");
let temp= savedTasks._allTask[taskIndex][0];

if(sprintBoard==""||sprintName==""|| startDate=="" || endDate==""){
    alert('name and dates must be filled in')
    return
  }

  sprint._sprintBoard=sprintBoard.value;
  sprint._sprintName=sprintName.value;
  sprint._sprintStartingDate=startDate.value;
  sprint._sprintEndingDate=endDate.value;
  sprint._sprintInfo="Task name: " + temp._taskName + " Tag: " + temp._taskTag + " Description: "+ temp._taskDescription + "\n" + "assignee(s): " + temp._taskAssignee , "\n" + "story point: " + temp._storyPoint+ "\n Priority: "+ temp._taskPriority;

  if (confirm(`Clicking this will add this task into the sprint list. Are you sure you want to continue?`)) {
    savedSprints._allSprint.push(sprint);
    updateLSData(SPRINT_LIST_KEY, savedSprints);
    dialog.close();
  }
  window.location = "sprintlist.html";
}

window.onload = function () {
    pageLoad();
};

