import AuthController from "./auth.controller.js";
import UserController from "./user.controller.js";
import CustomerController from "./customer.controller.js";

const authController = new AuthController();
const userController = new UserController();
const customerController = new CustomerController()

export { 
  authController,
  userController,
  customerController
};
