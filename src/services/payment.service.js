import GroupModel from "../models/groups.model.js";
import PaymentModel from "../models/payment.model.js";
import StudentModel from "../models/students.model.js";
import CustomError from "../utils/custom.error.js";

class PaymentService {
  constructor() {
    this.paymentModel = PaymentModel;
    this.groupModel = GroupModel;
    this.studentModel = StudentModel;
  }

  async createPayment(data) {
    try {
      const findGroup = await this.groupModel.findById(data.groupId);
      if (!findGroup) throw new CustomError("Group not found", 404);
      if (findGroup === "completed")
        throw new CustomError("Group already completed", 404);
      const findStudent = await this.studentModel.findById(data.studentId);
      if (!findStudent) throw new CustomError("student not found", 404);
      if (findStudent === "gratuated")
        throw new CustomError("Student already gratuated", 404);
      const payment = await this.paymentModel.create(data);
      const newPayment = await this.paymentModel
        .findById(payment._id)
        .populate({
          path: "student_id",
          select: "first_name last_name",
        })
        .populate({
          path: "group_id",
          select: "name",
        });
      return newPayment;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default PaymentService;
