console.log("start task 1 - day 1");
let starterId = 656;
let tasks = [];
const add = document.querySelector(".add");
const tableBody = document.querySelector("table>tbody");
const checked = document.querySelectorAll("input[type='checkbox']");

console.log("checked", checked);

const tableRow = function (status, task, id) {
  return ` <tr>
          <td><input type="checkbox" name="status" ${
            status === 1 ? "checked" : ""
          } data-task-id=${id}></td>
          <td class="${status === 1 ? "line-through" : ""}">${task}</td>
          <td><button class="reset remove-task" data-task-id='${id}'><svg class="remove-task" data-task-id='${id}' xmlns="http://www.w3.org/2000/svg" height="24px"
                      viewBox="0 -960 960 960" width="24px" fill="#f00">
                      <path
                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg></button></td>
      </tr>`;
};
console.log(add, tableBody);

add.addEventListener("click", function () {
  const taskName = document.querySelector("input[name='task']");

  if (!taskName.value.trim()) return;

  const newTask = {
    id: starterId,
    status: 0,
    task: taskName.value.trim(),
  };
  starterId++;
  taskName.value = "";
  tasks.push(newTask);
  console.log("task name", taskName);
  console.log("tasks", tasks);

  //  call render tasks
  renderTasks();
});

function renderTasks() {
  if (!tasks.length) {
    tableBody.innerHTML = "";
    return;
  }
  const renderTasks = tasks.map((ele) =>
    tableRow(ele.status, ele.task, ele.id)
  );
  console.log("render tasks", renderTasks);
  tableBody.innerHTML = "";
  tableBody.insertAdjacentHTML("afterbegin", renderTasks.join());
}

// event listener for switch task status and delete task
document.addEventListener("click", function (event) {
  const element = event.target;

  if (element.getAttribute("type") === "checkbox") {
    const taskId = Number(element.dataset.taskId);
    if (isNaN(taskId)) {
      console.error("Invalid task ID:", element.dataset.taskId);
      return;
    }

    const taskStatus = element.checked ? 1 : 0;
    tasks = tasks.map((ele) => {
      if (ele.id === taskId) {
        return { ...ele, status: taskStatus };
      }
      return ele;
    });
    console.log("Updated tasks:", tasks);
    renderTasks();
  } else if (element.closest(".remove-task")) {
    const removeButton = element.closest(".remove-task");
    const taskId = Number(removeButton.dataset.taskId);
    console.log("remove btn", removeButton);
    console.log("task id", taskId);

    if (isNaN(taskId)) {
      console.error("Invalid task ID:", removeButton.dataset.taskId);
      return;
    }
    console.log("tasks", tasks);
    tasks = tasks.filter((ele) => ele.id !== taskId);
    console.log("Tasks after removal:", tasks);

    renderTasks();
  }
});
