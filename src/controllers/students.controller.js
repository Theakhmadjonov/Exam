import Studentsservice from "../services/students.service.js";

class StudentsController {
  constructor() {
    this.studentService = new Studentsservice();
  }

  async createStudentController(req, res, next) {
    try {
      const data = req.body;
      const student = await this.studentService.createStudent(data);
      res.status(201).json({
        success: true,
        student: student,
      });
    } catch (error) {
      next(error);
    }
  }

  async addStudentGroupController(req, res, next) {
    try {
      const { studentId, groupId } = req.body;
      const studentGroup = await this.studentService.addStudentGroup(studentId, groupId);
      res.status(201).json({
        success: true,
        studentGroup: studentGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllStudentsController(req, res, next) {
    try {
      const { students, count } = await this.studentService.getAllStudent();
      res.status(201).json({
          success: true,
          count: count,
        students: students,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default StudentsController;
