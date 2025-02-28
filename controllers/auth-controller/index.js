const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

module.exports = { registerUser, loginUser };



// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register User with Profile Picture
// const registerUser = async (req, res) => {
//   try {
//     const { userName, userEmail, password, role } = req.body;
//     console.log('Received Data:', req.body);  // Log incoming request data

//     if (!userName || !userEmail || !password || !role) {
//       console.log('Validation Error: Missing required fields');
//       return res.status(400).json({
//         success: false,
//         message: 'All fields (userName, userEmail, password, role) are required.',
//       });
//     }

//     const existingUser = await User.findOne({ $or: [{ userEmail }, { userName }] });
//     if (existingUser) {
//       console.log('Duplicate User Found:', existingUser);
//       return res.status(400).json({
//         success: false,
//         message: 'User name or user email already exists',
//       });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       userName,
//       userEmail,
//       password: hashPassword,
//       role,
//       image: req.file ? req.file.path : '',
//     });

//     await newUser.save();

//     console.log('User registered:', newUser);
//     return res.status(201).json({
//       success: true,
//       message: 'User registered successfully!',
//       user: {
//         _id: newUser._id,
//         userName: newUser.userName,
//         userEmail: newUser.userEmail,
//         role: newUser.role,
//         imageUrl: newUser.image ? `${req.protocol}://${req.get("host")}/${newUser.image}` : null,
//       },
//     });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };


// // Login User with Profile Image
// const loginUser = async (req, res) => {
//   try {
//     const { userEmail, password } = req.body;

//     const checkUser = await User.findOne({ userEmail });


//     // if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Invalid credentials",
//     //   });
//     // }

//     console.log('Login Request:', req.body);

//     if (!checkUser) {
//       console.log('User not found');
//     } else {
//       const passwordMatch = await bcrypt.compare(password, checkUser.password);
//       console.log('Password Match:', passwordMatch);
//     }

//     const accessToken = jwt.sign(
//       {
//         _id: checkUser._id,
//         userName: checkUser.userName,
//         userEmail: checkUser.userEmail,
//         role: checkUser.role,
//       },
//       "JWT_SECRET",
//       { expiresIn: "120m" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       data: {
//         accessToken,
//         user: {
//           _id: checkUser._id,
//           userName: checkUser.userName,
//           userEmail: checkUser.userEmail,
//           role: checkUser.role,
//           imageUrl: checkUser.image ? `${req.protocol}://${req.get("host")}/${checkUser.image}` : null,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// module.exports = { registerUser, loginUser };
