import { Router } from "express";
import StaffController from "../controllers/staff.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";

const staffRouter = Router();
const controller = new StaffController();

staffRouter.post("/staffs",
    AuthMiddleware,
    RoleMiddleware("superadmin", "admin"),
    controller.createStaffController.bind(controller));

staffRouter.get("/staffs",
    AuthMiddleware,
    RoleMiddleware("superadmin"),
    controller.getAllStaffsController.bind(controller));

export default staffRouter;