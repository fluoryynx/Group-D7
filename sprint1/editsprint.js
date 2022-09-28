if (checkLSData(SPRINT_KEY)) {
  sprint.fromData(sprintData);
}



if (checkLSData(SPRINT_LIST_KEY)) {
  savedSprints.fromData(sprintListData);
}

//savedSprints._allSprint=retrieveLSData(SPRINT_LIST_KEY);

let selectedSprint=[];
let editSprintNameRef = document.getElementById("editSprintName");
let editSprintStartingDateRef = document.getElementById("editSprintStartingDate");
let editSprintEndingDateRef = document.getElementById("editSprintEndingDate");
let selectedStatus="";


  itemIndex = retrieveLSData(SPRINT_INDEX_KEY);
  console.log(savedSprints._allSprint)
  console.log(itemIndex);

  selectedSprint = savedSprints._allSprint[itemIndex];
  console.log(selectedSprint);

  editSprintNameRef.value = selectedSprint._sprintName;
  editSprintStartingDateRef.value="";
  editSprintStartingDateRef.value = selectedSprint._sprintStartingDate;
  editSprintEndingDateRef.value="";
  editSprintEndingDateRef.value = selectedSprint._sprintEndingDate;

  //radio buttons
  selectedStatus = selectedSprint._sprintStatus;
  document.getElementById("edit_"+selectedStatus).checked = true;

function editSprint(index) {
  updateLSData(SPRINT_INDEX_KEY, index)
  window.location = "editsprint.html";
}


/**
* Redirect user to main page 
*/
function submit() {

  if (edit_Active.checked) {
    sprintStatus2 = "Active";
  }
  else if (edit_Completed.checked) {
    sprintStatus2 = "Completed";
  }

  selectedSprint._sprintName = editSprintNameRef.value;
  if (editSprintEndingDateRef.value >= editSprintStartingDateRef.value) {
    selectedSprint._sprintStartingDate = editSprintStartingDateRef.value;
    selectedSprint._sprintEndingDate = editSprintEndingDateRef.value;
  }
  else {
    alert("Please ensure that the End Date must be later than Start Date. Try changing the dates, and try again.");
    return false;
  }
  selectedSprint._sprintStatus = sprintStatus2;

  savedSprints._allSprint[itemIndex] = selectedSprint;

  updateLSData(SPRINT_LIST_KEY, savedSprints);
  window.location = "sprintlist.html";
}
 