import { telemetryDataRepository } from "../repositories/index.js";
import { TelemetryDataNotFoundError } from "@havadash/utils";

export default class TelemetryDataService {
  constructor(repo = telemetryDataRepository) {
    this.telemetryDataRepository = repo;
  }

  async getTelemetryDataList(queryParams) {
    return this.telemetryDataRepository.findAllWithQuery(queryParams);
  }

  async getTelemetryData(id, options = {}) {
    const { include } = options;
    const telemetryData = await this.telemetryDataRepository.findById(id, include);

    if (!telemetryData) {
      throw new TelemetryDataNotFoundError();
    }

    return telemetryData;
  }

  async createTelemetryData(telemetryData) {
    return await this.telemetryDataRepository.create(telemetryData);
  }

  async updateTelemetryData(id, updateData) {
    const telemetryDataToUpdate = await this.telemetryDataRepository.findById(id);
    if (!telemetryDataToUpdate) {
      throw new TelemetryDataNotFoundError();
    }

    return await this.telemetryDataRepository.update(id, updateData);
  }

  async deleteTelemetryData(id) {
    const telemetryDataToDelete = await this.telemetryDataRepository.findById(id);
    if (!telemetryDataToDelete) {
      throw new TelemetryDataNotFoundError();
    }

    await this.telemetryDataRepository.delete(id);
  }

  async getCounts(){
    return this.telemetryDataRepository.countAll();
  }
}
