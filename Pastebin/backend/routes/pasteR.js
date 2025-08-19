import express from "express";
import Paste from "../model/Paste.js";
import { nanoid } from "nanoid"; // for slug generation
import sanitizeHtml from "sanitize-html";
const router = express.Router();

// Create a new paste
router.post("/", async (req, res) => {
  const { content, language, expiresIn } = req.body;
  const cleanContent = sanitizeHtml(content, {
    allowedTags: [], // no HTML tags allowed
    allowedAttributes: {}
  });
  console.log(req.body)
  try {
    const slug = nanoid(6);
    const paste = new Paste({
      slug,
      content: cleanContent,
      language,
      expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
    });
    await paste.save();
    res.json({ slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get paste by slug
router.get("/:slug", async (req, res) => {
  try {
    const paste = await Paste.findOne({ slug: req.params.slug });
    if (!paste) return res.status(404).json({ error: "Paste not found" });

    // Check expiry
    if (paste.expiresAt && paste.expiresAt < Date.now()) {
      return res.status(410).json({ error: "Paste expired" });
    }

    // Increment views
    paste.views += 1;
    await paste.save();

    res.json(paste);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
