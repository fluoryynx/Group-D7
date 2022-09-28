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
	console.log(savedTasks._allTask[1][0]);

    for (let i in savedTasks._allTask){
        console.log(savedTasks._allTask[i][0]);
        if (savedTasks._allTask[i][0]._taskSprint==sprintName){
            arr.push(savedTasks._allTask[i][0])
        }
    }

	let sprintBoardInnerHTML = "";
    console.log(arr);
	for (let i in arr) {
		console.log(arr[i])
		sprintBoardInnerHTML += `  
		<div class="mdl-cell mdl-cell--4-col" >
								<h5> 
								<task> Task ${Number(i) + 1} </task> 
								</h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
									<taskname>Task name: </taskname><tasknametext>${arr[i]._taskName}</tasknametext>
									<br><br>
							
									<assignee>Assignee: </assignee><assigneetext>${arr[i]._taskAssignee}</assigneetext>
									<br><br>
							  
									<datetext>${arr[i]._taskDate}</datetext>
									<br><br>
									<status> Status: </status> <statustext>${arr[i]._taskStatus}</statustext>
									<br><br>
						
									<storypoint> storypoint: ${arr[i].storyPoint}</storypoint>
									<br><br>
									Tag: <${arr[i]._taskTag}> ${arr[i]._taskTag} </${arr[i]._taskTag}>
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