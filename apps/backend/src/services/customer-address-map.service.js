import { customerAddressMapRepository } from "../repositories/index.js";
import { CustomerAddressMapNotFoundError } from "@havadash/utils";

export default class CustomerAddressMapService {
  constructor(repo = customerAddressMapRepository) {
    this.customerAddressMapRepository = repo;
  }

  async getCustomerAddressMaps(queryParams) {
    return this.customerAddressMapRepository.findAllWithQuery(queryParams);
  }

  async getCustomerAddressMap(id, options = {}) {
    const { include } = options;
    const customerAddressMap = await this.customerAddressMapRepository.findById(id, include);

    if (!customerAddressMap) {
      throw new CustomerAddressMapNotFoundError();
    }

    return customerAddressMap;
  }

  async createCustomerAddressMap(customerAddressMapData) {
    return await this.customerAddressMapRepository.create(customerAddressMapData);
  }

  async updateCustomerAddressMap(id, updateData) {
    const customerAddressMapToUpdate = await this.customerAddressMapRepository.findById(id);
    if (!customerAddressMapToUpdate) {
      throw new CustomerAddressMapNotFoundError();
    }

    return await this.customerAddressMapRepository.update(id, updateData);
  }

  async deleteCustomerAddressMap(id) {
    const customerAddressMapToDelete = await this.customerAddressMapRepository.findById(id);
    if (!customerAddressMapToDelete) {
      throw new CustomerAddressMapNotFoundError();
    }

    await this.customerAddressMapRepository.delete(id);
  }

  async getCounts(){
    return this.customerAddressMapRepository.countAll();
  }
}
