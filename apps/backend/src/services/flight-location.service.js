import { flightLocationRepository } from "../repositories/index.js";
import { FlightLocationNotFoundError } from "@havadash/utils";

export default class OrderService {
  constructor(repo = flightLocationRepository) {
    this.flightLocationRepository = repo;
  }

  async getFlightLocations(queryParams) {
    return this.flightLocationRepository.findAllWithQuery(queryParams);
  }

  async getFlightLocation(id, options = {}) {
    const { include } = options;
    const flightLocation = await this.flightLocationRepository.findById(id, include);

    if (!flightLocation) {
      throw new FlightLocationNotFoundError();
    }

    return flightLocation;
  }

  async createFlightLocation(flightLocationData) {
    return await this.flightLocationRepository.create(flightLocationData);
  }

  async updateFlightLocation(id, updateData) {
    const flightLocationToUpdate = await this.flightLocationRepository.findById(id);
    if (!flightLocationToUpdate) {
      throw new FlightLocationNotFoundError();
    }

    return await this.flightLocationRepository.update(id, updateData);
  }

  async deleteFlightLocation(id) {
    const flightLocationToDelete = await this.flightLocationRepository.findById(id);
    if (!flightLocationToDelete) {
      throw new FlightLocationNotFoundError();
    }

    await this.flightLocationRepository.delete(id);
  }

  async getCounts(){
    return this.flightLocationRepository.countAll();
  }
}
