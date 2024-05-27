import e from "express";
import taskController from "../controllers/taskController.js";
const route = e.Router();

route.post("/create", taskController.create )


export default route;