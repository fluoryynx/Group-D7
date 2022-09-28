// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

  
function addSprint() {
    let sprintName = document.getElementById("sprintName").value;
    let sprintStartingDate = document.getElementById("sprintStartingDate").value;
    let sprintEndingDate = document.getElementById("sprintEndingDate").value;
    let sprintStatus ="";

    if (active.checked) {
        sprintStatus = "Active";
    }
    else if (completed.checked) {
        sprintStatus = "Completed";
    }

    sprint.sprintName = sprintName;
     if (sprintEndingDate >= sprintStartingDate) {
        sprint.sprintStartingDate = sprintStartingDate;
        sprint.sprintEndingDate = sprintEndingDate;
    }
    else {
        alert("Please ensure that the End Date must be later than Start Date. Try changing the dates, and try again.");
        return false;
    }
    sprint.sprintStatus = sprintStatus;
    updateLSData(SPRINT_KEY, sprint);
    console.log(sprint)

    console.log(savedSprints._allSprint);

    savedSprints._allSprint.push([sprint]);

    updateLSData(SPRINT_LIST_KEY, savedSprints);

    window.location = "sprintlist.html";
}
