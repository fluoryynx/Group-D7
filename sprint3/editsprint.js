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

  selectedSprint = savedSprints._allSprint[itemIndex];

  editSprintNameRef.value = selectedSprint._sprintName;
  editSprintStartingDateRef.value="";
  editSprintStartingDateRef.value = selectedSprint._sprintStartingDate;
  editSprintEndingDateRef.value="";
  editSprintEndingDateRef.value = selectedSprint._sprintEndingDate;

function editSprint(index) {
  updateLSData(SPRINT_INDEX_KEY, index)
  window.location = "editsprint.html";
}

/**
* Redirect user to main page 
*/
function submit() {

  selectedSprint._sprintName = editSprintNameRef.value;
  if (editSprintEndingDateRef.value >= editSprintStartingDateRef.value) {
    selectedSprint._sprintStartingDate = editSprintStartingDateRef.value;
    selectedSprint._sprintEndingDate = editSprintEndingDateRef.value;
  }
  else {
    alert("Please ensure that the End Date must be later than Start Date. Try changing the dates, and try again.");
    return false;
  }

  let sprintStatus2 ="";
  let today=new Date().toISOString();

  if (editSprintStartingDateRef.value>today){
      sprintStatus2="have_not_started";
  }
  if (editSprintStartingDateRef.value<=today && editSprintEndingDateRef.value>=today) {
      sprintStatus2 = "Active";
  }
  if (editSprintEndingDateRef.value<today && editSprintStartingDateRef.value<today) {
      sprintStatus2 = "Completed";
  }

  selectedSprint._sprintStatus = sprintStatus2;

  console.log(editSprintStartingDateRef.value)
  console.log(today)
  console.log(sprintStatus2)

  savedSprints._allSprint[itemIndex] = selectedSprint;

  updateLSData(SPRINT_LIST_KEY, savedSprints);
  window.location = "sprintlist.html";
}
 
