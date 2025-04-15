import StaffModel from "../models/staffs.model.js";
import JwtService from "./jwt.service.js";
import CustomError from "../utils/custom.error.js";
import bcrypt from "bcrypt";

class StaffService {
  constructor() {
    this.jwtService = new JwtService();
    this.staffModel = StaffModel;
  }

  async createStaff(data) {
    try {
      const staff = await this.staffModel.findOne(data.username);
      if (staff) {
        throw new CustomError("Username already exists", 400);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      data.password = hashedPassword;
      const createdStaff = await this.staffModel.create(data);
      const newStaff = {
        id: createdStaff._id,
        firstName: createdStaff.first_name,
        lastName: createdStaff.last_name,
        username: createdStaff.username,
        role: createdStaff.role,
        position: createdStaff.position,
        phone: createdStaff.phone,
        address: createdStaff.address,
        hireDate: createdStaff.hire_date,
      };
      return newStaff;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllStaff() {
    try {
        const staffs = await this.staffModel.find();
        const count = await this.staffModel.countDocuments();
      return { staffs, count };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default StaffService;
