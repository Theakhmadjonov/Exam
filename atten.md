export const createAttendance = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { attendances } = req.body;

    const lesson = await LessonModel.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Dars topilmadi' });
    }

    const attendance = await AttendanceModel.create({
      lesson_id: lessonId,
      created_by: req.user._id,
    });

    let present = 0, absent = 0, late = 0;
    
    for (const item of attendances) {
      await AttendanceDetailModel.create({
        attendance_id: attendance._id,
        student_id: item.studentId,
        status: item.status,
        comment: item.comment || "",
      });

      if (item.status === 'present') present++;
      else if (item.status === 'absent') absent++;
      else if (item.status === 'late') late++;
    }

    res.status(201).json({
      success: true,
      message: 'Davomat muvaffaqiyatli saqlandi',
      lesson: {
        id: lesson._id,
        title: lesson.title,
        lessonDate: lesson.lesson_date,
      },
      attendanceCount: attendances.length,
      present,
      absent,
      late,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





import AttendanceModel from '../models/attendance.model.js';
import AttendanceDetailModel from '../models/attendanceDetail.model.js';
import LessonModel from '../models/lesson.model.js';

export const getLessonAttendance = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await LessonModel.findById(lessonId).lean();
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Dars topilmadi' });
    }

    const attendance = await AttendanceModel.findOne({ lesson_id: lessonId });
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Davomat topilmadi' });
    }

    const attendanceDetails = await AttendanceDetailModel.find({ attendance_id: attendance._id })
      .populate('student_id', 'first_name last_name')
      .lean();

    const stats = { total: 0, present: 0, absent: 0, late: 0 };
    const students = [];

    for (const a of attendanceDetails) {
      stats.total++;
      if (a.status === 'present') stats.present++;
      if (a.status === 'absent') stats.absent++;
      if (a.status === 'late') stats.late++;

      students.push({
        student: {
          id: a.student_id._id,
          firstName: a.student_id.first_name,
          lastName: a.student_id.last_name,
        },
        status: a.status,
        comment: a.comment,
      });
    }

    res.status(200).json({
      success: true,
      lesson: {
        id: lesson._id,
        title: lesson.title,
        lessonDate: lesson.lesson_date,
        group: {
          id: lesson.group_id,
          name: "WD-25" // agar group model bo‘lsa, alohida olish mumkin
        }
      },
      attendance: {
        ...stats,
        students,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




import AttendanceDetailModel from '../models/attendanceDetail.model.js';
import StudentModel from '../models/student.model.js';
import AttendanceModel from '../models/attendance.model.js';
import LessonModel from '../models/lesson.model.js';

export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, groupId } = req.query;

    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "O‘quvchi topilmadi" });
    }

    const attendanceDetails = await AttendanceDetailModel.find({ student_id: studentId })
      .populate({
        path: 'attendance_id',
        populate: {
          path: 'lesson_id',
          model: 'lesson',
        }
      }).lean();

    const filtered = attendanceDetails.filter(a => {
      const lesson = a.attendance_id.lesson_id;
      if (!lesson) return false;
      const date = new Date(lesson.lesson_date);
      const inRange = (!startDate || date >= new Date(startDate)) &&
                      (!endDate || date <= new Date(endDate));
      const matchGroup = !groupId || lesson.group_id.toString() === groupId;
      return inRange && matchGroup;
    });

    const stats = {
      totalLessons: filtered.length,
      present: 0,
      absent: 0,
      late: 0,
      lessons: []
    };

    for (const a of filtered) {
      if (a.status === 'present') stats.present++;
      if (a.status === 'absent') stats.absent++;
      if (a.status === 'late') stats.late++;

      const lesson = a.attendance_id.lesson_id;

      stats.lessons.push({
        lesson: {
          id: lesson._id,
          title: lesson.title,
          lessonDate: lesson.lesson_date,
          group: {
            id: lesson.group_id,
            name: "WD-25" // agar guruh model ulangan bo‘lsa, populate bilan olasiz
          }
        },
        status: a.status,
        comment: a.comment,
      });
    }

    const percent = stats.totalLessons ? ((stats.present / stats.totalLessons) * 100).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      student: {
        id: student._id,
        firstName: student.first_name,
        lastName: student.last_name,
      },
      attendance: {
        ...stats,
        presentPercentage: percent,
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
