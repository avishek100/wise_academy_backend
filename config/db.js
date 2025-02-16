// const mongoose = require("mongoose");
//
// const connectDB = async () => {
//
//     try {
//         await mongoose.connect("mongodb://localhost:27017/db_wise_academy");
//         console.log("MongoDb connected")
//     } catch (e) {
//         console.log("MongoDb connection failed");
//
//     }
// }
//
// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_DATABASE_URI);

        console.log(
            `MongoDB connected to : ${conn.connection.host}`.white.underline.bold
        );
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`.red.underline.bold);
    }
};

module.exports = connectDB;
//
// const mongoose = require("mongoose");
//
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.LOCAL_DATABASE_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`❌ MongoDB Connection Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
