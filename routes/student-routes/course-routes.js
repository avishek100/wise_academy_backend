// const express = require("express");
// const {
//   getStudentViewCourseDetails,
//   getAllStudentViewCourses,
//   checkCoursePurchaseInfo,
// } = require("../../controllers/student-controller/course-controller");
// const router = express.Router();

// router.get("/get", getAllStudentViewCourses);
// router.get("/get/details/:id", getStudentViewCourseDetails);
// router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

// module.exports = router;


const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

// Get all courses
router.get("/get", getAllStudentViewCourses);

// Get course details by id
router.get("/get/details/:id", getStudentViewCourseDetails);

// Check if the student has purchased the course
// Ensure the parameter names match your controller expectations (courseId and studentId)
router.get("/purchase-info/:courseId/:studentId", checkCoursePurchaseInfo);

module.exports = router;
