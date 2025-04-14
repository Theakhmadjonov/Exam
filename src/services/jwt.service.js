import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

class JwtService {
  secretKey = process.env.JWT_KEY;
  generateStaffToken(staff_id, staff_role) {
    try {
      const token = jwt.sign({ userId: staff_id, userRole: staff_role }, this.secretKey, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  generateStudentToken(student_id, student_phone) {
    try {
      const token = jwt.sign({ studentId: student_id, studentPhone: student_phone }, this.secretKey, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  verifyStaffToken(token) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      throw new CustomError("Token is invalid", 401);
    }
  }
  
  verifyStudentToken(token) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      throw new CustomError("Token is invalid", 401);
    }
  }
}

export default JwtService;
