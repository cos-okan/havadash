import express from "express";
import { authController } from "../controllers/index.js";

export default class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/login", authController.login);
    this.router.post("/logout", authController.logout);
    this.router.get("/me", authController.me);
  }

  getRouter() {
    return this.router;
  }
}
