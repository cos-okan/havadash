import { flightRepository } from "../repositories/index.js";
import { FlightNotFoundError } from "@havadash/utils";

export default class OrderService {
  constructor(repo = flightRepository) {
    this.flightRepository = repo;
  }

  async getFlights(queryParams) {
    return this.flightRepository.findAllWithQuery(queryParams);
  }

  async getFlight(id, options = {}) {
    const { include } = options;
    const flight = await this.flightRepository.findById(id, include);

    if (!flight) {
      throw new FlightNotFoundError();
    }

    return order;
  }

  async createFlight(flightData) {
    return await this.flightRepository.create(flightData);
  }

  async updateFlight(id, updateData) {
    const flightToUpdate = await this.flightRepository.findById(id);
    if (!flightToUpdate) {
      throw new FlightNotFoundError();
    }

    return await this.flightRepository.update(id, updateData);
  }

  async deleteFlight(id) {
    const flightToDelete = await this.flightRepository.findById(id);
    if (!flightToDelete) {
      throw new FlightNotFoundError();
    }

    await this.flightRepository.delete(id);
  }

  async getCounts(){
    return this.flightRepository.countAll();
  }
}
