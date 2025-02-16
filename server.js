const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

// ✅ Dynamically import connectDB
import("./config/db.js").then(({ default: connectDB }) => {
    connectDB();
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));

// ✅ Keep CommonJS for routes
const authRoutes = require("./routes/auth-routes");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);
app.use((req, res, next) => {
    if (req.is("application/json") && !req.body) {
        return res.status(400).json({ success: false, message: "Empty body" });
    }
    next();
});
app.use((req, res, next) => {
    console.log(req.body);  // Log the body to check what's being received
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err) => {
    console.log(`❌ Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
