// TaskController.ts (atualizado para TypeScript)
import { Request, Response, NextFunction } from 'express';
import taskService from '../services/taskService.js';

class TaskController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newTask = await taskService.createTask(req.body);
            res.status(201).send({
                message: 'Tarefa criada com sucesso',
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
            next(error); // Encaminha o erro para o middleware de tratamento de erros
        }
    }

    async findAllTaskUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id_user = req.params.user;
            const tasks = await taskService.findAllUserTasks(id_user);
            res.status(200).send(tasks);
        } catch (error) {
            next(error); // Encaminha o erro para o middleware de tratamento de erros
        }
    }

    async editTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const taskUpdated = await taskService.editTask(id, req.body);
            res.status(200).send({
                message: 'Tarefa atualizada com sucesso para o usuario',
                taskUpdated: {
                    id,
                    title: taskUpdated.title,
                    description: taskUpdated.description,
                    deadline: taskUpdated.deadline,
                    status: taskUpdated.status,
                },
            });
        } catch (error) {
            next(error); // Encaminha o erro para o middleware de tratamento de erros
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await taskService.deleteTask(id);
            res.status(200).send({ message: 'Tarefa deletada com sucesso' });
        } catch (error) {
            next(error); // Encaminha o erro para o middleware de tratamento de erros
        }
    }

    async alterStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const taskUpdated = await taskService.alterStatus(id);
            res.status(200).send({
                message: 'Tarefa atualizada com sucesso para o usuario',
                taskUpdated: {
                    id,
                    status: 'Concluido',
                },
            });
        } catch (error) {
            next(error); // Encaminha o erro para o middleware de tratamento de erros
        }
    }
}

export default new TaskController();
