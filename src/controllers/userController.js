
import userService from "../services/userService.js";

const create = async (req, res) => {
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
    return res.status(400).send("Error creating user. "+ error);
  }
};

const login = async (req,res) => {
  try{
      const {username, password }= req.body;
      console.log(username, password);
      
      const check = await userService.findBName(username)
      console.log(check)

      if(check[0].password === password){
          res.send(check)
      }else{
          return res.status(400).send({message: "Senha errada"})
      }
  }catch(error){
      return res.status(400).send({message: "Senha errada"})
  }
  

}


export default { create, login };