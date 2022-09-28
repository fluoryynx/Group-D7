if (checkLSData(TASK_KEY)) {
    task.fromData(taskData);
}

if (checkLSData(TASK_LIST_KEY)) {
    // let data = retrieveLSData(TASK_LIST_KEY);
    // let savedTasks = new SavedTasks();
    savedTasks.fromData(taskListData);
}

savedTasks=retrieveLSData(TASK_LIST_KEY);
let selectedTask=[];
let editTaskNameRef = document.getElementById("editTaskName");
let editTaskAssigneeRef = document.getElementById("editTaskAssignee");
let editTaskDateRef = document.getElementById("editTaskDate");

let editStoryPoint = document.getElementById("editStoryPoint");
let editTaskDescriptionRef = document.getElementById("editTaskDescription");
let itemIndex=-1;

let checkForLow2 = document.getElementById("edit_low");
let checkForHigh2 = document.getElementById("edit_high");
let checkForMedium2 = document.getElementById("edit_medium");
let checkForCritical2 = document.getElementById("edit_critical");
let taskPriority2="";
let taskTag2="";

let selectedPrio="";
let selectedType="";
let selectedStatus="";
let selectedTag="";

let tempAssigneeArr=[];

if (savedTasks._allTask.length > 0) {

    itemIndex = retrieveLSData(LIST_INDEX_KEY);
    if (itemIndex != null){
      selectedTask = savedTasks._allTask[itemIndex];
      console.log(savedTasks._allTask[1][0]);
      console.log(selectedTask);
       
      tempAssigneeArr=selectedTask[0]._taskAssignee;
      edit_showAssignee();
      editTaskNameRef.value = selectedTask[0]._taskName;
      //editTaskAssigneeRef.value = selectedTask[0]._taskAssignee;
      editTaskAssigneeRef.value="";
      editTaskDateRef.value = selectedTask[0]._taskDate;
      editStoryPoint.value=selectedTask[0]._taskStoryPoint;
  
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
      editStoryPoint.value = selectedTask[0].storyPoint;

    }

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
        taskStatus2 = "havenotstarted";
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
    //selectedTask[0]._taskAssignee = editTaskAssigneeRef.value;
    selectedTask[0]._taskAssignee = tempAssigneeArr;
    selectedTask[0]._taskDate = editTaskDateRef.value;
    selectedTask[0]._taskPriority = taskPriority2;
    selectedTask[0]._taskType = taskType2;
    selectedTask[0]._taskStatus = taskStatus2;
    selectedTask[0]._taskTag=taskTag2;
    selectedTask[0].storyPoint=editStoryPoint.value;
    selectedTask[0]._taskDescription = editTaskDescriptionRef.value;

    savedTasks._allTask[itemIndex] = selectedTask;

    updateLSData(TASK_LIST_KEY, savedTasks);
    window.location = "mainpage.html";
}



function edit_addAssignee(){
  let editTaskAssignee = document.getElementById("editTaskAssignee").value;
  console.log(tempAssigneeArr)
  if (editTaskAssignee!="" || editTaskAssignee!= null){
    tempAssigneeArr.push(editTaskAssignee);
  }
  edit_showAssignee();
}


function edit_showAssignee(){

  let assigneePlaceholder=document.getElementById("editAssigneeList");
  let assigneePlaceholderInnerHTML="";

  for (let i in tempAssigneeArr){
    assigneePlaceholderInnerHTML+=`<span class="mdl-chip mdl-chip--deletable">
    <span class="mdl-chip__text">${tempAssigneeArr[i]}</span>
    <button type="button" class="mdl-chip__action"><i class="material-icons" onclick="edit_deleteAssignee(${i})">cancel</i></button>
</span>`
  }
  assigneePlaceholder.innerHTML=assigneePlaceholderInnerHTML;
}


function edit_deleteAssignee(index){
  console.log(tempAssigneeArr);
	tempAssigneeArr.splice(index, 1);
  edit_showAssignee();
}
 