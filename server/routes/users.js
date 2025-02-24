const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Route to upload user data with image
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const { name, email, age, phone } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        const newUser = new User({ name, email, age, phone, image: imagePath });
        await newUser.save();

        res.json({ success: true, message: "User uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
