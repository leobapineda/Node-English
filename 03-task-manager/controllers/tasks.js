const Task = require("../models/task");
const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `no task matched id: taskId` });
    } else {
      return res.status(200).json({ task });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { name, completed } = req.body;
    // const task = await Task.updateOne({ _id: taskId }, { name, completed });
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { name, completed },
      { new: true, runValidators: true }
    );
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `no task matched id: taskId` });
    } else {
      return res.status(200).json({ task });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
