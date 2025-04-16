import CourseService from "../services/course.service.js";

class CourseController{
    constructor() {
        this.courseService = new CourseService();
    }

    async createCourseController(req, res, next) {
        try {
            const data = req.body;
            const course = await this.courseService.createCourse(data);
            res.status(201).json({
                success: true,
                course: course,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllCoursesController(req, res, next) {
        try {
            const courses = await this.courseService.getAllCourses();
            res.status(201).json({
                success: true,
                courses: courses,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default CourseController;