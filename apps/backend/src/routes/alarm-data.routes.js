import express from "express";
import { alarmDataController } from "../controllers/index.js";

export default class AlarmDataRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", alarmDataController.getAlarmDataList);
    this.router.get("/:id", alarmDataController.getAlarmData);
    this.router.post("/", alarmDataController.createAlarmData);
    this.router.patch("/:id", alarmDataController.updateAlarmData);
    this.router.delete("/:id", alarmDataController.deleteAlarmData);
  }

  getRouter() {
    return this.router;
  }
}
