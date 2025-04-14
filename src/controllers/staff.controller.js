import StaffService from "../services/staff.service.js";

class StaffController {
  constructor() {
    this.staffService = new StaffService();
  }

  async createStaffController(req, res, next) {
    try {
      const data = req.body;
      const staff = await this.staffService.createStaff(data);
      res.status(201).json({
        success: true,
        staff: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllStaffsController(req, res, next) {
    try {
      const { staffs, count } = await this.staffService.createStaff(data);
      res.status(201).json({
        success: true,
        count: count,
        staffs: staffs,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default StaffController;
