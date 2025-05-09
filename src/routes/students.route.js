import { Router } from "express";
import StudentsController from "../controllers/students.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";

const studentsRouter = Router();
const controller = new StudentsController();

studentsRouter.post(
  "/students",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.createStudentController.bind(controller)
);

studentsRouter.get(
  "/students",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.getAllStudentsController.bind(controller)
);

studentsRouter.post(
  "/students/group",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.addStudentGroupController.bind(controller)
);

export default studentsRouter;