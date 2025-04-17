import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import PaymentController from "../controllers/payment.controller.js";


const paymentRouter = Router();
const controller = new PaymentController();

paymentRouter.post("/payments",
    AuthMiddleware,
    RoleMiddleware("admin"),
    controller.createPaymentController.bind(controller));


export default paymentRouter;