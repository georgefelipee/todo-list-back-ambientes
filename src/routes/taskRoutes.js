import e from "express";
import taskController from "../controllers/taskController.js";
const route = e.Router();

route.post("/create", taskController.create )
route.get("/findAll/:user", taskController.findAllTaskUser )
route.put("/edit", taskController.editTask )
route.delete("/delete/:id", taskController.deleteTask )
route.put("/status/:id", taskController.alterStatus )
export default route;