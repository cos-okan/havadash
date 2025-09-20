import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import CustomerRoutes from "./customer.route.js";
import MqttRoutes from "./mqtt.routes.js";
import DroneRoutes from "./drone.routes.js";
import OrderRoutes from "./order.routes.js";
import CountryRoutes from "./country.routes.js";
import CityRoutes from "./city.routes.js";

const mqttRoutes = new MqttRoutes();
const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();
const customerRoutes = new CustomerRoutes();
const droneRoutes = new DroneRoutes();
const orderRoutes = new OrderRoutes();
const countryRoutes = new CountryRoutes();
const cityRoutes = new CityRoutes();

export {
  mqttRoutes,
  authRoutes,
  userRoutes,
  customerRoutes,
  droneRoutes,
  orderRoutes,
  countryRoutes,
  cityRoutes
};
