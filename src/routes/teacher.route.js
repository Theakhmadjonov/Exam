import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import TeacherController from "../controllers/teacher.controller.js";

const teacherRouter = Router();
const controller = new TeacherController();

teacherRouter.post(
  "/teacher",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.addInfoToTeacher.bind(controller)
);

teacherRouter.get(
  "/teacher",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.getAllTeachersInfo.bind(controller)
);

export default teacherRouter;
