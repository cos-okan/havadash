import AuthController from "./auth.controller.js";
import UserController from "./user.controller.js";
import CustomerController from "./customer.controller.js";
import DroneController from "./drone.controller.js";
import OrderController from "./order.controller.js";
import CountryController from "./country.controller.js";
import CityController from "./city.controller.js";
import AddressController from "./address.controller.js";

const authController = new AuthController();
const userController = new UserController();
const customerController = new CustomerController();
const droneController = new DroneController();
const orderController = new OrderController();
const countryController = new CountryController();
const cityController = new CityController();
const addressController = new AddressController();


export { 
  authController,
  userController,
  customerController,
  droneController,
  orderController,
  countryController,
  cityController,
  addressController
};
