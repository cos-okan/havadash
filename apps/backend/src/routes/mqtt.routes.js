import express from "express";
import { mqttService } from "../services/index.js";

export default class MqttRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/publish", this.publishMessage.bind(this));
  }

  publishMessage(req, res) {
    const { topic, message } = req.body;

    if (!topic || !message) {
      return res.status(400).json({
        success: false,
        error: "topic and message required",
      });
    }

    mqttService.publishMessage(topic, message);

    res.json({ success: true, topic, message });
  }

  getRouter() {
    return this.router;
  }
}
