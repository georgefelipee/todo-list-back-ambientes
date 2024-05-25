import e from "express";
import userController from "../controllers/userController.js";
const route = e.Router();

route.post("/register", userController.create )
route.post("/login", userController.login)

export default route;