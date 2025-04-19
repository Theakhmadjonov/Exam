import AttendanceService from "../services/attendance.service.js";

class AttendanceController {
  constructor() {
    this.attendanceService = new AttendanceService();
  }

  async createAttendanceController(req, res, next) {
    try {
      const { lessonId } = req.params;
      const data = req.body;
      const createdBy = req.userId;
      const attendance = await this.attendanceService.createAttendance(
        lessonId,
        data,
        createdBy
      );
      res.status(201).json({
        attendance: attendance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByLessonIdController(req, res, next) {
    try {
      const { lessonId } = req.body;
      const data = await this.attendanceService.getAttendanceByLessonId(
        lessonId
      );
      res.status(200).json({
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

}
export default AttendanceController;
