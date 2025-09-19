import express from "express";
import { publishMessage } from "../services/mqtt.service.js";

const router = express.Router();

router.post("/publish", (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({
      success: false,
      error: "topic and message required",
    });
  }

  publishMessage(topic, message);

  res.json({ success: true, topic, message });
});

export default router;