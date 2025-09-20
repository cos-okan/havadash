import { countryRepository } from "../repositories/index.js";
import { CountryNotFoundError, CountryAlreadyExistError } from "@havadash/utils";

export default class CountryService {
  constructor(repo = countryRepository) {
    this.countryRepository = repo;
  }

  async getCountries(queryParams) {
    return this.countryRepository.findAllWithQuery(queryParams);
  }

  async getCountry(id, options = {}) {
    const { include } = options;
    const country = await this.countryRepository.findById(id, include);

    if (!country) {
      throw new CountryNotFoundError();
    }

    return country;
  }

  async createCountry(countryData) {
    const { name } = countryData;

    const existingCountry = await this.countryRepository.findByName(name);
    if (existingCountry) {
      throw new CountryAlreadyExistError(`'${name}' isimli ülke zaten mevcut.`);
    }

    const newCountry = await this.countryRepository.create(countryData);
    return newCountry;
  }

  async updateCountry(id, updateData) {
    const countryToUpdate = await this.countryRepository.findById(id);
    if (!countryToUpdate) {
      throw new CountryNotFoundError();
    }

    const { name } = updateData;
    if (name) {
      const conflictingCountry = await this.countryRepository.findByUniqueFieldsApartFromId(name, id);
      if (conflictingCountry) {
        throw new CountryAlreadyExistError(`'${name}' isimli başka ülke mevcut.`);
      }
    }

    const updatedCountry = await this.countryRepository.update(id, updateData);
    return updatedCountry;
  }

  async deleteCountry(id) {
    const countryToDelete = await this.countryRepository.findById(id);
    if (!countryToDelete) {
      throw new CountryNotFoundError();
    }

    await this.countryRepository.delete(id);
  }

  async getCounts(){
    return this.countryRepository.countAll();
  }
}
