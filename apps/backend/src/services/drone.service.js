import { droneRepository } from "../repositories/index.js";
import { DroneNotFoundError, DroneAlreadyExistError } from "@havadash/utils";

export default class DroneService {
  constructor(repo = droneRepository) {
    this.droneRepository = repo;
  }

  async getDrones(queryParams) {
    return this.droneRepository.findAllWithQuery(queryParams);
  }

  async getDrone(id, options = {}) {
    const { include } = options;
    const drone = await this.droneRepository.findById(id, include);

    if (!drone) {
      throw new DroneNotFoundError();
    }

    return drone;
  }

  async createDrone(droneData) {
    const { code } = droneData;

    const existingDrone = await this.droneRepository.findByCode(code);
    if (existingDrone) {
      throw new DroneAlreadyExistError(`'${code}' koduna sahip drone zaten mevcut.`);
    }

    const newDrone = await this.droneRepository.create(droneData);
    return newDrone;
  }

  async updateDrone(id, updateData) {
    const droneToUpdate = await this.droneRepository.findById(id);
    if (!droneToUpdate) {
      throw new DroneNotFoundError();
    }

    const { code } = updateData;
    if (code) {
      const conflictingDrone = await this.droneRepository.findByUniqueFieldsApartFromId(code, id);
      if (conflictingDrone) {
        throw new DroneAlreadyExistError(`'${code}' koduna sahip başka müşteri mevcut.`);
      }
    }

    const updatedDrone = await this.droneRepository.update(id, updateData);
    return updatedDrone;
  }

  async deleteDrone(id) {
    const droneToDelete = await this.droneRepository.findById(id);
    if (!droneToDelete) {
      throw new DroneNotFoundError();
    }

    await this.droneRepository.delete(id);
  }

  async getCounts(){
    return this.droneRepository.countAll();
  }
}
