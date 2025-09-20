import express from "express";
import { telemetryDataController } from "../controllers/index.js";

export default class TelemetryDataRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", telemetryDataController.getTelemetryDataList);
    this.router.get("/:id", telemetryDataController.getTelemetryData);
    this.router.post("/", telemetryDataController.createTelemetryData);
    this.router.patch("/:id", telemetryDataController.updateTelemetryData);
    this.router.delete("/:id", telemetryDataController.deleteTelemetryData);
  }

  getRouter() {
    return this.router;
  }
}
