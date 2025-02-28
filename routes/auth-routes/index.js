const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user,
    },
  });
});

module.exports = router;



// const express = require("express");
// const { registerUser, loginUser } = require("../../controllers/auth-controller/index");
// const authenticateMiddleware = require("../../middleware/auth-middleware");
// const upload = require("../../middleware/uploadMiddleware");

// const router = express.Router();

// // Register with profile image upload
// router.post("/register", upload.single("profileImage"), registerUser);

// // Login route
// router.post("/login", loginUser);
// router.post("/uploadImage", upload, uploadImage);
// // Check authentication
// router.get("/check-auth", authenticateMiddleware, (req, res) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     message: "Authenticated user!",
//     data: { user },
//   });
// });

// module.exports = router;
