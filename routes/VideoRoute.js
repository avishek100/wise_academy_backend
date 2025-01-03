const express = require("express");
const multer = require("multer");
const path = require("path");
const Video = require("../model/Video");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1677628392.mp4
    },
});

const upload = multer({ storage });

// POST route for uploading videos
router.post("/upload", upload.single("video"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const video = new Video({
            title,
            description,
            videoPath: req.file.path,
        });
        await video.save();
        res.status(201).json({ message: "Video uploaded successfully", video });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
