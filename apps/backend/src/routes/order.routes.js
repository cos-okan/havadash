import express from "express";
import { orderController } from "../controllers/index.js";

export default class OrderRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", orderController.getOrders);
    this.router.get("/:id", orderController.getOrder);
    this.router.post("/", orderController.createOrder);
    this.router.patch("/:id", orderController.updateOrder);
    this.router.delete("/:id", orderController.deleteOrder);
  }

  getRouter() {
    return this.router;
  }
}
