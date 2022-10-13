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
			<div class="mdl-cell mdl-cell--4-col" style="background-color:#FFFFFF;">
				<div class="demo-list-action mdl-list">
                    <div class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-avatar">person</i>
                            <membername>${arr[i][0]._memberName}</membername>
                        </span>
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteMember(${i})">  <i class="material-icons">delete</i> </button>
                    </div>
				</div>
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
