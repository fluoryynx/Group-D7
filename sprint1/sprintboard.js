tempSprintIndex=retrieveLSData(SPRINT_NAME_KEY);
console.log(tempSprintIndex);

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}


function pageLoad() {

	let sprintBoard = document.getElementById("sprint_board");

    arr=[]

    let sprintName=savedSprints._allSprint[tempSprintIndex]._sprintName;
    console.log(sprintName);
    console.log(savedTasks._allTask[0][0]);

    for (let i in savedTasks._allTask){
        console.log(savedTasks._allTask[0][i]);
        if (savedTasks._allTask[0][i]._taskSprint==sprintName){
            arr.push(savedTasks._allTask[i])
        }
    }

	let sprintBoardInnerHTML = "";
    console.log(arr);
	for (let i in arr) {
		sprintBoardInnerHTML += `  
		<div class="mdl-cell mdl-cell--4-col" >
								<h5> 
								<task> Task ${Number(i) + 1} </task> 
								</h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
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
									<img src="img/${arr[i][0]._taskType}.png" width="40" height="35" class="typeimgmain">
									<storypoint>${arr[i][0].storyPoint}</storypoint>
									<br><br>
									<${arr[i][0]._taskTag}> ${arr[i][0]._taskTag} </${arr[i][0]._taskTag}>
									<br><br>
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div> 
								</div> 
							</div>	`
	}
	sprintBoard.innerHTML = sprintBoardInnerHTML;
}

pageLoad();