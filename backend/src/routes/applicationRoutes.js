import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import Application from "../models/Application.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();
const router = express.Router();

// ✅ Ensure uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ POST /api/apply — Submit Job Application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const resume = req.file ? req.file.path : "";

    // Save in MongoDB
    const application = new Application({
      name,
      email,
      phone,
      message,
      resume,
    });
    await application.save();

    // Send email to HR
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.HR_EMAIL,
        pass: process.env.HR_PASS,
      },
    });

    const mailOptions = {
      from: process.env.HR_EMAIL,
      to: process.env.HR_EMAIL,
      subject: `New Job Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      attachments: req.file
        ? [{ filename: req.file.originalname, path: req.file.path }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Application received and email sent to HR.");
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
});

export default router;
