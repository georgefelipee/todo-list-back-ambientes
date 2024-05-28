import Task from '../models/TaskModel.js';

const createTask = (body) => Task.create(body);
const findAllUserTasks = (id_user) => Task.find({ id_user: id_user });
const findById = (id) => Task.findById(id);
const editTask = (id, body) => Task.findByIdAndUpdate({_id: id}, body)

export default { createTask,findAllUserTasks,findById,editTask };