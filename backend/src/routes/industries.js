import express from "express";
import Industry from "../models/industry.js";
import { upload } from "../config/multerConfig.js";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ===========================================
   1️⃣ GET ALL INDUSTRIES — RETURN FULL ICON URL
=========================================== */
router.get("/", async (req, res, next) => {
  try {
    const industries = await Industry.find();

    const formatted = industries.map((item) => ({
      ...item._doc,
      icon: item.icon
        ? `http://localhost:5000${item.icon}`
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

/* ===========================================
   2️⃣ ADD NEW INDUSTRY (with image)
   POST /api/industries
=========================================== */
router.post("/", upload.single("icon"), async (req, res, next) => {
  try {
    const industry = new Industry({
      title: req.body.title,
      description: req.body.description,
      solutions: req.body.solutions,
      color: req.body.color,
      bgGradient: req.body.bgGradient,
      icon: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await industry.save();

    res.json({
      ...industry._doc,
      icon: industry.icon
        ? `http://localhost:5000${industry.icon}`
        : null,
    });
  } catch (err) {
    next(err);
  }
});

/* ===========================================
   3️⃣ UPDATE INDUSTRY (with optional new image)
   PUT /api/industries/:id
=========================================== */
router.put("/:id", upload.single("icon"), async (req, res, next) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    // If a new image is uploaded → delete old one
    if (req.file && industry.icon) {
      const oldPath = path.join("uploads", path.basename(industry.icon));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    industry.title = req.body.title ?? industry.title;
    industry.description = req.body.description ?? industry.description;
    industry.solutions = req.body.solutions ?? industry.solutions;
    industry.color = req.body.color ?? industry.color;
    industry.bgGradient = req.body.bgGradient ?? industry.bgGradient;

    if (req.file) {
      industry.icon = `/uploads/${req.file.filename}`;
    }

    await industry.save();

    res.json({
      ...industry._doc,
      icon: industry.icon
        ? `http://localhost:5000${industry.icon}`
        : null,
    });
  } catch (err) {
    next(err);
  }
});

/* ===========================================
   4️⃣ DELETE INDUSTRY + IMAGE FILE
=========================================== */
router.delete("/:id", async (req, res, next) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    // Delete icon file if exists
    if (industry.icon) {
      const filePath = path.join("uploads", path.basename(industry.icon));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Industry.findByIdAndDelete(req.params.id);

    res.json({ message: "Industry deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
