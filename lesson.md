const Lesson = require('../models/lesson.model');
const { AttendanceDetail } = require('../models/attendance.model');
const mongoose = require('mongoose');

exports.getGroupLessons = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { startDate, endDate } = req.query;

    const lessons = await Lesson.find({
      groupId,
      lessonDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).lean();

    const lessonsWithAttendance = await Promise.all(lessons.map(async (lesson) => {
      const attendanceDetails = await AttendanceDetail.find({ attendanceId: lesson._id });
      const stats = {
        total: attendanceDetails.length,
        present: attendanceDetails.filter(a => a.status === 'present').length,
        absent: attendanceDetails.filter(a => a.status === 'absent').length,
        late: attendanceDetails.filter(a => a.status === 'late').length
      };

      return {
        ...lesson,
        attendance: stats
      };
    }));

    res.status(200).json({
      success: true,
      lessons: lessonsWithAttendance
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



judda oson varianti

import Lesson from "../models/lesson.model.js";
import Attendance from "../models/attendance.model.js";
import AttendanceDetail from "../models/attendance_detail.model.js";

export const getGroupLessons = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { startDate, endDate } = req.query;

    const lessons = await Lesson.find({
      group_id: groupId,
      lesson_date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).lean();

    const result = [];

    for (const lesson of lessons) {
      const attendance = await Attendance.findOne({ lesson_id: lesson._id });
      let stats = { total: 0, present: 0, absent: 0, late: 0 };

      if (attendance) {
        const details = await AttendanceDetail.find({ attendance_id: attendance._id });
        stats.total = details.length;
        details.forEach((d) => stats[d.status]++);
      }

      result.push({ ...lesson, attendance: stats });
    }

    res.status(200).json({ success: true, lessons: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
