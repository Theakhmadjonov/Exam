import authRouter from "./auht.route.js";
import courseRouter from "./course.route.js";
import groupRouter from "./group.route.js";
import lessonRouter from "./lesson.route.js";
import staffRouter from "./staff.route.js";
import studentsRouter from "./students.route.js";
import teacherRouter from "./teacher.route.js";

const Routes = () => [
  authRouter,
  staffRouter,
  studentsRouter,
  teacherRouter,
  courseRouter,
  groupRouter,
  lessonRouter,
];
export default Routes;
