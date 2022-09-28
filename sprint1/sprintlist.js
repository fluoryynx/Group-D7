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
		<div class="mdl-cell mdl-cell--4-col" >
			<sprint>Sprint ${Number(i) + 1}</sprint>
			<br><br>
				<div class="mdl-card">
					<div class="mdl-card__supporting-text">
						<div class="row">
							<div class="column">
								<sprintname>Sprint </sprintname><sprintnametext>${arr[i][0]._sprintName}</sprintnametext>
								<br><br>
								<fromdate>From:</fromdate>
								<br>
								<fromdatetext>${arr[i][0]._sprintStartingDate}</fromdatetext>
								<img src="img/date.png" class="dateimgsprint">
							</div>
							<div class="column2">
								<br><br>
								<todate>To: </todate><br><todatetext>${arr[i][0]._sprintEndingDate}</todatetext>
								<img src="img/date.png" class="dateimgsprint">
							</div>
							</b><${arr[i][0]._sprintStatus}> ${arr[i][0]._sprintStatus} </${arr[i][0]._sprintStatus}>
							<br><br>
							<p>
							<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<button onclick="editSprint(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
							</p>
						</div>
					</div>
					<div class="mdl-card__actions mdl-card--border">
					</div>
				</div>
			</div>  `
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
  