const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    console.log(req.query, "req.query");

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Get courseId from route params
    const studentId = req.params.studentId; // Get studentId from route params

    // Fetch the course by its ID
    const course = await Course.findById(courseId);

    // If no course is found, return a 404 error
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Now check if the 'courses' property exists in the fetched course
    if (!course.courses) {
      return res.status(500).json({ message: "Courses data missing in course object" });
    }

    // Fetch student information (if needed)
    const student = await Student.findById(studentId);

    // If no student is found, return a 404 error
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Proceed with your existing logic to check if the student has purchased the course
    const purchased = course.courses.some(courseItem => courseItem._id.toString() === studentId);

    // Return response based on whether the student has purchased the course or not
    if (purchased) {
      return res.status(200).json({ message: "Course purchased" });
    } else {
      return res.status(200).json({ message: "Course not purchased" });
    }

  } catch (error) {
    console.error("Error in checkCoursePurchaseInfo:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};
