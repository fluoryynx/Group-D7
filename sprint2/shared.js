// Uncomment the line below to clear localStorage:
// window.localStorage.clear()

// Declaration of constants for task
const TASK_KEY="ufeh98eirojgfed";
const TASK_LIST_KEY="duh5498treifnv";
const LIST_INDEX_KEY="9438hrtfio";

// Declaration of constants for sprint
const SPRINT_KEY="tasksinthesprintlist";
const SPRINT_LIST_KEY="sprintlistkey";
const SPRINT_INDEX_KEY="sprintindexkey";
const SPRINT_NAME_KEY="sprintnamekey";

// Declaration of constants for member
const MEMBER_KEY="memberkey";
const MEMBER_LIST_KEY="memberlistkey";

class Task {
    constructor(name, date,priority,tag,status,description,type,sprint,isSprint=false) {
        this._taskName = name;
        this._taskAssignee=[];
        this._taskDate=date;
        this._taskPriority=priority;
        this._taskStatus=status;
        this._taskDescription=description;
        this._taskType=type;
        this._taskTag=tag;
        this._taskSprint=sprint;
        this._inSprint=isSprint;
        this._taskDuration=[];
        this._startTime="";
        this._taskCompletionTime="";
    }
    
    //getters
    get taskName() {
        return this._taskName;
    }

    get taskCompletionTime(){
        return this._taskCompletionTime;
    }

    get taskAssignee() {
        return this._taskAssignee;
    }

    get taskDate() {
        return this._taskDate;
    }

    get taskPriority() {
        return this._taskPriority;
    }

    get taskStatus() {
        return this._taskStatus;
    }

    get taskDescription() {
        return this._taskDescription;
    }

    get taskType() {
        return this._taskType;
    }

    get taskTag(){
        return this._taskTag;
    }

    get taskSprint(){
        return this._taskSprint;
    }

    get inSprint(){
        return this._inSprint;
    }

    get taskDuration(){
        return this._taskDuration;
    }

    get startTime(){
        return this._startTime;
    }

    //setters
    set taskName(newtaskName) {
        this._taskName = newtaskName;
    }

    set taskAssignee(newtaskAssignee) {
        this._taskAssignee = newtaskAssignee;
    }

    set taskDate(newtaskDate) {
        this._taskDate = newtaskDate;
    }

    set taskPriority(newtaskPriority) {
        this._taskPriority = newtaskPriority;
    }

    set taskStatus(newtaskStatus) {
        this._taskStatus = newtaskStatus;
    }

    set taskType(newtaskType) {
        this._taskType = newtaskType;
    }

    set taskDescription(newtaskDescription) {
        this._taskDescription = newtaskDescription;
    }

    set taskTag(newTaskTag){
        this._taskTag=newTaskTag;
    }

    set taskSprint(newTaskSprint){
        this._taskSprint=newTaskSprint;
    }

    set inSprint(newInSprint){
        this._inSprint=newInSprint;
    }

    set taskDuration(newtaskDuration){
        this._taskDuration=newtaskDuration;
    }

    set taskTime(newTaskTime){
        this._taskName=newTaskTime;
    }

    set taskCompletionTime(newTaskCompletionTime){
this._taskCompletionTime=newTaskCompletionTime;
    }

    addAssignee(assignee) {
        this._taskAssignee.push(assignee);
    }
    
    addTaskDuration(newtaskDuration){
        this._taskDuration.push(newtaskDuration);
    }

    fromData(data) {
        this._taskName = data._taskName;
       // this._taskAssignee=data._taskAssignee;
        this._taskDate=data._taskDate;
        this._taskPriority=data._taskPriority;
        this._taskStatus=data._taskStatus;
        this._taskDescription=data._taskDescription;
        this._taskType=data._taskType;
        this._taskTag=data._taskTag;
        this._taskAssignee=data._taskAssignee;
        this._taskSprint=data._taskSprint;
        this._inSprint=data._inSprint;
        this._taskDuration=data._taskDuration;
        this._taskTime=data._taskTime;
        this._taskCompletionTime=data._taskCompletionTime;

        // this._taskAssignee=[];
        // for (let i in data.taskAssignee) {
        //     let assigneeName = data._taskAssignee[i].assigneeName;
        //     let assignee = new Assignee(assigneeName);
        //     this._taskAssignee.push(assignee);
        // }
    }
}

class SavedTasks{
    constructor() {
        this._allTask = [];
    }

    get allTask() {
        return this._allTask;
    }

    set allTask(newAllTask) {
        this._allTask = newAllTask;
    }

    addTask(task) {
            this._allTask.push(task);
    }

