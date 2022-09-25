// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(TASK_LIST_KEY)) {
  savedTasks.fromData(taskListData);
}

// console.log(checkLSData(TASK_LIST_KEY))
// console.log(savedTasks)

//temp list of assignees
let tempArray=[];



function addTask() {
  let taskNameRef = document.getElementById("taskName");
  let taskDateRef = document.getElementById("taskDate");

  let taskName = taskNameRef.value;
  let taskDate= taskDateRef.value;
  let taskStatus="";
  let taskType= "";
  let taskTag="";

  if (taskName==""|| taskStatus=="" || taskType=="" || taskTag==""){
    alert('task name, status,type and tag cannot be empty')
    return
 }

  let storyPoint = document.getElementById("storyPoint").value;
  let taskDescription = document.getElementById("taskDescription").value;

  let taskPriority = "";
  //priorities 
  let checkForLow = document.getElementById("lowPrio");
  let checkForHigh = document.getElementById("highPrio");
  let checkForMedium = document.getElementById("mediumPrio");
  let checkForCritical = document.getElementById("criticalPrio");
  if (checkForLow.checked) {
    taskPriority = "low";
  }
  else if (checkForMedium.checked) {
    taskPriority = "medium";
  }
  else if (checkForHigh.checked) {
    taskPriority = "high";
  }
  else if (checkForCritical.checked) {
    taskPriority = "critical";
  }

  if (start.checked) {
    taskStatus = "havenotstarted";
  }
  else if (progress.checked) {
    taskStatus = "progress";
  }
  else if (done.checked) {
    taskStatus = "done";
  }


  if (story.checked) {
    taskType = "story";
  }
  else if (bug.checked) {
    taskType = "bug";
  }

  if (ui.checked) {
    taskTag = "ui";
  }
  else if (core.checked) {
    taskTag = "core";
  }
  else if (testing.checked) {
    taskTag = "testing";
  }


  task.taskName = taskName;
  //task.taskAssignee = taskAssignee;
  task.taskAssignee=tempArray;
  console.log(tempArray);
  console.log(task.taskAssignee);
  task.taskDate = taskDate;
  task.taskPriority = taskPriority;
  task.taskStatus = taskStatus;
  task.taskType = taskType;
  task.storyPoint = storyPoint;
  task.taskDescription = taskDescription;
  task.taskTag=taskTag;
  updateLSData(TASK_KEY, task);
  console.log(task)

  console.log(savedTasks._allTask);

  savedTasks._allTask.push([task]);

  updateLSData(TASK_LIST_KEY, savedTasks);

  window.location = "mainpage.html";
}


function addAssignee(){
  let taskAssignee = document.getElementById("taskAssignee").value;
  if (taskAssignee!="" || taskAssignee!= null){
    tempArray.push(taskAssignee);
  }
  showAssignee();
}


function showAssignee(){

  let assigneePlaceholder=document.getElementById("assigneeList");
  let assigneePlaceholderInnerHTML="";

  for (let i in tempArray){
    assigneePlaceholderInnerHTML+=`<span class="mdl-chip mdl-chip--deletable">
    <span class="mdl-chip__text">${tempArray[i]}</span>
    <button type="button" class="mdl-chip__action"><i class="material-icons" onclick="deleteAssignee(${i})">cancel</i></button>
</span>`
  }
  assigneePlaceholder.innerHTML=assigneePlaceholderInnerHTML;
}

function deleteAssignee(index){
	tempArray.splice(index, 1);
  showAssignee();
}