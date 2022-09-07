
if (checkLSData(TASK_KEY)) {
    let data = retrieveLSData(TASK_KEY);
    let task = new Task();
    task.fromData(data);
}

if (checkLSData(TASK_LIST_KEY)) {
    let data = retrieveLSData(TASK_LIST_KEY);
    let savedTasks = new SavedTasks();
    savedTasks.fromData(data);
}

let selectedTask=[];
let editTaskNameRef = document.getElementById("editTaskName");
let editTaskAssigneeRef = document.getElementById("editTaskAssignee");
let editTaskDateRef = document.getElementById("editTaskDate");
 //let editTaskPriorityRef = document.getElementById("editTaskPriority");
 //let editTaskTypeRef = document.getElementById("editTaskType");
 //let editTaskStatusRef = document.getElementById("editTaskStatus");
let editStoryPoint = document.getElementById("editStoryPoint");
let editTaskDescriptionRef = document.getElementById("editTaskDescription");
let itemIndex=0;

let checkForLow2 = document.getElementById("edit_low");
let checkForHigh2 = document.getElementById("edit_high");
let checkForMedium2 = document.getElementById("edit_medium");
let checkForCritical2 = document.getElementById("edit_critical");
let taskPriority2="";
let taskTag2="";


console.log(savedTasks);

let selectedPrio="";
let selectedType="";
let selectedStatus="";
let selectedTag="";

if (savedTasks._allTask.length > 0) {

    itemIndex = retrieveLSData(LIST_INDEX_KEY);

    selectedTask = savedTasks._allTask[itemIndex];

    editTaskNameRef.value = selectedTask[0]._taskName;
    editTaskAssigneeRef.value = selectedTask[0]._taskAssignee;
    editTaskDateRef.value = selectedTask[0]._taskDate;

    //radio buttons
    selectedPrio = selectedTask[0]._taskPriority;
    selectedType = selectedTask[0]._taskType;
    selectedStatus = selectedTask[0]._taskStatus;
    selectedTag=selectedTask[0]._taskTag;
    document.getElementById("edit_"+selectedPrio).checked = true;
    document.getElementById("edit_"+selectedType).checked = true;
    document.getElementById("edit_"+selectedStatus).checked = true;
    document.getElementById("edit_"+selectedTag).checked = true;

    editTaskDescriptionRef.value = selectedTask[0]._taskDescription;

}

function edit(index) {
    // redirect to edit page
    updateLSData(LIST_INDEX_KEY, index)
    window.location = "edittask.html";
}


/**
 * Redirect user to main page 
 */
function submit() {

    if (checkForLow2.checked) {
        taskPriority2 = "low";
      }
      else if (checkForMedium2.checked) {
        taskPriority2 = "medium";
      }
      else if (checkForHigh2.checked) {
        taskPriority2 = "high";
      }
      else if (checkForCritical2.checked) {
        taskPriority2 = "critical";
      }


      if (edit_havenotstarted.checked) {
        taskStatus2 = "have not started";
      }
      else if (edit_progress.checked) {
        taskStatus2 = "progress";
      }
      else if (edit_done.checked) {
        taskStatus2 = "done";
      }
    
      if (edit_story.checked) {
        taskType2 = "story";
      }
      else if (edit_bug.checked) {
        taskType2 = "bug";
      }

      if (edit_ui.checked) {
        taskTag2 = "ui";
      }
      else if (edit_core.checked) {
        taskTag2 = "core";
      }
      else if (edit_testing.checked) {
        taskTag2 = "testing";
      }
    
    

    selectedTask[0]._taskName = editTaskNameRef.value;
    selectedTask[0]._taskAssignee = editTaskAssigneeRef.value;
    selectedTask[0]._taskDate = editTaskDateRef.value;
    selectedTask[0]._taskPriority = taskPriority2;
    selectedTask[0]._taskType = taskType2;
    selectedTask[0]._taskStatus = taskStatus2;
    selectedTask[0]._taskTag=taskTag2;
    selectedTask[0]._taskStoryPoint=editStoryPoint.value;
    selectedTask[0]._taskDescription = editTaskDescriptionRef.value;

    savedTasks._allTask[itemIndex] = selectedTask;

    updateLSData(TASK_LIST_KEY, savedTasks);
    window.location = "mainpage.html";
}
