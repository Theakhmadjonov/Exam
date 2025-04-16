import GroupModel from "../models/groups.model.js";
import CustomError from "../utils/custom.error.js";

class GroupService {
  constructor() {
    this.groupModel = GroupModel;
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