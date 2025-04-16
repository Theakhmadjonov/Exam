import GroupModel from "../models/groups.model.js";
import ScheduleModel from "../models/schedule.model.js";
import StudentGroupModel from "../models/student.group.model.js";
import CustomError from "../utils/custom.error.js";

class GroupService {
  constructor() {
    this.groupModel = GroupModel;
    this.studentgroupModel = StudentGroupModel;
    this.sheduleModel = ScheduleModel;
  }

  async createGroup(data) {
    try {
      const findgroup = await this.groupModel.findOne({ name: data.name });
      if (findgroup) throw new CustomError("Group alreday existed", 401);
      const group = await this.groupModel.create(data);
      await group.populate("course_id");
      await group.populate("teacher_id");
      return group;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async addShedule(groupId, data) {
    try {
      const findGroup = await this.groupModel.findOne({ _id: groupId });
      if (!findGroup) throw new CustomError("Group not found", 404);
      const shedule = await this.sheduleModel.create(data);
      return shedule;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllShedule() {
    try {
      const shedules = await this.sheduleModel.find().populate("group_id");
      return shedules;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async updateGroupStatus(groupStatus, groupId) {
    try {
      const findGroup = await this.groupModel.findOne({ _id: groupId });
      if (!findGroup) throw new CustomError("Group not found", 404);
      const updatedGroupStatus = await this.groupModel.findOneAndUpdate(
        { _id: groupId },
        { $set: { status: groupStatus } },
        { new: true }
      );
      await this.studentgroupModel.findOneAndUpdate(
        { _id: groupId },
        { $set: { status: "active" } },
        { new: true }
      );
      return updatedGroupStatus;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllGroups() {
    try {
      const groups = await this.groupModel.find();
      return groups;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default GroupService;
