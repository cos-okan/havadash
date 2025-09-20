import { Model } from "objection";
import bcrypt from "bcrypt";
import { userRepository, customerRepository } from "../../repositories/index.js";
import * as userService from "../../services/user.service.js";
import * as customerService from "../../services/customer.service.js";
import { log } from '../../utils/logger.js';
import { RoleEnum } from "@havadash/utils";
import { faker } from '@faker-js/faker';

export async function seed(knex) {
  try {
    Model.knex(knex);
    console.log('Dummy seed operation started...');

    await seedUsers(knex);
    await seedCustomers(knex);

    log('Dummy seed operation finished...');
  } catch (error) {
    log('Error during dummy seed operation:', error);
    throw error;
  }
}

async function seedUsers(params) {
  const existingCount = await userRepository.countAll();

  log(`userCount: ${existingCount}`);
  if (existingCount > 0) {
    log('User records already exist, skipping seed.');
    return;
  }

  const passwordHash = await bcrypt.hash("Admin1234*", 10);

  log('Seeding dummy user records...');

  await userRepository.create({
    email: "admin@havadash.com",
    passwordHash: passwordHash,
    username: "Admin",
    roleCode: RoleEnum.ADMIN,
    createdBy: 1,
  });

  log(`Dummy user records have been seeded successfully.`);
}

async function seedCustomers() {
  const existingCount = await customerRepository.countAll();

  if (existingCount > 0) {
    log('Customer records already exist, skipping seed.');
    return;
  }

  log('Seeding dummy customer records...');

  const customerPromises = Array.from({ length: 10 }).map(() => {
    const customerData = {
      createdBy: 1,
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
    };
    return customerService.createCustomer(customerData); 
  });

  await Promise.all(customerPromises);

  log(`Dummy customer records have been seeded successfully.`);
}