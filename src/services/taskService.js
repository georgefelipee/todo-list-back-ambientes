import Task from '../models/TaskModel.js';

const createTask = (body) => Task.create(body);

export default { createTask };