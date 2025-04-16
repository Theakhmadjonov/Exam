import GroupModel from "../models/groups.model.js";
import StudentGroupModel from "../models/student.group.model.js";
import StudentModel from "../models/students.model.js";
import CustomError from "../utils/custom.error.js";
import bcrypt from "bcrypt"; 

class Studentsservice {
  constructor() {
    this.studentModel = StudentModel;
    this.studentGroupModel = StudentGroupModel;
    this.groupModel = GroupModel;
  }

  async createStudent(data) {
      try {
        const findStudent = await this.studentModel.findOne({ username: data.username });
          if (findStudent) throw new CustomError("Student already exists", 400);
          const hashedPassword = await bcrypt.hash(data.password, 12);
          data.password = hashedPassword;
          const student = await this.studentModel.create(data);
          return student;
      } catch (error) {
          throw new CustomError(error.message, 500);
      }
  }

  async addStudentGroup(studentId, groupId) {
    try {
      const findStudent = await this.studentModel.findOne({ _id: studentId });
      if (!findStudent) throw new CustomError("Student not found", 404);
      const findGroup = await this.groupModel.findOne({ _id: groupId });
      if (!findGroup) throw new CustomError("Group not found", 404);
      if (findGroup.status !== "active") throw new CustomError("Group not started or rejected", 400);
      const studentGroup = await this.studentGroupModel.create({ student_id: studentId, group_id: groupId });
      return studentGroup;
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
