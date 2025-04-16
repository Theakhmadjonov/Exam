import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import LessonController from "../controllers/lesson.controller.js";


const lessonRouter = Router();
const controller = new LessonController();

lessonRouter.post(
  "/lesson",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.createLessonController.bind(controller)
);

lessonRouter.get(
    "/lesson",
    AuthMiddleware,
    RoleMiddleware("admin"),
    controller.getAllLessonsController.bind(controller)
);


export default lessonRouter;