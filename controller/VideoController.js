// const Video = require("../model/Video");
//
// // Upload a video
// const uploadVideo = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const videoPath = req.file.path; // Path where video is stored
//
//         const newVideo = await Video.create({
//             title,
//             description,
//             url: videoPath,
//         });
//
//         res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to upload video", error: error.message });
//     }
// };
//
// // Get all videos
// const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find();
//         res.status(200).json(videos);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch videos", error: error.message });
//     }
// };
//
// // Delete a video
// const deleteVideo = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const video = await Video.findByIdAndDelete(id);
//         if (video) {
//             res.status(200).json({ message: "Video deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Video not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete video", error: error.message });
//     }
// };
//
// module.exports = { uploadVideo, getVideos, deleteVideo };