    fromData(data) {
        this._allTask = [];

        for (let i in data._allTask) {
             let obj = {
                 taskName: data._allTask[i].taskName,
                 taskAssignee: data._allTask[i].taskAssignee,
                 taskDate: data._allTask[i].taskDate,
                 taskPriority: data._allTask[i].taskPriority,
                 taskStatus: data._allTask[i].taskStatus,
                 taskType: data._allTask[i].taskType,
                 taskDescription: data._allTask[i].taskDescription,
                 taskTag: data._allTask[i].taskTag,
                 taskDuration: data._allTask[i].taskDuration,
                 taskTime: data._allTask[i].taskTime,
                 taskCompletionTime: data._allTask[i].taskCompletionTime
             }
             this._allTask.push(obj)
         }
         this._allTask = data._allTask;
    }
}


function dataExistance(key) {
    let data = localStorage.getItem(key);
    console.log(data);
    if (data) {
        return true;
    }
    else {
        return false
    }
}


class Assignee{
    constructor(name){
        this._assigneeName=name;
    }

    getAssigneeName(){
        return this._assigneeName;
    }

    setAssigneeName(newAssigneeName){
        this._assigneeName=newAssigneeName;
    }

    fromData(data){
        this._assigneeName=data._assigneeName;
    }
}

class TaskDuration{
    constructor(duration){
        this._taskDuration=duration;
    }

    getTaskDuration(){
        return this._taskDuration;
    }

    setAssigneeName(newTaskDuration){
        this._taskDuration=newTaskDuration;
    }

    fromData(data){
        this._taskDuration=data._taskDuration;
    }
}


class Sprint {
    constructor(name, startingdate="", endingdate="",status="have_not_started") {
        this._sprintName = name;
        this._sprintStartingDate =startingdate;
        this._sprintEndingDate = endingdate;
        this._sprintStatus = status;
    }

    //getters
    get sprintName() {
        return this._sprintName;
    }

    get sprintStartingDate() {
        return this._sprintStartingDate;
    }

    get sprintEndingDate() {
        return this._sprintEndingDate;
    }

    get sprintStatus() {
        return this._sprintStatus;
    }

    //setters
    set sprintName(newSprintName) {
        this._sprintName = newSprintName;
    }

    set sprintStartingDate(newSprintStartingDate) {
        this._sprintStartingDate = newSprintStartingDate;
    }

    set sprintEndingDate(newSprintEndingDate) {
        this._sprintEndingDate = newSprintEndingDate;
    }
   
    set sprintStatus(newSprintStatus) {
        this._sprintStatus = newSprintStatus;
    }

    fromData(sprintData) {
        this._sprintName = sprintData._sprintName;
        this._sprintStartingDate = sprintData._sprintStartingDate;
        this._sprintEndingDate = sprintData._sprintEndingDate;
        this._sprintStatus = sprintData._sprintStatus;
    }
}

class SavedSprints{
    constructor() {
        this._allSprint = [];
    }

    get allSprint() {
        return this._allSprint;
    }

    set allSprint(newAllSprint) {
        this._allSprint = newAllSprint;
    }

    addSprint(sprint) {
            this._allSprint.push(sprint);
    }

    fromData(sprintData) {
        this._allSprint = [];

        for (let i in sprintData._allSprint) {
             let obj = {
                sprintName: sprintData._allSprint[i].sprintName,
                sprintStartingDate: sprintData._allSprint[i].sprintStartingDate,
                sprintEndingDate: sprintData._allSprint[i].sprintEndingDate,
                sprintStatus: sprintData._allSprint[i].sprintStatus,
             }
             this._allSprint.push(obj)
         }
         this._allSprint = sprintData._allSprint;
    }
}

class Member {
    constructor(name) {
        this._memberName = name;
    }

    //getters
    get memberName() {
        return this._memberName;
    }

    //setters
    set memberName(newMemberName) {
        this._memberName = newMemberName;
    }

    fromData(memberData) {
        this._memberName = memberData._memberName;
    }
}

class SavedMembers{
    constructor() {
        this._allMember = [];
    }

    get allMember() {
        return this._allMember
    }

    set allMember(newAllMember) {
        this._allMember = newAllMember;
    }

    addMember(member) {
        this._allMember.push(member);
    }

    fromData(memberData) {
        this._allMember = [];

        for (let i in memberData._allMember) {
             let obj = {
                memberName: memberData._allMember[i].memberName,
             }
             this._allMember.push(obj)
         }
         this._allMember = memberData._allMember;
    }
}

// Declaration of global variables for task
let task = new Task();
let savedTasks = new SavedTasks();
let assignee = new Assignee();
let taskDuration = new TaskDuration();
let taskListData = retrieveLSData(TASK_LIST_KEY);
let taskData = retrieveLSData(TASK_KEY);

// Declaration of global variables for sprint 
let sprint = new Sprint();
let savedSprints = new SavedSprints();
let sprintListData = retrieveLSData(SPRINT_LIST_KEY);
let sprintData = retrieveLSData(SPRINT_KEY);

// Declaration of global variables for member 
let member = new Member();
let savedMember = new SavedMembers();
let memberListData = retrieveLSData(MEMBER_LIST_KEY);
let memberData = retrieveLSData(MEMBER_KEY);
