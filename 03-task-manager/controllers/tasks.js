const Task = require("../models/task");
const asyncWraper = require("../middleware/async");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");

const getAllTask = asyncWraper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWraper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWraper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no task matched id: ${taskId}`, 404));
  } else {
    return res.status(200).json({ task });
  }
});

const updateTask = asyncWraper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: taskId }, //condition
    { name, completed }, //elementos a cambiar
    { new: true, runValidators: true } //options
  );
  if (!task) {
    return next(createCustomError(`no task matched id: ${taskId}`), 404);
  }
  res.status(200).json(task);
});

const deleteTask = asyncWraper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no task matched id: ${taskId}`), 404);
  }
  return res.status(200).json({ task });
});

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
