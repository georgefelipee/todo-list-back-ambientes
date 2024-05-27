import taskService from "../services/taskService.js";
import userService from "../services/userService.js";

const create = async (req, res) => {
    try{
        const {title, description, deadline,id_user} = req.body;
        if(!title || !description || !deadline || !id_user){
            return res.status(400).send({message: "Preencha todos os campos"})
        }
        const verifyUser = await userService.findBId(id_user);
        if(!verifyUser){
            return res.status(400).send({message: "Usuario não encontrado"})
        }

        const newTask = await taskService.createTask(req.body);
        res.status(201).send({
            message: "Tarefa criada com sucesso",
            newTask: {
                id: newTask._id,
                title,
                description,
                deadline,
                id_user
            }
        })
    } catch(error){
        return res.status(400).send("Erro ao criar tarefa. "+ error);
    }
}    

export default { create };