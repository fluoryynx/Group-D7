// Check local storage whether there is data
// If there is, store it into savedSprints
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

let arr = savedSprints._allSprint;

/**
 * pageLoad function
 * runs when the list.html page is load
 * use to show list of planned vacation on the page in mdl cards sorted by date
 */
 function pageLoad() {
	let sprintList = document.getElementById("sprintList");

	let sprintListInnerHTML = "";
	for (let i in arr) {
		sprintListInnerHTML += `  
		<div class="mdl-cell mdl-cell--3-col" >
            <h5> 
            Sprint ${Number(i) + 1}
            </h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
                                    <b>Sprint name:</b> ${arr[i][0]._sprintName}
                                    <br><br>
									<b>From:</b> ${arr[i][0]._sprintStartingDate}
									<br><br>
									<b>To: </b> ${arr[i][0]._sprintEndingDate}
									<br><br>
									<b> Status: </b><${arr[i][0]._sprintStatus}> ${arr[i][0]._sprintStatus} </${arr[i][0]._sprintStatus}>
									<br><br>
									<p>
									<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</p>
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div> 
								</div> 
							</div>	`
	}
	sprintList.innerHTML = sprintListInnerHTML;
}


function deleteSprint(index){
	deleteIndex = index
	savedSprints._allSprint.splice(index, 1);
	updateLSData(SPRINT_LIST_KEY,savedSprints);
	pageLoad();
}


window.onload = function () {
    pageLoad();
};

