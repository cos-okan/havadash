import MqttService from "./mqtt.service.js";
import AuthService from "./auth.service.js";
import UserService from "./user.service.js";
import CustomerService from "./customer.service.js";
import DroneService from "./drone.service.js";

const mqttService = new MqttService();
const authService = new AuthService();
const userService = new UserService();
const customerService = new CustomerService();
const droneService = new DroneService();

export { 
  mqttService,
  authService,
  userService,
  customerService,
  droneService,
};
