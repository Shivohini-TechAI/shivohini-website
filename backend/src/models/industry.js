import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,                 // <--- image field
  solutions: [String],
  color: String,
  bgGradient: String
});

export default mongoose.model("Industry", industrySchema);
