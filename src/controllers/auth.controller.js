import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async staffLoginController(req, res, next) {
    try {
      const data = req.body;
      const { token, staff } = await this.authService.staffLogin(data);
      res.status(200).json({
        success: true,
        token: token,
        staff: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  async studentLoginController(req, res, next) {
    try {
      const data = req.body;
      const { token, student } = await this.authService.studentLogin(data);
      res.status(200).json({
        success: true,
        token: token,
        student: student,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;
