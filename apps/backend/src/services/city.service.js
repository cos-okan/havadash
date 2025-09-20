import { cityRepository } from "../repositories/index.js";
import { CityNotFoundError, CityAlreadyExistError } from "@havadash/utils";

export default class CityService {
  constructor(repo = cityRepository) {
    this.cityRepository = repo;
  }

  async getCities(queryParams) {
    return this.cityRepository.findAllWithQuery(queryParams);
  }

  async getCity(id, options = {}) {
    const { include } = options;
    const city = await this.cityRepository.findById(id, include);

    if (!city) {
      throw new CityNotFoundError();
    }

    return city;
  }

  async createCity(cityData) {
    const { name } = cityData;

    const existingCity = await this.cityRepository.findByName(name);
    if (existingCity) {
      throw new CityAlreadyExistError(`'${name}' isimli şehir zaten mevcut.`);
    }

    const newCity = await this.cityRepository.create(cityData);
    return newCity;
  }

  async updateCity(id, updateData) {
    const cityToUpdate = await this.cityRepository.findById(id);
    if (!cityToUpdate) {
      throw new CityNotFoundError();
    }

    const { name } = updateData;
    if (name) {
      const conflictingCity = await this.cityRepository.findByUniqueFieldsApartFromId(name, id);
      if (conflictingCity) {
        throw new CityAlreadyExistError(`'${name}' isimli başka şehir mevcut.`);
      }
    }

    const updatedCity = await this.cityRepository.update(id, updateData);
    return updatedCity;
  }

  async deleteCity(id) {
    const cityToDelete = await this.cityRepository.findById(id);
    if (!cityToDelete) {
      throw new CityNotFoundError();
    }

    await this.cityRepository.delete(id);
  }

  async getCounts(){
    return this.cityRepository.countAll();
  }
}
