// const express = require("express");
// const connectDb = require("./config/db");
//
// // Importing routers
// const CustomerRouter = require("./routes/customerRoute");
// const AuthRouter = require("./routes/AuthRoute");
// const BookRouter = require("./routes/BookRoute");
// const PurchaseRouter = require("./routes/PurchaseRoute");
// const VideoRouter = require("./routes/VideoRoute");
//
// const app = express();
//
// // Connect to the database
// connectDb();
//
// // Middleware
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // Serve uploaded videos
//
// // Routes
// app.use("/api/customer", CustomerRouter);
// app.use("/api/book", BookRouter);
// app.use("/api/purchase", PurchaseRouter);
// app.use("/api/auth", AuthRouter);
// app.use("/api/videos", VideoRouter); // Video Routes
//
// // Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
//
//
