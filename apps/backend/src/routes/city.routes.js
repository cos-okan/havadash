import express from "express";
import { cityController } from "../controllers/index.js";

export default class CityRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", cityController.getCities);
    this.router.get("/:id", cityController.getCity);
    this.router.post("/", cityController.createCity);
    this.router.patch("/:id", cityController.updateCity);
    this.router.delete("/:id", cityController.deleteCity);
  }

  getRouter() {
    return this.router;
  }
}
