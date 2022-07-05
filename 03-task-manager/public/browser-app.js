const formDOM = document.querySelector(".task-form");
const formInput = document.querySelector(".task-input");
const loadingDOM = document.querySelector(".loading-text");
const tasksDOM = document.querySelector(".tasks");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    console.log(tasks);
    console.log(tasks.length);
    if (tasks.length === 0) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { name, _id: taskID, completed } = task;
        return `<div class="inner-task-container">
      <div class="individual-task ${
        completed && "task-completed"
      }" >${name}</div>
      <!-- edit link -->
        <div><a href="./task.html?id=${taskID}">edit</a></div>
        <button type="button" data-id="${taskID}" class="delete-btn" >delete</button>
      </div>
    </div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
    tasksDOM.innerHTML = " <h5>there has been an error, try again later</h5>";
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const element = e.target;
  if (element.classList.contains("delete-btn")) {
    const id = element.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
    formAlertDOM.innerText = `task deleted`;
    setTimeout(() => {
      formAlertDOM.style.visibility = "hidden";
    }, 2000);
  }
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", {name} );
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.visibility = "visible  ";
    formAlertDOM.textContent = `success, task added`;
  } catch (error) {
    formAlertDOM.style.visibility = "visible  ";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.visibility = "hidden ";
  }, 2000);
});
