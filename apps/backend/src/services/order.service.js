import { orderRepository } from "../repositories/index.js";
import { OrderNotFoundError, OrderAlreadyExistError } from "@havadash/utils";

export default class OrderService {
  constructor(repo = orderRepository) {
    this.orderRepository = repo;
  }

  async getOrders(queryParams) {
    return this.orderRepository.findAllWithQuery(queryParams);
  }

  async getOrder(id, options = {}) {
    const { include } = options;
    const order = await this.orderRepository.findById(id, include);

    if (!order) {
      throw new OrderNotFoundError();
    }

    return order;
  }

  async createOrder(orderData) {
    const { orderNo } = orderData;

    const existingOrder = await this.orderRepository.findByOrderNo(orderNo);
    if (existingOrder) {
      throw new OrderAlreadyExistError(`'${orderNo}' sipariş numarasına sahip sipariş zaten mevcut.`);
    }

    const newOrder = await this.orderRepository.create(orderData);
    return newOrder;
  }

  async updateOrder(id, updateData) {
    const orderToUpdate = await this.orderRepository.findById(id);
    if (!orderToUpdate) {
      throw new OrderNotFoundError();
    }

    const { orderNo } = updateData;
    if (orderNo) {
      const conflictingOrder = await this.orderRepository.findByUniqueFieldsApartFromId(orderNo, id);
      if (conflictingOrder) {
        throw new OrderAlreadyExistError(`'${orderNo}' sipariş numarasına sahip başka sipariş mevcut.`);
      }
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    return updatedOrder;
  }

  async deleteOrder(id) {
    const orderToDelete = await this.orderRepository.findById(id);
    if (!orderToDelete) {
      throw new OrderNotFoundError();
    }

    await this.orderRepository.delete(id);
  }

  async getCounts(){
    return this.orderRepository.countAll();
  }
}
