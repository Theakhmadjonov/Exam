import StudentGroupModel from "../models/student.group.model.js";
import StudentModel from "../models/students.model.js";
import CustomError from "../utils/custom.error.js";
import bcrypt from "bcrypt"; 

class Studentsservice {
  constructor() {
    this.studentModel = StudentModel;
    this.studentGroupModel = StudentGroupModel;
  }

  async createStudent(data) {
      try {
        const findStudent = await this.studentModel.findOne(data.username);
          if (findStudent) throw new CustomError("Student already exists", 400);
          const hashedPassword = await bcrypt.hash(password, 12);
          data.password = hashedPassword;
          const student = await this.studentModel.create(data);
          return student;
      } catch (error) {
          throw new CustomError(error.message, 500);
      }
  }

    async getAllStudent() {
      try {
          const students = await this.studentModel.find();
          const count = await this.staffModel.countDocuments();
          return { students, count };
      } catch (error) {
        throw new CustomError(error.message, 500);
      }
  }
}
export default Studentsservice;
