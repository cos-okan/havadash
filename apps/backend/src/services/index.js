import MqttService from "./mqtt.service.js";
import AuthService from "./auth.service.js";
import UserService from "./user.service.js";
import CustomerService from "./customer.service.js";
import DroneService from "./drone.service.js";
import OrderService from "./order.service.js";
import CountryService from "./country.service.js";
import CityService from "./city.service.js";
import AddressService from "./address.service.js";
import FlightService from "./flight.service.js";
import FlightLocationService from "./flight-location.service.js";

const mqttService = new MqttService();
const authService = new AuthService();
const userService = new UserService();
const customerService = new CustomerService();
const droneService = new DroneService();
const orderService = new OrderService();
const countryService = new CountryService();
const cityService = new CityService();
const addressService = new AddressService();
const flightService = new FlightService();
const flightLocationService = new FlightLocationService();

export { 
  mqttService,
  authService,
  userService,
  customerService,
  droneService,
  orderService,
  countryService,
  cityService,
  addressService,
  flightService,
  flightLocationService
};
