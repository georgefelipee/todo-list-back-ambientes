import taskService from "../services/taskService.js";
import userService from "../services/userService.js";

const create = async (req, res) => {
  try {
    const { title, description, deadline, id_user, username } = req.body;
    if (!title || !description || !deadline) {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }
    const taskObject = {
      title,
      description,
      deadline,
      id_user,
    };
    if (username) {
      const verifyUsername = await userService.findBName(username);
      if (verifyUsername.length === 0) {
        throw new Error("Usuario não encontrado");
      }
      taskObject.id_user = verifyUsername[0]._id;
    } else {
      const verifyUser = await userService.findBId(id_user);
      if (!verifyUser) {
        return res.status(400).send({ message: "Usuario não encontrado" });
      }
    }

    const newTask = await taskService.createTask(taskObject);
    res.status(201).send({
      message: "Tarefa criada com sucesso",
      newTask: {
        id: newTask._id,
        title,
        description,
        deadline,
        id_user,
        username,
      },
    });
  } catch (error) {
    return res.status(400).send("Erro ao criar tarefa. " + error);
  }
};

const findAllTaskUser = async (req, res) => {
  try {
    const id_user = req.params.user;

    if (!id_user) {
      return res.status(400).send({ message: "Informe o id do usuario" });
    }

    const user = await userService.findBId(id_user);
    if (!user) {
      return res.status(400).send({ message: "Usuario não encontrado" });
    }

    const tasks = await taskService.findAllUserTasks(id_user); // Await the promise

    res.status(200).send(tasks);
  } catch (error) {
    return res.status(400).send("Erro ao buscar tarefas. " + error);
  }
};
const editTask = async (req, res) => {
  try {
    const { id, title, description, deadline, status } = req.body;
    if (!title || !description || !deadline || !status) {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }
    const task = await taskService.findById(id);
    if (!task) {
      return res.status(400).send({ message: "Tarefa não encontrada" });
    }
    const taskUpdated = await taskService.editTask(id, req.body);
    res.status(200).send({
      message: "Tarefa atualizada com sucesso para o usuario",
      taskUpdated: {
        id,
        title,
        description,
        deadline,
        status,
      },
    });
  } catch (error) {
    return res.status(400).send("Erro ao atualizar tarefa. " + error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.findById(id);
    if (!task) {
      return res.status(400).send({ message: "Tarefa não encontrada" });
    }
    await taskService.deleteTask(id);
    res.status(200).send({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    return res.status(400).send("Erro ao deletar tarefa. " + error);
  }
}

const alterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.findById(id);
    if (!task) {
      return res.status(400).send({ message: "Tarefa não encontrada" });
    }
    const taskUpdated = await taskService.editTask(id, { status: "concluido" });
    res.status(200).send({
      message: "Tarefa atualizada com sucesso para o usuario",
      taskUpdated: {
        id,
        status: "Concluido",
      },
    });
  } catch (error) {
    return res.status(400).send("Erro ao atualizar tarefa. " + error);
  }
}
export default { create, findAllTaskUser, editTask, deleteTask, alterStatus};
