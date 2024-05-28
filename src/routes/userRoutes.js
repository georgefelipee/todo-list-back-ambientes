import e from "express";
import userController from "../controllers/userController.js";
const route = e.Router();

route.post("/register", userController.create )
route.post("/login", userController.login)
route.get("/getusers", userController.getUsers)
route.get("/getuser/:id", userController.getUserById)
export default route;