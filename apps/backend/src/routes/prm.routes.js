import express from "express";
import { prmController } from "../controllers/index.js";

export default class PrmRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", prmController.getPrms);
  }

  getRouter() {
    return this.router;
  }
}
