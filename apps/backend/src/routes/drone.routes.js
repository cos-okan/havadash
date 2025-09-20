import express from "express";
import { droneController } from "../controllers/index.js";

export default class DroneRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", droneController.getDrones);
    this.router.get("/:id", droneController.getDrone);
    this.router.post("/", droneController.createDrone);
    this.router.patch("/:id", droneController.updateDrone);
    this.router.delete("/:id", droneController.deleteDrone);
  }

  getRouter() {
    return this.router;
  }
}
