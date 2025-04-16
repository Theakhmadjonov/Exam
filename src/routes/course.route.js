import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import CourseController from "../controllers/course.controller.js";

const courseRouter = Router();
const controller = new CourseController();

courseRouter.post("/course",
    AuthMiddleware,
    RoleMiddleware("admin"),
    controller.createCourseController.bind(controller));

courseRouter.get("/course", controller.getAllCoursesController.bind(controller));

export default courseRouter;