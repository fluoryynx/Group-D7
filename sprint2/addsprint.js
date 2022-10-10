// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}


let taskFromPB = document.getElementById("taskFromPB");
let taskFromPBInnerHTML="";
let taskArr=[];

//index of task that are not in sprint board
for (let i in savedTasks._allTask) {
	if (savedTasks._allTask[i][0]._inSprint == false) {
	taskFromPBInnerHTML+=`<input class="taskCheckbox" id="task${i}" type="checkbox" value="${i}">`
    taskFromPBInnerHTML+=`<label for="task${i}"> ${savedTasks._allTask[i][0]._taskName}</label> <br>`
	}
}

taskFromPB.innerHTML=taskFromPBInnerHTML;



function addSprint() {
    let sprintName = document.getElementById("sprintName").value;
    let sprintStartingDate = document.getElementById("sprintStartingDate").value;
    let sprintEndingDate = document.getElementById("sprintEndingDate").value;

    let inputElements = document.getElementsByClassName('taskCheckbox');
    for(let i in inputElements){
          if(inputElements[i].checked){
               index= inputElements[i].value;
               savedTasks._allTask[index][0]._inSprint = true;
               savedTasks._allTask[index][0]._taskSprint = sprintName;
          }
    }

    console.log(savedTasks._allTask)
    updateLSData(TASK_LIST_KEY, savedTasks);

    
     if (sprintEndingDate >= sprintStartingDate) {
        sprint.sprintStartingDate = sprintStartingDate;
        sprint.sprintEndingDate = sprintEndingDate;
    }
    else {
        alert("Please ensure that the End Date must be later than Start Date. Try changing the dates, and try again.");
        return false;
    }

    let sprintStatus ="";
    let today=new Date().toISOString();
  
    if (sprintStartingDate>today){
        sprintStatus="have_not_started";
    }
    if (sprintStartingDate<=today && sprintEndingDate>=today) {
        sprintStatus = "Active";
    }
    if (sprintEndingDate<today && sprintStartingDate<today) {
        sprintStatus = "Completed";
    }

    sprint.sprintName = sprintName;
    sprint.sprintStatus = sprintStatus;
    updateLSData(SPRINT_KEY, sprint);

    savedSprints._allSprint.push(sprint);
    updateLSData(SPRINT_LIST_KEY, savedSprints);

   window.location = "sprintlist.html";
}
 
