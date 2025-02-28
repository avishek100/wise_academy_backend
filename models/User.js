// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   userName: String,
//   userEmail: String,
//   password: String,
//   role: String,
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true
  },


  password: {
    type: String,
    required: true,
    trim: true,

  },
  image: {
    type: String,
    default: null,
    trim: true,
  }
});


module.exports = mongoose.model("User", UserSchema);
// const UserSchema = new mongoose.Schema({
//   userName: String,
//   userEmail: String,
//   password: String,
//   role: String,
//   image: { type: String, default: "" }, // New field for profile image
// });
