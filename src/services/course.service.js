import CourseModel from "../models/courses.model.js";
import CustomError from "../utils/custom.error.js";

class CourseService {
  constructor() {
    this.courseModel = CourseModel;
  }

  async createCourse(data) {
    try {
      const findCourse = await this.courseModel.findOne({ name: data.name });
      if (findCourse) throw new CustomError("Course already existed", 400);
      const course = await this.courseModel.create(data);
      return course;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllCourses() {
    try {
      const courses = await this.courseModel.find();
      return courses;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default CourseService;
