import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import AttendanceController from "../controllers/attendance.controller.js";

const attendanceRouter = Router();
const controller = new AttendanceController();

attendanceRouter.post(
  "/lessons/:lessonId/attendance",
  AuthMiddleware,
  RoleMiddleware("admin", "teacher"),
  controller.createAttendanceController.bind(controller)
);

attendanceRouter.get(
  "/lessons/:lessonId/attendance",
  AuthMiddleware,
  RoleMiddleware("admin", "teacher", "student"),
  controller.getAttendanceByLessonIdController.bind(controller)
);

attendanceRouter.get(
  "/students/:studentId/attendance",
  AuthMiddleware,
  RoleMiddleware("admin", "teacher", "student"),
  controller.getStudentAttendanceController.bind(controller)
);

export default attendanceRouter;
