// Check local storage whether there is data
// If there is, store it into savedTasks
if (checkLSData(MEMBER_LIST_KEY)) {
    savedMember.fromData(memberListData);
  }
  
  // adds a new member
  function addNewMember() {
    let newMemberNameRef = document.getElementById("memberName");

    let newMemberName = newMemberNameRef.value;
    
    if (newMemberName==""){
      console.log(newMemberName);
      alert('member namecannot be empty');
      return;
   }
  
   else{
    member.memberName = newMemberName;
    updateLSData(MEMBER_KEY, member);

    // console.log(member)
    // console.log(savedMember._allMember);

    savedMember._allMember.push([member]);
    updateLSData(MEMBER_LIST_KEY, savedMember);
  
    window.location = "teamdashboard.html";
  
   }
  }
