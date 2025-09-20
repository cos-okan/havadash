import express from "express";
import { flightLocationController } from "../controllers/index.js";

export default class FlightLocationRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", flightLocationController.getFlightLocations);
    this.router.get("/:id", flightLocationController.getFlightLocation);
    this.router.post("/", flightLocationController.createFlightLocation);
    this.router.patch("/:id", flightLocationController.updateFlightLocation);
    this.router.delete("/:id", flightLocationController.deleteFlightLocation);
  }

  getRouter() {
    return this.router;
  }
}
