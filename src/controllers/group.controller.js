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

  async addSheduleController(req, res, next) {
    try {
      const groupId = req.body.groupId;
      const data = req.body;
      const shedule = await this.groupService.addShedule(groupId, data);
      res.status(201).json({
        success: true,
        shedule: shedule,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllShedulesController(req, res, next) {
    try {
      const shedules = await this.groupService.getAllShedule();
      res.status(200).json({
        success: true,
        shedules: shedules,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateGroupStatusController(req, res, next) {
    try {
      const { status, groupId } = req.body;
      const updatedGroupStatus = await this.groupService.updateGroupStatus(
        status,
        groupId
      );
      res.status(201).json({
        success: true,
        groupStatus: updatedGroupStatus,
      });
    } catch (error) {
      next(error);
    }
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
