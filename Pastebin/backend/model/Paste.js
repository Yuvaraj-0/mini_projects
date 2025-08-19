import mongoose from "mongoose";




const PasteSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    language: { type: String, default: "text" },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    views: { type: Number, default: 0 },
  });
  
  // TTL index: deletes the document automatically when expiresAt is reached
  PasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  
  export default mongoose.model("Paste", PasteSchema);
  