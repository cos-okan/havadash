import AuthController from "./auth.controller.js";
import UserController from "./user.controller.js";
import CustomerController from "./customer.controller.js";
import DroneController from "./drone.controller.js";

const authController = new AuthController();
const userController = new UserController();
const customerController = new CustomerController();
const droneController = new DroneController();

export { 
  authController,
  userController,
  customerController,
  droneController
};
