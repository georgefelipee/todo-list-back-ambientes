// TaskController.js
import taskService from "../services/taskService.js";

class TaskController {
    async create(req, res) {
        try {
            const newTask = await taskService.createTask(req.body);
            res.status(201).send({
                message: "Tarefa criada com sucesso",
                newTask: {
                    id: newTask._id,
                    title: newTask.title,
                    description: newTask.description,
                    deadline: newTask.deadline,
                    id_user: newTask.id_user,
                    username: req.body.username,
                },
            });
        } catch (error) {
            return res.status(400).send("Erro ao criar tarefa. " + error.message);
        }
    }

    async findAllTaskUser(req, res) {
        try {
            const id_user = req.params.user;
            const tasks = await taskService.findAllUserTasks(id_user);
            res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send("Erro ao buscar tarefas. " + error.message);
        }
    }

    async editTask(req, res) {
        try {
            const { id } = req.body;
            const taskUpdated = await taskService.editTask(id, req.body);
            res.status(200).send({
                message: "Tarefa atualizada com sucesso para o usuario",
                taskUpdated: {
                    id,
                    title: taskUpdated.title,
                    description: taskUpdated.description,
                    deadline: taskUpdated.deadline,
                    status: taskUpdated.status,
                },
            });
        } catch (error) {
            return res.status(400).send("Erro ao atualizar tarefa. " + error.message);
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await taskService.deleteTask(id);
            res.status(200).send({ message: "Tarefa deletada com sucesso" });
        } catch (error) {
            return res.status(400).send("Erro ao deletar tarefa. " + error.message);
        }
    }

    async alterStatus(req, res) {
        try {
            const { id } = req.params;
            const taskUpdated = await taskService.alterStatus(id);
            res.status(200).send({
                message: "Tarefa atualizada com sucesso para o usuario",
                taskUpdated: {
                    id,
                    status: "Concluido",
                },
            });
        } catch (error) {
            return res.status(400).send("Erro ao atualizar tarefa. " + error.message);
        }
    }
}

export default new TaskController();
