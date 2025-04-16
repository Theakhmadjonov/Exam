import GroupService from "../services/group.service.js";

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }

  async createGroupController(req, res, next) {
    try {
      const data = req.body;
      const group = await this.groupService.createGroup(data);
      res.status(201).json({
        success: true,
        group: group,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateGroupStatusController(req, res, next) {
    
  }

  async getAllGroupsController(req, res, next) {
    try {
      const groups = await this.groupService.getAllGroups();
      res.status(201).json({
        success: true,
        groups: groups,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default GroupController;
