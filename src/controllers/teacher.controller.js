import TeacherService from "../services/teacher.service.js";

class TeacherController {
  constructor() {
    this.teacherService = new TeacherService();
  }

  async addInfoToTeacher(req, res, next) {
    try {
      const data = req.body;
      const teacher = await this.teacherService.addInfoToTeacher(data);
      res.status(201).json({
        success: true,
        teacher: teacher,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTeachersInfo(req, res, next) {
    try {
      const teachers = await this.teacherService.getAllTeachersInfo();
      res.status(201).json({
        success: true,
        teachers: teachers,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default TeacherController;
