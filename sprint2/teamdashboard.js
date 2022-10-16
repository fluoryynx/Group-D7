// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(MEMBER_LIST_KEY)) {
	savedMember.fromData(memberListData);
}

/**
 * pageLoad function
 * runs when the list.html page is load
 * use to show list of planned vacation on the page in mdl cards sorted by date
 */
 function pageLoad() {
	let memberList = document.getElementById("memberList");
	let arr = savedMember._allMember

	let memberListInnerHTML = "";
	for (let i in arr) {
			memberListInnerHTML += `  
			<div class="mdl-cell mdl-cell--4-col" style="background-color:#ebdae3; border: 1px solid black; border-radius: 40px; height: auto">

                        <span class="mdl-list__item-primary-content">
							<img src="img/assignee.png" alt="lowpic" class="assigneeimg">
                            <membername>&nbsp;&nbsp;${arr[i][0]._memberName}&nbsp;&nbsp;</membername>
                        </span>
						<button class="mdl-button mdl-js-button mdl-button--primary" onclick="viewMemberDetails(${i})">
  							Details
						</button>
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteMember(${i})">  <i class="material-icons">delete</i> </button>
				
			</div>	`
	}
	memberList.innerHTML = memberListInnerHTML;
}

function viewMemberDetails(index){
	updateLSData(MEMBER_NAME_KEY, index)
    window.location = "teammemberstats.html"
}

function deleteMember(index){
	savedMember._allMember.splice(index, 1);
	updateLSData(MEMBER_LIST_KEY,savedMember);
	pageLoad();
}

let memberList = []
let taskDurationList = []
let arr = []
let arr_member = savedMember._allMember

console.log("member", arr_member)

for (let i in savedTasks._allTask) {
	arr.push(savedTasks._allTask[i][0])
}

console.log("task", arr)
console.log('a', arr[1]._taskAssignee[0])

for (let i = 0; i < arr_member.length; i++) {
	memberList.push(arr_member[i][0]._memberName)
}

for (let i = 0; i < arr.length; i++) {
	for (let j = 0; j < arr[i]._taskAssignee.length; j++) {
		for (let k = 0; k < memberList.length; k++) {
			if (arr[i]._taskAssignee[j] == memberList[k]){ 
				taskDurationList.push(arr[i]._taskTimeinHours);
			}
		}
		
	}
}

console.log("task list", taskDurationList);
console.log("members list", memberList);

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Member', 'Number of Hours'],
  [memberList[0], taskDurationList[0]],
  [memberList[1], taskDurationList[1]],
  [memberList[2], taskDurationList[2]],
  [memberList[3], taskDurationList[3]],
  [memberList[4], taskDurationList[4]],
  [memberList[5], taskDurationList[5]],
  [memberList[6], taskDurationList[6]],
  [memberList[7], taskDurationList[7]],
  [memberList[8], taskDurationList[8]],
  [memberList[9], taskDurationList[9]]
]);

var options = {
  title:'Total Number of Hours spent per member'
};

var chart = new google.visualization.BarChart(document.getElementById('myChart'));
  chart.draw(data, options);
}

pageLoad();
