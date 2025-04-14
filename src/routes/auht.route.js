import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();
const controller = new AuthController();

authRouter.post("/auth/staff/login", controller.staffLoginController.bind(controller));
authRouter.post("/auth/student/login", controller.studentLoginController.bind(controller));

export default authRouter;