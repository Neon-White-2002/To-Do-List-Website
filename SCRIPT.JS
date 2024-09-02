// JAVA-SCRIPT:
const input_text = document.getElementById("input-task");
const submit_task = document.getElementById("submit-task");
const task_list = document.getElementById("task-list");

// ADD - NEW TASKS:
submit_task.addEventListener("click", () =>
{
    if(input_text.value == "")
    {
        console.log("Please, Enter Some Task...")
    }
    else
    {
        var task_name = input_text.value;
        var task = document.createElement("li");

        task.innerHTML = 
        `<span>${task_name}</span>
        
        <button class="task-complete" onclick = "task_complete(this.parentNode)">
            <i class="fa fa-check"></i>
        </button>

        <button class="delete-task" onclick = "delete_tasks(this.parentNode)">
            <i class="fas fa-trash"></i>
        </button>`;

        task_list.appendChild(task);
        input_text.value = "";

        store_tasks();
    }
});

// TASK - COMPLETE - FUNCTION: 
function task_complete(current_task)
{
    for (let i = 0; i < task_list.children.length; i++) 
    {
        if(task_list.children[i] == current_task)
        {
            current_task.style.textDecoration = "line-through";
            store_tasks();
        }
    }
}

// TASK - DELETE - FUNCTION:
function delete_tasks(current_task)
{
    for (let i = 0; i < task_list.children.length; i++) 
    {
        if(task_list.children[i] === current_task)
        {
            task_list.removeChild(current_task);
        }

        store_tasks();
    }
}

// STORE - FUNCTION (STORE'S - ALL (TASKS)):
function store_tasks()
{
    var tasks_list = [];

    for(let i = 0; i < task_list.children.length; i++)
    {
        tasks_list.push(task_list.children[i].textContent.trim());
    }

    localStorage.setItem("tasks", JSON.stringify(tasks_list));
}

// LOAD FUNCTION (LOAD - ALL (TASKS)):
function load_tasks()
{
    var tasks = JSON.parse(localStorage.getItem("tasks"));

    for(let i = 0; i < tasks.length; i++)
    {
        var new_tasks = document.createElement("li");

        new_tasks.innerHTML = 
        `<span>${tasks[i]}</span>
                    
        <button class="task-complete" onclick = "task_complete(this.parentNode)">
            <i class="fa fa-check"></i>
        </button>

        <button class="delete-task" onclick = "delete_tasks(this.parentNode)">
            <i class="fas fa-trash"></i>
        </button>`;

        task_list.appendChild(new_tasks);
    }
}

// LOAD - ALL (TASKS):
window.onload = () =>
{
    load_tasks();
}