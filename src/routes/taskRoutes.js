import e from "express";
import taskController from "../controllers/taskController.js";
const route = e.Router();

route.post("/create", taskController.create )
route.get("/findAll", taskController.findAllTaskUser )
route.put("/edit", taskController.editTask )

export default route;