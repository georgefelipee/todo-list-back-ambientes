// userController.js
import userService from "../services/userService.js";

class UserController {
  async create(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const newUser = await userService.createUser(req.body);
      console.log(newUser);

      res.status(201).send({
        message: "User created successfully",
        newUser: {
          id: newUser._id,
          username,
        },
      });
    } catch (error) {
      return res.status(400).send("Error creating user. " + error);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(username, password);

      const check = await userService.findBName(username);
      console.log(check);

      if (check[0]?.password === password) {
        const userObject = {
          _id: check[0]._id,
          username: check[0].username,
          email: check[0].email,
        };
        res.send(userObject);
      } else {
        return res.status(400).send({ message: "Senha errada" });
      }
    } catch (error) {
      return res.status(400).send({ message: "Senha errada" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.findAllUsers();
      res.send(users);
    } catch (error) {
      return res.status(400).send({ message: "Erro ao buscar usuarios" });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.findBId(id);
      if (!user) {
        return res.status(404).send({ message: "Usuario não encontrado" });
      }
      res.send(user);
    } catch (error) {
      return res.status(400).send({ message: "Erro ao buscar usuario" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.send({ message: "Usuario deletado com sucesso" });
    } catch (error) {
      return res.status(400).send({ message: "Erro ao deletar usuario" });
    }
  }
}

export default new UserController();
