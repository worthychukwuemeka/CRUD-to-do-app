const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector("#add-task");
const incompleteTasksHolder = document.querySelector("#incomplete-tasks");
const completedTasksHolder = document.querySelector("#completed-tasks");

// Add a new task
const addTask = () => {
    if (!taskInput.value) {
        return;
    }

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    label.textContent = taskInput.value;
    taskInput.value = "";
    input.type = "text";
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Edit an existing task
const editTask = function() {
    const listItem = this.parentNode;

    const input = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editButton = listItem.querySelector(".edit");

    if (listItem.classList.contains("editMode")) {
        listItem.className = "";
        label.textContent = input.value;
        editButton.innerHTML = '<i class="material-icons">edit</i>';
    } else {
        listItem.className = "editMode";
        input.value = label.textContent;
        editButton.innerHTML = '<i class="material-icons">save</i>';
    }
}

// Delete an existing task
const deleteTask = function() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}

// Mark a task as complete
const taskCompleted = function() {
    const listItem = this.parentNode;
    bindTaskEvents(listItem, taskIncomplete);
    completedTasksHolder.appendChild(listItem);
}

// Mark a task as incomplete
const taskIncomplete = function() {
    const listItem = this.parentNode;
    bindTaskEvents(listItem, taskCompleted);
    incompleteTasksHolder.appendChild(listItem);
}

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    checkBox.addEventListener("change", checkBoxEventHandler);
    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
}

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Set the click handlers
addButton.addEventListener("click", addTask);

// Function to set reminders and show alerts
const setReminder = () => {
    const items = document.querySelectorAll("#incomplete-tasks li");
    items.forEach((item) => {
        const input = item.querySelector("input[type=text]");
        const label = item.querySelector("label");

        input.addEventListener("change", () => {
            const reminderTime = input.valueAsNumber;

            if (!isNaN(reminderTime)) {
                setTimeout(() => {
                    alert(`Reminder: "${label.textContent}"`);
                }, reminderTime - Date.now());
            }
        });
    });
};

setReminder();
