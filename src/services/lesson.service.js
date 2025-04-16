import mongoose from "mongoose";
import GroupModel from "../models/groups.model.js";
import LessonModel from "../models/lesson.model.js";
import CustomError from "../utils/custom.error.js";

class LessonService {
  constructor() {
    this.lessonModel = LessonModel;
    this.groupModel = GroupModel;
  }

  async createLesson(data, created_by) {
    try {
      const group = await this.groupModel.findById(data.group_id);
      if (!group) {
        throw new CustomError("Group not found", 404);
      }
      if (group.status !== "active") {
        throw new CustomError("Group not started", 400);
      }
      const lesson = await this.lessonModel.create({
        ...data,
        created_by,
      });
      const populatedLesson = await this.lessonModel
        .findById(lesson._id)
        .populate({
          path: "group_id",
          select: "name",
        });
      return populatedLesson;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllLesson(groupId, start_date, end_date) {
    try {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const lessons = await this.lessonModel.aggregate([  
        {
          $match: {
            group_id: new mongoose.Types.ObjectId(groupId),
            lesson_date: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $lookup: {
            from: "attendances", 
            localField: "_id",
            foreignField: "lesson_id", 
            as: "attendance", 
          },
        },
        {
          $unwind: {
            path: "$attendance",
            preserveNullAndEmptyArrays: true, 
          },
        },
        {
          $lookup: {
            from: "attendance_details",
            localField: "attendance._id", 
            foreignField: "attendance_id",
            as: "attendanceDetails", 
          },
        },
        {
          $addFields: {
            attendance: {
              total: { $size: "$attendanceDetails" },
              present: {
                $size: {
                  $filter: {
                    input: "$attendanceDetails",
                    as: "item",
                    cond: { $eq: ["$$item.status", "present"] },
                  },
                },
              },
              absent: {
                $size: {
                  $filter: {
                    input: "$attendanceDetails",
                    as: "item",
                    cond: { $eq: ["$$item.status", "absent"] },
                  },
                },
              },
              late: {
                $size: {
                  $filter: {
                    input: "$attendanceDetails",
                    as: "item",
                    cond: { $eq: ["$$item.status", "late"] },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id", 
            title: 1,
            description: 1,
            lessonDate: "$lesson_date",
            startTime: "$start_time",
            endTime: "$end_time",
            roomNumber: "$room_number",
            attendance: 1,
          },
        },
        {
          $sort: {
            lessonDate: 1, 
            startTime: 1, 
          },
        },
      ]);
      return lessons;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default LessonService;
