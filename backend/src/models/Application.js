import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  resume: String, // File path or URL
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
