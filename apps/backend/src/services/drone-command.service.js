import { droneCommandRepository } from "../repositories/index.js";
import { DroneCommandNotFoundError } from "@havadash/utils";

export default class DroneCommandService {
  constructor(repo = droneCommandRepository) {
    this.droneCommandRepository = repo;
  }

  async getDroneCommands(queryParams) {
    return this.droneCommandRepository.findAllWithQuery(queryParams);
  }

  async getDroneCommand(id, options = {}) {
    const { include } = options;
    const droneCommand = await this.droneCommandRepository.findById(id, include);

    if (!droneCommand) {
      throw new DroneCommandNotFoundError();
    }

    return droneCommand;
  }

  async createDroneCommand(droneCommand) {
    return await this.droneCommandRepository.create(droneCommand);
  }

  async updateDroneCommand(id, updateData) {
    const droneCommandToUpdate = await this.droneCommandRepository.findById(id);
    if (!droneCommandToUpdate) {
      throw new DroneCommandNotFoundError();
    }

    return await this.droneCommandRepository.update(id, updateData);
  }

  async deleteDroneCommand(id) {
    const droneCommandToDelete = await this.droneCommandRepository.findById(id);
    if (!droneCommandToDelete) {
      throw new DroneCommandNotFoundError();
    }

    await this.droneCommandRepository.delete(id);
  }

  async getCounts(){
    return this.droneCommandRepository.countAll();
  }
}
