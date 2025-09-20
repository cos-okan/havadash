import express from "express";
import { countryController } from "../controllers/index.js";

export default class CountryRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", countryController.getCountries);
    this.router.get("/:id", countryController.getCountry);
    this.router.post("/", countryController.createCountry);
    this.router.patch("/:id", countryController.updateCountry);
    this.router.delete("/:id", countryController.deleteCountry);
  }

  getRouter() {
    return this.router;
  }
}
