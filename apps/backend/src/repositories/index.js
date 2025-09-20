import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import Country from "../models/country.model.js";
import City from "../models/city.model.js";
import Address from "../models/address.model.js";
import CustomerAddressMap from "../models/customer-address-map.model.js";
import Order from "../models/order.model.js";
import Drone from "../models/drone.model.js";
import Flight from "../models/flight.model.js";
import FlightLocation from "../models/flight-location.model.js";
import TelemetryData from "../models/telemetry-data.model.js";
import AlarmData from "../models/alarm-data.model.js";
import DroneCommand from "../models/drone-command.model.js";

import UserRepository from "./user.repository.js";
import CustomerRepository from "./customer.repository.js";
import CountryRepository from "./country.repository.js";
import CityRepository from "./city.repository.js";
import AddressRepository from "./address.repository.js";
import CustomerAddressMapRepository from "./customer-address-map.repository.js";
import OrderRepository from "./order.repository.js";
import DroneRepository from "./drone.repository.js";
import FlightRepository from "./flight.repository.js";
import FlightLocationRepository from "./flight-location.repository.js";
import TelemtryDataRepository from "./telemetry-data.repository.js";
import AlarmDataRepository from "./alarm-data.repository.js";
import DroneCommandRepository from "./drone-command.repository.js";
import PrmRepository from "./prm.repository.js";

const userRepository = new UserRepository(User);
const customerRepository = new CustomerRepository(Customer);
const countryRepository = new CountryRepository(Country);
const cityRepository = new CityRepository(City);
const addressRepository = new AddressRepository(Address);
const customerAddressMapRepository = new CustomerAddressMapRepository(CustomerAddressMap);
const orderRepository = new OrderRepository(Order);
const droneRepository = new DroneRepository(Drone);
const flightRepository = new FlightRepository(Flight);
const flightLocationRepository = new FlightLocationRepository(FlightLocation);
const telemetryDataRepository = new TelemtryDataRepository(TelemetryData);
const alarmDataRepository = new AlarmDataRepository(AlarmData);
const droneCommandRepository = new DroneCommandRepository(DroneCommand);


export { 
  userRepository, 
  customerRepository, 
  countryRepository,
  cityRepository,
  addressRepository,
  customerAddressMapRepository,
  orderRepository,
  droneRepository,
  flightRepository,
  flightLocationRepository,
  telemetryDataRepository,
  alarmDataRepository,
  droneCommandRepository,
};
