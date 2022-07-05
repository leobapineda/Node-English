const taskIDDOM = document.querySelector(".task-edit-id"); //lugar para id
const taskNameDOM = document.querySelector(".task-edit-name"); //input del nombre
const taskCompletedDOM = document.querySelector(".task-edit-completed"); //checkbox
const editFormDOM = document.querySelector(".single-task-form"); //form
const editBtnDOM = document.querySelector(".btn"); //button
const formAlertDOM = document.querySelector(".form-alert"); //alerta de exito o no
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

// get task
const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { completed, _id: taskID, name } = task;
    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    taskCompletedDOM.checked = completed;
  } catch (error) {
    console.log(error);
  }
};

showTask();

// edit task

editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
    console.log(task);

    const { _id: taskID, completed, name } = task;
    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    taskCompletedDOM.checked = completed;
    formAlertDOM.style.visibility = "visible";
    formAlertDOM.textContent = "hurray, task update successful";
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    formAlertDOM.style.visibility = "hidden";
  }, 2000);
});
