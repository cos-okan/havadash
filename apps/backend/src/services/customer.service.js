import { customerRepository } from "../repositories/index.js";
import { CustomerNotFoundError, CustomerAlreadyExistError } from "@havadash/utils";

export default class CustomerService {
  constructor(repo = customerRepository) {
    this.customerRepository = repo;
  }

  async getCustomers(queryParams) {
    return this.customerRepository.findAllWithQuery(queryParams);
  }

  async getCustomer(id, options = {}) {
    const { include } = options;
    const customer = await this.customerRepository.findById(id, include);

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    return customer;
  }

  async createCustomer(customerData) {
    const { phoneNumber } = customerData;

    const existingCustomer = await this.customerRepository.findByPhoneNumber(phoneNumber);
    if (existingCustomer) {
      throw new CustomerAlreadyExistError(`'${phoneNumber}' telefonuna sahip müşteri zaten mevcut.`);
    }

    const newCustomer = await this.customerRepository.create(customerData);
    return newCustomer;
  }

  async updateCustomer(id, updateData) {
    const customerToUpdate = await this.customerRepository.findById(id);
    if (!customerToUpdate) {
      throw new CustomerNotFoundError();
    }

    const { phoneNumber } = updateData;
    if (phoneNumber) {
      const conflictingCustomer = await this.customerRepository.findByUniqueFieldsApartFromId(phoneNumber, id);
      if (conflictingCustomer) {
        throw new CustomerAlreadyExistError(`'${phoneNumber}' telefonuna sahip başka müşteri mevcut.`);
      }
    }

    const updatedCustomer = await this.customerRepository.update(id, updateData);
    return updatedCustomer;
  }

  async deleteCustomer(id) {
    const customerToDelete = await this.customerRepository.findById(id);
    if (!customerToDelete) {
      throw new CustomerNotFoundError();
    }

    await this.customerRepository.delete(id);
  }

  async getCounts(){
    return this.customerRepository.countAll();
  }
}
