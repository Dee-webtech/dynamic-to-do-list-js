// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    /**
     * Add a new task to the list
     * @param {string|null} taskTextFromLoad - Task text from storage (if any)
     */
    function addTask(taskTextFromLoad = null) {
        // Get task text either from saved data or from the input field
        const taskText = taskTextFromLoad || taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add click event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update localStorage after removal
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the list item to the task list
        taskList.appendChild(li);

        // If the task is new (not loaded from storage), save it
        if (!taskTextFromLoad) {
            saveTasks();
            taskInput.value = ""; // Clear input field
        }
    }

    /**
     * Save all tasks to localStorage
     */
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // li.childNodes[0] contains the text without the button
            const textOnly = li.childNodes[0].textContent;
            tasks.push(textOnly);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Load tasks from localStorage
     */
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTask(task));
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
