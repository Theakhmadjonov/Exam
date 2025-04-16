import GroupModel from "../models/groups.model.js";
import LessonModel from "../models/lesson.model.js";
import CustomError from "../utils/custom.error.js";

class LessonService {
  constructor() {
    this.lessonModel = LessonModel;
    this.groupModel = GroupModel;
  }

  async createLesson(data) {
    try {
      const findGroup = await this.groupModel.findOne({ _id: data.groupId });
      if (!findGroup) throw new CustomError("Group not found", 404);
      if (findGroup.status !== "active") throw new CustomError("Group not started", 404);
      const lesson = await this.lessonModel.create(data);
      await lesson.populate("group_id");
      return lesson;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllLesson(groupId, start_date, end_date) {
    try {
      const findGroup = await this.groupModel.findOne({
        _id: groupId,
        lesson_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
      });
      if (!findGroup) throw new CustomError("Group not found", 404);
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default LessonService;
