document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks(); // Load saved tasks on page load

    function addTask(taskTextFromLoad = null) {
        const taskText = taskTextFromLoad || taskInput.value.trim();

        if (taskText !== "") {
            // Create li element
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
        const removeBtn = document.createElement('button');
         removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); 

            // Assign onclick event to remove task
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                saveTasks(); // Update storage
            };

            // Append remove button to li
            li.appendChild(removeBtn);

            // Append li to taskList
            taskList.appendChild(li);

            // Save new task only if it’s not from storage
            if (!taskTextFromLoad) {
                saveTasks();
            }

            // Clear input field
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const textOnly = li.childNodes[0].textContent;
            tasks.push(textOnly);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTask(task));
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key in input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
