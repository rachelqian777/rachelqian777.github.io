//Initial References
const newTaskInput = document.querySelector("#new-task input"); //Get what's in the input field
const tasksDiv = document.querySelector("#tasks"); //the list of tasks
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
	updateNote = "";
	count = Object.keys(localStorage).length;
	displayTasks();
};

//Function to Display The Tasks
const displayTasks = () => {
	if (Object.keys(localStorage).length > 0) {
    	tasksDiv.style.display = "inline-block"; //Check if there's input
  	} else {
		tasksDiv.style.display = "none";
	}

//Clear the tasks in the input field
tasksDiv.innerHTML = "";

//Fetch All The Keys in local storage
let tasks = Object.keys(localStorage);
tasks = tasks.sort(); //???

for (let key of tasks) {
	let classValue = "";

	//Get all values
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task"); //add a class
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`; //Give the inner HTML a value
    //localstorage would store boolean as string so we parse it to boolean back
    let editButton = document.createElement("button");
    editButton.classList.add("edit"); //add a class
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`; //add the edit icon
    if (!JSON.parse(value)) { //???
      editButton.style.visibility = "visible";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.appendChild(editButton); //append
    taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`; //add the delete button
    tasksDiv.appendChild(taskInnerDiv);
}

  //tasks completed
  tasks = document.querySelectorAll(".task"); //get all elements with the class tasks
  tasks.forEach((element, index) => {
	  element.onclick = () => { //when clicked
      //local storage update
		  if (element.classList.contains("completed")) {
    		updateStorage(element.id.split("_")[0], element.innerText, false);
		  } else {
			updateStorage(element.id.split("_")[0], element.innerText, true);
		  }
	  };
  });

//Edit Tasks
editTasks = document.getElementsByClassName("edit");
Array.from(editTasks).forEach((element, index) => { //iterate through editTasks
	element.addEventListener("click", (e) => { //add an eventLister click //What's the e?
    	//Stop propogation to outer elements 
		e.stopPropagation();
		//disable other edit buttons when one task is being edited
		disableButtons(true);
		//update input value and remove div
		let parent = element.parentElement;
		newTaskInput.value = parent.querySelector("#taskname").innerText; //update the text
		//set updateNote to the task that is being edited
		updateNote = parent.id;
		//remove task
		parent.remove();
    });
  });

  //Delete Tasks
deleteTasks = document.getElementsByClassName("delete");
Array.from(deleteTasks).forEach((element, index) => {
	element.addEventListener("click", (e) => {
		e.stopPropagation();
		//Delete from local storage and remove div
		let parent = element.parentElement;
		removeTask(parent.id);
		parent.remove();
		count -= 1;
    });
  });
};

//Disable Edit Button
const disableButtons = (bool) => {
	let editButtons = document.getElementsByClassName("edit");
	Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Remove Task from local storage
const removeTask = (taskValue) => {
	localStorage.removeItem(taskValue);
	displayTasks();
};

//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
	localStorage.setItem(`${index}_${taskValue}`, completed);
	displayTasks();
};

//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => { //#push is the "add" button we have in the HTML file
	//Enable the edit button
	disableButtons(false);
	if (newTaskInput.value.length == 0) {
    	alert("Please Enter A Task"); //if the input is empty, display a warning
    } else {
        //Store locally and display from local storage
    	if (updateNote == "") {
        //new task
        updateStorage(count, newTaskInput.value, false);
        } else {
        	//update task
			let existingCount = updateNote.split("_")[0];
            removeTask(updateNote);
            updateStorage(existingCount, newTaskInput.value, false);
            updateNote = "";
        }
    count += 1;
    newTaskInput.value = "";
  }
});