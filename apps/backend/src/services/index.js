import AuthService from "./auth.service.js";
import UserService from "./user.service.js";
import CustomerService from "./customer.service.js";
import MqttService from "./mqtt.service.js";

const authService = new AuthService();
const userService = new UserService();
const customerService = new CustomerService();
const mqttService = new MqttService();

export { 
  authService,
  userService,
  customerService,
  mqttService
};
