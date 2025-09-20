import express from "express";
import { droneCommandController } from "../controllers/index.js";

export default class DroneCommandRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", droneCommandController.getDroneCommands);
    this.router.get("/:id", droneCommandController.getDroneCommand);
    this.router.post("/", droneCommandController.createDroneCommand);
    this.router.patch("/:id", droneCommandController.updateDroneCommand);
    this.router.delete("/:id", droneCommandController.deleteDroneCommand);
  }

  getRouter() {
    return this.router;
  }
}
