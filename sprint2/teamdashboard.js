// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(MEMBER_LIST_KEY)) {
	savedMember.fromData(memberListData);
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
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteMember(${i})">  <i class="material-icons">delete</i> </button>
				
			</div>	`
	}
	memberList.innerHTML = memberListInnerHTML;
}

function deleteMember(index){
	savedMember._allMember.splice(index, 1);
	updateLSData(MEMBER_LIST_KEY,savedMember);
	pageLoad();
}

pageLoad();
