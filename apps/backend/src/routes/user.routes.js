import express from "express";
import { userController } from "../controllers/index.js";

export default class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", userController.getUsers);
    this.router.get("/:id", userController.getUser);
    this.router.post("/", userController.createUser);
    this.router.patch("/:id", userController.updateUser);
    this.router.delete("/:id", userController.deleteUser);
  }

  getRouter() {
    return this.router;
  }
}
