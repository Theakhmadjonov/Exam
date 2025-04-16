import LessonService from "../services/lesson.service.js";

class LessonController{
    constructor() {
        this.lessonService = new LessonService();
    }

    async createLessonController(req, res, next) {
        try {
            const data = req.body;
            const lesson = await this.lessonService.createLesson(data);
            res.status(201).json({
                success: true,
                lesson: lesson,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllLessonsController(req, res, next) {
        try {
            const groupId = req.params;
            const { startDate, endDate } = req.url;
            const lessons = await this.lessonService.getAllLesson(groupId, startDate, endDate);
            res.status(200).json({
                success: true,
                lessons: lessons,
            });
        } catch (error) {
            next(error);
        }
    }


}
export default LessonController;