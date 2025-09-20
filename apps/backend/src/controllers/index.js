import AuthController from "./auth.controller.js";
import UserController from "./user.controller.js";
import CustomerController from "./customer.controller.js";
import DroneController from "./drone.controller.js";
import OrderController from "./order.controller.js";
import CountryController from "./country.controller.js";
import CityController from "./city.controller.js";
import AddressController from "./address.controller.js";
import FlightController from "./flight.controller.js";
import FlightLocationController from "./flight-location.controller.js";
import TelemetryDataController from "./telemetry-data.controller.js";
import AlarmDataController from "./alarm-data.controller.js";
import DroneCommandController from "./drone-command.controller.js";
import CustomerAddressMapController from "./customer-address-map.controller.js";

const authController = new AuthController();
const userController = new UserController();
const customerController = new CustomerController();
const droneController = new DroneController();
const orderController = new OrderController();
const countryController = new CountryController();
const cityController = new CityController();
const addressController = new AddressController();
const flightController = new FlightController();
const flightLocationController = new FlightLocationController();
const telemetryDataController = new TelemetryDataController();
const alarmDataController = new AlarmDataController();
const droneCommandController = new DroneCommandController();
const customerAddressMapController = new CustomerAddressMapController();

export { 
  authController,
  userController,
  customerController,
  droneController,
  orderController,
  countryController,
  cityController,
  addressController,
  flightController,
  flightLocationController,
  telemetryDataController,
  alarmDataController,
  droneCommandController,
  customerAddressMapController
};
