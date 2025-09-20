import express from "express";
import { addressController } from "../controllers/index.js";

export default class AddressRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", addressController.getAddresses);
    this.router.get("/:id", addressController.getAddress);
    this.router.post("/", addressController.createAddress);
    this.router.patch("/:id", addressController.updateAddress);
    this.router.delete("/:id", addressController.deleteAddress);
  }

  getRouter() {
    return this.router;
  }
}
