import StaffModel from "../models/staffs.model.js";
import StudentModel from "../models/students.model.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/custom.error.js";
import JwtService from "./jwt.service.js";

class AuthService {
  constructor() {
    this.staffModel = StaffModel;
    this.studentModel = StudentModel;
    this.jwtService = new JwtService();
  }

  async staffLogin({ username, password }) {
    try {
        const staff = await this.staffModel.findOne({ username });
      if (!staff) {
        throw new CustomError("Username or password incorrect", 401);
      }
      const comparedPassword = await bcrypt.compare(password, staff.password);
      if (!comparedPassword) {
        throw new CustomError("Username or password incorrect", 401);
      }
      const token = this.jwtService.generateStaffToken(staff._id, staff.role);
      const newstaff = {
        id: staff.id,
        firstName: staff.first_name,
        lastName: staff.last_name,
        username: staff.username,
        role: staff.role,
        position: staff.position,
      };
      return { token, newstaff };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async studentLogin({ username, password }) {
    try {
      const student = await this.studentModel.findOne({ username });
    if (!student) {
      throw new CustomError("Username or password incorrect", 401);
    }
    const comparedPassword = await bcrypt.compare(password, student.password);
    if (!comparedPassword) {
      throw new CustomError("Username or password incorrect", 401);
    }
    const token = this.jwtService.generateStudentToken(student._id, student.phone);
    const newstudent = {
      id: student.id,
      firstName: student.first_name,
      lastName: student.last_name,
      username: student.username,
    };
    return { token, newstudent };
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
  }
}
export default AuthService;
