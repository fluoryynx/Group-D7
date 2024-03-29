// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

console.log(savedSprints._allSprint);
console.log(savedTasks._allTask)
let existingSprintNames=[]

for (let i in savedSprints._allSprint){
	existingSprintNames.push(savedSprints._allSprint[i]._sprintName);
}


let filteredTag="";
let taskInfo="";
let taskIndex="";
let sprintName="";

/**
 * pageLoad function
 * runs when the list.html page is load
 * use to show list of planned vacation on the page in mdl cards sorted by date
 */
 function pageLoad() {
	let taskList = document.getElementById("taskList");
	let arr = savedTasks._allTask;

	if (filteredTag != "") {
		arr = searchTaskWithTag(filteredTag);
	}

	let taskListInnerHTML = "";
	for (let i in arr) {
		if (arr[i][0]._inSprint==false){
			taskListInnerHTML += `  
			<div class="mdl-cell mdl-cell--4-col" >
									<h5> 
							
									</h5>
									<div class="mdl-card"  > 
										<div class="mdl-card__supporting-text"> 
											<div class="row">
												<div class="column">
													<taskname>Task name: </taskname><tasknametext>${arr[i][0]._taskName}</tasknametext>
													<br><br>
													<img src="img/assignee.png" alt="lowpic" class="assigneeimg">  
													<assignee>Assignee: </assignee><assigneetext>${arr[i][0]._taskAssignee}</assigneetext>
													<br><br>
													<img src="img/date.png" alt="lowpic" class="dateimg">  
													<datetext>${arr[i][0]._taskDate}</datetext>
													<br><br>
													<status> Status: </status> <statustext>${arr[i][0]._taskStatus}</statustext>
													<br><br>
													<${arr[i][0]._taskTag}> ${arr[i][0]._taskTag} </${arr[i][0]._taskTag}>
												</div>
												<div class="column2">
													<img src="img/${arr[i][0]._taskType}.png" width="40" height="35" class="typeimgmain">
													<storypoint>${arr[i][0].storyPoint}</storypoint>
												</div>
												<p>
												<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">  <i class="material-icons">delete</i> </button>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<button onclick="edit(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
												<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="addToSprint(${i})"> Add to sprint board</button>
												</p>
											</div>
										</div>
										<div class="mdl-card__actions mdl-card--border">
										</div> 
									</div> 
								</div>	`
		}
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

//   sprint._sprintStartingDate=startDate.value;
//   sprint._sprintEndingDate=endDate.value;
  //sprint._sprintInfo="Task name: " + temp._taskName + " Tag: " + temp._taskTag + " Description: "+ temp._taskDescription + "\n" + "assignee(s): " + temp._taskAssignee , "\n" + "story point: " + temp._storyPoint+ "\n Priority: "+ temp._taskPriority;

  if (confirm(`Clicking this will add this task into the sprint list. Are you sure you want to continue?`)) {

	temp._taskSprint=sprintName.value;
	temp._inSprint=true;
	console.log(temp._taskSprint);
  
	sprint._sprintName=sprintName.value;

	  if (! existingSprintNames.includes(sprintName.value)){
		savedSprints._allSprint.push(sprint);
	  }
	updateLSData(TASK_LIST_KEY,savedTasks);
    updateLSData(SPRINT_LIST_KEY, savedSprints);
    dialog.close();
  }
  window.location = "sprintlist.html";
}


pageLoad();