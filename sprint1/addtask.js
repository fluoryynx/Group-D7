// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(TASK_LIST_KEY)) {
  savedTasks.fromData(taskListData);
}

// list of assignees
let assigneeList=[];

function errorHandler(errorType){
  errorType === "nameError" ? console.log("Name Error") :
    null
  errorType === "tagError" ? console.log("Tag Error") :
    null
  errorType === "priorityError" ? console.log("Priority Error") :
    null
  errorType === "statusError" ? console.log("Status Error") :
    null
  errorType === "detailError" ? console.log("Detail Error") :
    null
}

function addTask() {
  
  // taskDetail object stores details of the added task
  let taskDetails = {
    taskName: document.getElementById("taskName").value,
    taskTag: "",
    taskPriority: "",
    taskStatus: "",
    taskType: "",
    taskAssignee: assigneeList,
    taskDescription: document.getElementById("taskDescription").value,
    storyPoint: document.getElementById("storyPoint").value,
    taskDate: document.getElementById("taskDate").value,
    taskError: false
  }

  
  if (taskName==""|| taskStatus=="" || taskType=="" || taskTag==""){
    alert('task name, status,type and tag cannot be empty')
    return
  }

  // checks for taskName, if it is blank, then return error
  taskDetails.taskName === "" ? (taskDetails.taskError = true, errorHandler("nameError")) : 
    null

  // checks for the tag type, assigns taskTag with the correct input
  ui.checked ? taskDetails.taskTag = "ui" : 
    core.checked ? taskDetails.taskTag = "core" :
      testing.checked ? taskDetails.taskTag = "testing" : 
        (taskDetails.taskError = true, errorHandler("tagError"))

  // checks for the task priority, assigns taskPriority with the correct input
  lowPrio.checked ? taskDetails.taskPriority = "low" :
    mediumPrio.checked ? taskDetails.taskPriority = "medium" :
      highPrio.checked ? taskDetails.taskPriority = "high" :
        criticalPrio.checked ? taskDetails.taskPriority = "critical" :
          (taskDetails.taskError = true, errorHandler("priorityError"))

  // checks for the task status, assigns taskStatus with the correct input
  start.checked ? taskDetails.taskStatus = "havenotstarted" :
    progress.checked ? taskDetails.taskStatus = "progress" :
      done.checked ? taskDetails.taskStatus = "done" :
        (taskDetails.taskError = true, errorHandler("statusError"))

  // checks for the task type, assigns taskType with the correct input
  story.checked ? taskDetails.taskType = "story" :
    bug.checked ? taskDetails.taskType = "bug" :
      (taskDetails.taskError = true, errorHandler("detailError"))

  // console.log(Object.keys(taskDetails))
  console.log(taskDetails)
  
  if (taskDetails.taskError){
    console.log("Errors!!!")
  } else {

    // Add task details into a task class and 
    task.taskName = taskDetails.taskName;
    task.taskAssignee = taskDetails.assigneeList;
    task.taskDate = taskDetails.taskDate;
    task.taskPriority = taskDetails.taskPriority;
    task.taskStatus = taskDetails.taskStatus;
    task.taskType = taskDetails.taskType;
    task.storyPoint = taskDetails.storyPoint;
    task.taskDescription = taskDetails.taskDescription;
    task.taskTag = taskDetails.taskTag;
  
    // updateLSData(TASK_KEY, task);

    savedTasks._allTask.push([task]);
    updateLSData(TASK_LIST_KEY, savedTasks);

    window.location = "mainpage.html";

  }
  
}


function addAssignee(){
  let taskAssignee = document.getElementById("taskAssignee").value;
  if (taskAssignee!="" || taskAssignee!= null){
    assigneeList.push(taskAssignee);
  }
  showAssignee();
}


function showAssignee(){

  let assigneePlaceholder=document.getElementById("assigneeList");
  let assigneePlaceholderInnerHTML="";

  for (let i in assigneeList){
    assigneePlaceholderInnerHTML+=`<span class="mdl-chip mdl-chip--deletable">
    <span class="mdl-chip__text">${assigneeList[i]}</span>
    <button type="button" class="mdl-chip__action"><i class="material-icons" onclick="deleteAssignee(${i})">cancel</i></button>
    </span>`
  }
  assigneePlaceholder.innerHTML=assigneePlaceholderInnerHTML;
}

function deleteAssignee(index){
	assigneeList.splice(index, 1);
  showAssignee();
}