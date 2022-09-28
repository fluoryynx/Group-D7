tempSprintIndex=retrieveLSData(SPRINT_NAME_KEY);
console.log(tempSprintIndex);

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

arr=[]
let sprintName=savedSprints._allSprint[tempSprintIndex][0]._sprintName;

for (let i in savedTasks._allTask){
	console.log(savedTasks._allTask[i][0]);
	if (savedTasks._allTask[i][0]._taskSprint==sprintName){
		arr.push(savedTasks._allTask[i][0])
	}
}


function pageLoad() {

	let sprintBoard = document.getElementById("sprint_board");

	//change sprint board name according to the sprint name
	document.getElementById("sprint_board_title").innerHTML = "&nbsp; &nbsp;" + sprintName + " Board"

	let sprintBoardInnerHTML = "";
	for (let i in arr) {
		if (arr[i]._inSprint==true){
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
												</div>
												<div class="column2">
													<img src="img/${arr[i]._taskType}.png" width="40" height="35" class="typeimgmain">
													<storypoint>${arr[i].storyPoint}</storypoint>
												</div>
												<p>
												<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">  <i class="material-icons">delete</i> </button>
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

function deleteSprintBoardTask(index){
	arr[index]._inSprint=false;

	theSelectedTask=arr[index];

	let tempIndex="";

	console.log(savedTasks._allTask);

	for (let i in savedTasks._allTask){
		if (savedTasks._allTask[i][0]==theSelectedTask){
			tempIndex=i;
		}
	}

	savedTasks._allTask[tempIndex]._inSprint=false;
	updateLSData(TASK_LIST_KEY,savedTasks);
	//updateLSData(SPRINT_LIST_KEY,savedSprints);
	pageLoad();
}

pageLoad();