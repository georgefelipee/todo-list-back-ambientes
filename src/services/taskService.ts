// TaskService.js
import { LogExecution } from '../aop/log.annotation.js';
import Task from '../models/TaskModel.js';
import { CustomError } from '../utils/CustomErro.js';
import userService from './userService.js';

class TaskService {
    @LogExecution()
    async createTask(data) {
        const { title, description, deadline, id_user, username } = data;
        if (!title || !description || !deadline) {
            throw new CustomError("Preencha todos os campos");
        }

        const taskObject = { title, description, deadline, id_user };
        if (username) {
            const verifyUsername = await userService.findBName(username);
            if (verifyUsername.length === 0) {
                throw new CustomError("Usuario não encontrado");
            }
            taskObject.id_user = verifyUsername[0]._id;
        } else {
            const verifyUser = await userService.findBId(id_user);
            if (!verifyUser) {
                throw new CustomError("Usuario não encontrado");
            }
        }

        return Task.create(taskObject);
    }

    async findAllUserTasks(id_user) {
        if (!id_user) {
            throw new CustomError("Informe o id do usuario");
        }

        const user = await userService.findBId(id_user);
        if (!user) {
            throw new CustomError("Usuario não encontrado");
        }

        return Task.find({ id_user: id_user });
    }

    async findById(id) {
        return Task.findById(id);
    }

    async editTask(id, body) {
        const { title, description, deadline, status } = body;
        if (!title || !description || !deadline || !status) {
            throw new CustomError("Preencha todos os campos");
        }

        const task = await this.findById(id);
        if (!task) {
            throw new CustomError("Tarefa não encontrada");
        }

        return Task.findByIdAndUpdate({ _id: id }, body);
    }

    async deleteTask(id) {
        const task = await this.findById(id);
        if (!task) {
            throw new CustomError("Tarefa não encontrada");
        }

        return Task.findByIdAndDelete(id);
    }

    async alterStatus(id) {
        const task = await this.findById(id);
        if (!task) {
            throw new CustomError("Tarefa não encontrada");
        }

        return Task.findByIdAndUpdate(id, { status: "concluido" });
    }
}

export default new TaskService();
