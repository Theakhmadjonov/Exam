import StaffModel from "../models/staffs.model.js";
import TeacherInfoModel from "../models/teacher.info.model.js";
import CustomError from "../utils/custom.error.js";

class TeacherService {
  constructor() {
    this.teacherModel = TeacherInfoModel;
  }

  async addInfoToTeacher(data) {
    try {
      const findStaff = await this.teacherModel.findOne(data.staffId);
      if (findStaff) throw new CustomError("Teacher info already existed", 400);
      const teacher = await this.teacherModel.create(data);
      await teacher.populate("staff_id");
      return teacher;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllTeachersInfo() {
    try {
      const teachers = await this.teacherModel
        .find()
        .populate("staff_id", { _id, first_name, last_name });
      return teachers;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default TeacherService;
