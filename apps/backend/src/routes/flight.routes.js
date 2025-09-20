import express from "express";
import { flightController } from "../controllers/index.js";

export default class FlightRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", flightController.getFlights);
    this.router.get("/:id", flightController.getFlight);
    this.router.post("/", flightController.createFlight);
    this.router.patch("/:id", flightController.updateFlight);
    this.router.delete("/:id", flightController.deleteFlight);
  }

  getRouter() {
    return this.router;
  }
}
