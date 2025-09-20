import { addressRepository } from "../repositories/index.js";
import { AddressNotFoundError } from "@havadash/utils";

export default class AddressService {
  constructor(repo = addressRepository) {
    this.addressRepository = repo;
  }

  async getAddresses(queryParams) {
    return this.addressRepository.findAllWithQuery(queryParams);
  }

  async getAddress(id, options = {}) {
    const { include } = options;
    const address = await this.addressRepository.findById(id, include);

    if (!address) {
      throw new AddressNotFoundError();
    }

    return address;
  }

  async createAddress(addressData) {
    return await this.addressRepository.create(addressData);
  }

  async updateAddress(id, updateData) {
    const adressToUpdate = await this.addressRepository.findById(id);
    if (!adressToUpdate) {
      throw new AddressNotFoundError();
    }

    return await this.addressRepository.update(id, updateData);
  }

  async deleteAddress(id) {
    const addressToDelete = await this.addressRepository.findById(id);
    if (!addressToDelete) {
      throw new AddressNotFoundError();
    }

    await this.addressRepository.delete(id);
  }

  async getCounts(){
    return this.addressRepository.countAll();
  }
}
