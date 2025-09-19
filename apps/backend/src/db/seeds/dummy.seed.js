import { Model } from "objection";
import bcrypt from "bcrypt";
import { userRepository } from "../../repositories/index.js";
import { log } from '../../utils/logger.js';
import { RoleEnum } from "@havadash/utils";

export async function seed(knex) {
  try {
    Model.knex(knex);
    console.log('Dummy seed operation started...');

    //await seedCountries(knex);
    //await seedCities(knex);
    await seedUsers(knex);

    log('Dummy seed operation finished...');
  } catch (error) {
    log('Error during dummy seed operation:', error);
    throw error;
  }
}

async function seedCountries(params) {
  
}

async function seedCities(params) {
  
}

async function seedUsers(params) {
  const existingCount = userRepository.countAll();

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