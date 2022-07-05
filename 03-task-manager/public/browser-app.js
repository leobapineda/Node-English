const formDOM = document.querySelector(".task-form");
const formInput = document.querySelector(".task-input");
const loadingDOM = document.querySelector(".loading-text");
const tasksDOM = document.querySelector(".tasks");

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
    const allTasks = tasks.map((task) => {
      const { name, _id: taskID, completed } = task;
      // return `<span class="individual-task ${
      //   completed && "task-completed"
      // }" >${name}</span>
      //  <div class="task-links" >
      //   <div><a href="./" >edit</a></div>
      //   <button>delete</button>
      //  </div>
      //   `;

      return `<div class="inner-task-container">
      <div class="individual-task ${completed && "task-completed"}" >${name}</div>
      <div class="task-links">
        <div><a href="./task.html?id=${taskID}">edit</a></div>
        <button>delete</button>
      </div>
    </div>`
    });
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
  }
};

showTasks();
