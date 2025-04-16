import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import GroupController from "../controllers/group.controller.js";

const groupRouter = Router();
const controller = new GroupController();

groupRouter.post(
  "/group",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.createGroupController.bind(controller)
);

groupRouter.get(
  "/group",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.getAllGroupsController.bind(controller)
);

groupRouter.put(
  "/group",
  controller.updateGroupStatusController.bind(controller)
);

groupRouter.post(
  "/group/shedule",
  controller.addSheduleController.bind(controller)
);

groupRouter.get(
  "/group/shedule",
  controller.getAllShedulesController.bind(controller)
);

export default groupRouter;
