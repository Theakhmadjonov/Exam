import mongoose from "mongoose";
import AttendanceModel from "../models/attendance.model.js";
import AttendanceDetailModel from "../models/attendance-detail.model.js";
import LessonModel from "../models/lesson.model.js";
import CustomError from "../utils/custom.error.js";
class AttendanceService {
  constructor() {
    this.attendanceModel = AttendanceModel;
    this.attendanceDetailModel = AttendanceDetailModel;
    this.lessonModel = LessonModel;
  }

  async createAttendance(lessonId, data, createdBy) {
    try {
      const lesson = await this.lessonModel.findOne({ _id: lessonId });
      if (!lesson) {
        throw new CustomError("Lesson not found", 404);
      }
      const attendance = await this.attendanceModel.create({
        lesson_id: lesson._id,
        created_by: createdBy,
      });
      const attendanceDetails = data.attendances.map((attendanceData) => {
        return {
          attendance_id: attendance._id,
          student_id: new mongoose.Types.ObjectId(attendanceData.student_id),
          status: attendanceData.status,
          comment: attendanceData.comment || "",
        };
      });
      await this.attendanceDetailModel.insertMany(attendanceDetails);
      const attendanceCount = attendanceDetails.length;
      const presentCount = attendanceDetails.filter(
        (item) => item.status === "present"
      ).length;
      const absentCount = attendanceDetails.filter(
        (item) => item.status === "absent"
      ).length;
      const lateCount = attendanceDetails.filter(
        (item) => item.status === "late"
      ).length;
      return {
        success: true,
        message: "Davomat muvaffaqiyatli saqlandi",
        lesson: {
          id: lesson._id,
          title: lesson.title,
          lessonDate: lesson.lesson_date,
        },
        attendanceCount,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAttendanceByLessonId(lessonId) {
    try {
      const lesson = await this.lessonModel.findById(lessonId).populate({
        path: "group_id",
        select: "name",
      });
      if (!lesson) {
        throw new CustomError("Lesson not found", 404);
      }
      const attendance = await this.attendanceModel.findOne({
        lesson_id: lessonId,
      });
      if (!attendance) throw new CustomError("Attendance not found", 404);
      const details = await this.attendanceDetailModel
        .find({ attendance_id: attendance._id })
        .populate({
          path: "student_id",
          select: "firstName lastName",
        });
      const students = details.map((item) => ({
        student: {
          id: item.student_id._id,
          firstName: item.student_id.firstName,
          lastName: item.student_id.lastName,
        },
        status: item.status,
        comment: item.comment,
      }));
      const total = students.length;
      const present = students.filter((s) => s.status === "present").length;
      const absent = students.filter((s) => s.status === "absent").length;
      const late = students.filter((s) => s.status === "late").length;
      return {
        success: true,
        lesson: {
          id: lesson._id,
          title: lesson.title,
          lessonDate: lesson.lesson_date,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
          },
        },
        attendance: {
          total,
          present,
          absent,
          late,
          students,
        },
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

}

export default AttendanceService;
