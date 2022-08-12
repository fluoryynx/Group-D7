
const TASK_KEY="ufeh98eirojgfed";
const TASK_LIST_KEY="duh5498treifnv";
const LIST_INDEX_KEY="9438hrtfio";

class Task {
    constructor(name, assignee, date,priority,tag,status,description,type) {
        this._taskName = name;
        this._taskAssignee=assignee;
        this._taskDate=date;
        this._taskPriority=priority;
        this._taskStatus=status;
        this._taskDescription=description;
        this._taskType=type;
        this._taskTag=tag;
    }
    //getters
    get taskName() {
        return this._taskName;
    }

    get taskAssignee() {
        return this.taskAssignee;
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

    fromData(data) {
        this._taskName = data._taskName;
        this._taskAssignee=data._taskAssignee;
        this._taskDate=data._taskDate;
        this._taskPriority=data._taskPriority;
        this._taskStatus=data._taskStatus;
        this._taskDescription=data._taskDescription;
        this._taskType=data._taskType;
        this._taskTag=data._taskTag;
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
                 taskTag: data._allTask[i].taskTag
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

let task = new Task();
let savedTasks=new SavedTasks();

