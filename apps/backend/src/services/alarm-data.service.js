import { alarmDataRepository } from "../repositories/index.js";
import { AlarmDataNotFoundError } from "@havadash/utils";

export default class AlarmDataService {
  constructor(repo = alarmDataRepository) {
    this.alarmDataRepository = repo;
  }

  async getAlarmDataList(queryParams) {
    return this.alarmDataRepository.findAllWithQuery(queryParams);
  }

  async getAlarmData(id, options = {}) {
    const { include } = options;
    const alarmData = await this.alarmDataRepository.findById(id, include);

    if (!alarmData) {
      throw new AlarmDataNotFoundError();
    }

    return alarmData;
  }

  async createAlarmData(alarmData) {
    return await this.alarmDataRepository.create(alarmData);
  }

  async updateAlarmData(id, updateData) {
    const alarmDataToUpdate = await this.alarmDataRepository.findById(id);
    if (!alarmDataToUpdate) {
      throw new AlarmDataNotFoundError();
    }

    return await this.alarmDataRepository.update(id, updateData);
  }

  async deleteAlarmData(id) {
    const alarmDataToDelete = await this.alarmDataRepository.findById(id);
    if (!alarmDataToDelete) {
      throw new AlarmDataNotFoundError();
    }

    await this.alarmDataRepository.delete(id);
  }

  async getCounts(){
    return this.alarmDataRepository.countAll();
  }
}
