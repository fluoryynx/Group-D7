// Check local storage whether there is data
// If there is, store it into savedTasks

tempIndex = retrieveLSData(MEMBER_NAME_KEY);
console.log(tempIndex);

if (checkLSData(TASK_LIST_KEY)) {
	savedTasks.fromData(taskListData);
}

if (checkLSData(MEMBER_LIST_KEY)) {
	savedMember.fromData(memberListData);
}

if (checkLSData(SPRINT_LIST_KEY)) {
	savedSprints.fromData(sprintListData);
}

let memberName = savedMember._allMember[tempIndex][0]._memberName;
let filteredTask="";
let memberList = []
let taskDurationList = []
let arr = []
let arr_member = savedMember._allMember
let assignedTask = [];

for (let i in savedTasks._allTask) {
	arr.push(savedTasks._allTask[i][0])
}

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

console.log("member", arr_member)
console.log("task", arr)
console.log('1', arr[1]._taskAssignee[0])
console.log("task list", taskDurationList);
console.log("members list", memberList);

function pageLoad() {

    filteredTask = memberName

	let taskList = document.getElementById("taskList");
    document.getElementById("member_statistics_title").innerHTML = "&nbsp; &nbsp;" + "Member Statistics - " + memberName
	let arr = savedTasks._allTask;

    if (filteredTask != ""){
        arr = searchAssignedTask(filteredTask)
    }

	let taskListInnerHTML = "";
	for (let i in arr) {
            taskListInnerHTML += `  
			<div class="mdl-cell mdl-cell--4-col" >
									<h5> 
									</h5>
										<div class="demo-list-action mdl-list"> 
                                        <div class="mdl-list__item">
                                        <span class="mdl-list__item-primary-content">
                                            <i class="material-icons mdl-list__item-avatar">list</i>
                                            <span>
                                            ${arr[i][0]._taskName}
                                            
                                            </span>
                                        </span>
										</div>
									</div> 
								</div>	`
		}
	taskList.innerHTML = taskListInnerHTML;
}

//one function to calculate average time spent
//1. get value from input date
//2. use that to count average time spent
// create an array of date
var startDate = savedSprints._allSprint[tempIndex]._sprintStartingDate; //YYYY-MM-DD
var endDate = savedSprints._allSprint[tempIndex]._sprintEndingDate; //YYYY-MM-DD

var getDateArray = function(start, end) {
    var arr = new Array();
    var date = new Date(start);
	var end2 = new Date(end)

    while (date <= end2) {
        arr.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return arr;
}

function getInputDate(start, end){
    daterange = getDateArray(start, end)
    var formattedDate = new Array();

    for (var i = 0; i < daterange.length; i++) {
        var d = new Date(daterange[i]),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        formattedDate.push([year, month, day].join('-'));
    }
    console.log(formattedDate)
    return formattedDate
}

function calAverageTimePerDay(array1){
    sum = 0
    result = 0
    for (let i = 0; i < assignedTask.length; i++){
        sum += assignedTask[i][0]._taskTimeinHours
        result = sum / array1.length
    }
    console.log(sum)
    console.log(result)
    return result
}
// for (var i = 0; i < dateArr.length; i++) {
// 	var d = new Date(dateArr[i]),
// 		month = '' + (d.getMonth() + 1),
// 		day = '' + d.getDate(),
// 		year = d.getFullYear();

// 	if (month.length < 2) 
// 		month = '0' + month;
// 	if (day.length < 2) 
// 		day = '0' + day;
// 	formattedDate.push([year, month, day].join('-'));
// }

// function linspace(startVal, endVal, space){
// 	var arr = [];
// 	var step = (endVal - startVal) / (space - 1);
// 	for (var i = 0; i < space; i++){
// 		arr.push(startVal + (step * i));
// 	}
// 	return arr
// }

function searchAssignedTask(name){
    
    for (let i in savedTasks._allTask){
        if (savedTasks._allTask[i][0]._taskAssignee == name){
            assignedTask.push([savedTasks._allTask[i][0]])
        }
    }
    return assignedTask
}

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