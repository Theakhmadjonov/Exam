import PaymentService from "../services/payment.service.js";

class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPaymentController(req, res, next) {
    try {
      const data = req.body;
      const payment = await this.paymentService.createPayment(data);
      res.status(201).json({
        success: true,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default PaymentController;
