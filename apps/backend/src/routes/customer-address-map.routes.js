import express from "express";
import { customerAddressMapController } from "../controllers/index.js";

export default class CustomerAddressMapRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", customerAddressMapController.getCustomerAddressMaps);
    this.router.get("/:id", customerAddressMapController.getCustomerAddressMap);
    this.router.post("/", customerAddressMapController.createCustomerAddressMap);
    this.router.patch("/:id", customerAddressMapController.updateCustomerAddressMap);
    this.router.delete("/:id", customerAddressMapController.deleteCustomerAddressMap);
  }

  getRouter() {
    return this.router;
  }
}
