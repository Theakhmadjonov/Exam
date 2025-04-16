import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import GroupController from "../controllers/group.controller.js";


const groupRouter = Router();
const controller = new GroupController();

groupRouter.post("/group",
    AuthMiddleware,
    RoleMiddleware("admin"),
    controller.createGroupController.bind(controller));

groupRouter.get("/group", controller.getAllGroupsController.bind(controller));

export default groupRouter;
