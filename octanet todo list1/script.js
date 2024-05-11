
function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var taskDate = document.getElementById("taskDate").value;
    var taskTime = document.getElementById("taskTime").value;
    if (taskInput === '' || taskDate === '' || taskTime === '') {
        alert("Please enter task details!");
        return;
    }
    
    
    var task = {
        name: taskInput,
        date: taskDate,
        time: taskTime,
        completed: false 
    };

    
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    tasks.push(task);

    
    localStorage.setItem('tasks', JSON.stringify(tasks));

    
    updateTaskList(tasks);

    
    document.getElementById("taskInput").value = '';
    document.getElementById("taskDate").value = '';
    document.getElementById("taskTime").value = '';
}


function updateTaskList(tasks) {
    var ul = document.getElementById("taskList");
    ul.innerHTML = ''; 

    tasks.forEach(function(task, index) {
        var li = document.createElement("li");
        li.textContent = task.name + ' at ' + task.date + ' ' + task.time;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            
            tasks.splice(index, 1);

            
            localStorage.setItem('tasks', JSON.stringify(tasks));

            
            updateTaskList(tasks);
        };

        var completeBtn = document.createElement("button");
        completeBtn.innerHTML = "Complete";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = function() {
            
            task.completed = !task.completed;

            
            localStorage.setItem('tasks', JSON.stringify(tasks));

            
            updateTaskList(tasks);
        };

        li.appendChild(deleteBtn);
        li.appendChild(completeBtn);
        
        
        if (task.completed) {
            li.classList.add("completed");
        }
        
        ul.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    updateTaskList(tasks);
});
