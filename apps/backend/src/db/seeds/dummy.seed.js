import { Model } from "objection";
import { userService, customerService, droneService } from "../../services/index.js";
import { log } from '../../utils/logger.js';
import { RoleEnum } from "@havadash/utils";
import { faker } from '@faker-js/faker';

export async function seed(knex) {
  try {
    Model.knex(knex);
    console.log('Dummy seed operation started...');

    await seedUsers();
    await seedCustomers();
    await seedDrones()

    log('Dummy seed operation finished...');
  } catch (error) {
    log('Error during dummy seed operation:', error);
    throw error;
  }
}

async function seedUsers() {
  const existingCount = await userService.getCounts();

  if (existingCount > 0) {
    log('User records already exist, skipping seed.');
    return;
  }

  log('Seeding dummy user records...');

  const userData = {
    createdBy: 1,
    email: "admin@havadash.com",
    password: "Admin1234*",
    username: "Admin",
    roleCode: RoleEnum.ADMIN,
  };
  
  await userService.createUser(userData); 

  log(`Dummy user records have been seeded successfully.`);
}

async function seedCustomers() {
  const existingCount = await customerService.getCounts();

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

async function seedDrones() {
  const existingCount = await droneService.getCounts();

  if (existingCount > 0) {
    log('Drone records already exist, skipping seed.');
    return;
  }

  log('Seeding dummy drone records...');

  const dronePromises = Array.from({ length: 10 }).map(() => {
    const droneData = {
      createdBy: 1,
      code: faker.string.alphanumeric(8).toUpperCase(),
      serialNumber: faker.string.uuid(),
      modelCode: faker.number.int({ min: 1, max: 5 }),
      stateCode: faker.number.int({ min: 1, max: 4 }),
      maxPayloadKg: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
      batteryCapacity: faker.number.float({ min: 2000, max: 10000, precision: 1 }),
      latitude: faker.number.float({ min: 40.75, max: 41.1, precision: 0.0001 }),
      longitude: faker.number.float({ min: 28.8, max: 29.3, precision: 0.0001 }),
      altitude: faker.number.float({ min: 0, max: 500, precision: 0.1 }),
      lastLocationTime: faker.date.recent().toISOString(),
    };
    return droneService.createDrone(droneData); 
  });

  await Promise.all(dronePromises);

  log(`Dummy drone records have been seeded successfully.`);
}