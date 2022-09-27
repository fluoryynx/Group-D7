// Check local storage whether there is data
// If there is, store it into savedSprints
if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

//savedSprints=retrieveLSData(SPRINT_LIST_KEY);

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
		console.log(arr[i][0])
		sprintListInnerHTML += `  
		<div class="mdl-cell mdl-cell--3-col" >
            <h5> 
            Sprint ${Number(i) + 1}
            </h5>
								<div class="mdl-card"  > 
									<div class="mdl-card__supporting-text"> 
                                    <b>Sprint name:</b> ${arr[i]._sprintName}
                                    <br><br>
									<b>From:</b> ${arr[i]._sprintStartingDate}
									<br><br>
									<b>To: </b> ${arr[i]._sprintEndingDate}
									<br><br>
									<b> Time remaining: </b>
									<p id="timer"></p>
									<b> Status: </b><${arr[i]._sprintStatus}> ${arr[i]._sprintStatus} </${arr[i]._sprintStatus}>
									<br><br>
									<b><u> Description: </u></b>
									<br>
									${arr[i]._sprintInfo}
									<p>
									<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteSprint(${i})">  <i class="material-icons">delete</i> </button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<button onclick="editSprint(${i})" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"> <i class="large material-icons">edit</i> </button>
									</p>
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div> 
								</div> 
							</div>	`
		countdown(arr[i]._sprintEndingDate);
	}
	sprintList.innerHTML = sprintListInnerHTML;
}


function deleteSprint(index){
	deleteIndex = index
	savedSprints._allSprint.splice(index, 1);
	updateLSData(SPRINT_LIST_KEY,savedSprints);
	pageLoad();
}

function countdown(endDate){
	let countDownDate = new Date(endDate+ " 23:59:59").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "overdue";
  }
}, 1000);
}


window.onload = function () {
    pageLoad();
};
