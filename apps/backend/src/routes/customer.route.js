import express from "express";
import { customerController } from "../controllers/index.js";

export default class CustomerRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", customerController.getCustomers);
    this.router.get("/:id", customerController.getCustomer);
    this.router.post("/", customerController.createCustomer);
    this.router.patch("/:id", customerController.updateCustomer);
    this.router.delete("/:id", customerController.deleteCustomer);
  }

  getRouter() {
    return this.router;
  }
}
