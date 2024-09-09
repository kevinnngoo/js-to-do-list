const taskInput = document.getElementById("taskInput");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (taskInput.value.trim() === '') {
        console.log('You must add something.');
    } else {
        let li = document.createElement("li");

        // Create the radio button
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "tasks";
        li.appendChild(radio);

        // Create the label for the task
        const label = document.createElement("label");
        label.textContent = taskInput.value;
        li.appendChild(label);

        // Add a delete button
        let span = document.createElement('span');
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);

        listContainer.appendChild(li); 
        saveData(); // Save data after adding a new task
    }
    taskInput.value = "";
}

// Event listener for marking tasks and deleting them
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "LABEL") {
        e.target.closest("li").classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load tasks from localStorage on page load
function showList() {
    listContainer.innerHTML = localStorage.getItem('data');
    // Re-attach the event listeners to the newly loaded tasks
    listContainer.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', function (e) {
            if (e.target.tagName === "LI" || e.target.tagName === "LABEL") {
                e.target.closest("li").classList.toggle("checked");
                saveData();
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
        });
    });
}

// Call the function to show the list on page load
showList();
