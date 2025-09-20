import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import CustomerRoutes from "./customer.route.js";
import MqttRoutes from "./mqtt.routes.js";
import DroneRoutes from "./drone.routes.js";
import OrderRoutes from "./order.routes.js";
import CountryRoutes from "./country.routes.js";
import CityRoutes from "./city.routes.js";
import AddressRoutes from "./address.routes.js";
import FlightRoutes from "./flight.routes.js";
import FlightLocationRoutes from "./flight-location.routes.js";
import TelemetryDataRoutes from "./telemetry-data.routes.js";
import AlarmDataRoutes from "./alarm-data.routes.js";
import DroneCommandRoutes from "./drone-command.routes.js";
import CustomerAddressMapRoutes from "./customer-address-map.routes.js";

const mqttRoutes = new MqttRoutes();
const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();
const customerRoutes = new CustomerRoutes();
const droneRoutes = new DroneRoutes();
const orderRoutes = new OrderRoutes();
const countryRoutes = new CountryRoutes();
const cityRoutes = new CityRoutes();
const addressRoutes = new AddressRoutes();
const flightRoutes = new FlightRoutes();
const flightLocationRoutes = new FlightLocationRoutes();
const telemetryDataRoutes = new TelemetryDataRoutes();
const alarmDataRoutes = new AlarmDataRoutes();
const droneCommandRoutes = new DroneCommandRoutes();
const customerAddressMapRoutes = new CustomerAddressMapRoutes();

export {
  mqttRoutes,
  authRoutes,
  userRoutes,
  customerRoutes,
  droneRoutes,
  orderRoutes,
  countryRoutes,
  cityRoutes,
  addressRoutes,
  flightRoutes,
  flightLocationRoutes,
  telemetryDataRoutes,
  alarmDataRoutes,
  droneCommandRoutes,
  customerAddressMapRoutes
};
