import { userRepository } from "../repositories/index.js";
import { UserNotFoundError, UserAlreadyExistError } from "@havadash/utils";
import bcrypt from "bcrypt";

export async function getUsers(queryParams) {
  return userRepository.findAllWithQuery(queryParams);
}

export async function getUser(id, options = {}) {
  const { include } = options;

  const user = await userRepository.findById(id, include);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export async function createUser(userData) {
  const { email } = userData;

  const existingUser = await userRepository.findByEmail(email);
  
  if (existingUser) {
    throw new UserAlreadyExistError(`'${email}' mailine sahip kullanıcı zaten mevcut.`);
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const userToInsert = {
    ...userData,
    passwordHash,
  };
  delete userToInsert.password;

  const newUser = await userRepository.create(userToInsert);

  return newUser;
}

export async function updateUser(id, updateData) {
  const userToUpdate = await userRepository.findById(id);
  if (!userToUpdate) {
    throw new UserNotFoundError();
  }

  const { email } = updateData;

  const conflictingUser = await userRepository.findByUniqueFieldsApartFromId(email);
  
  if (conflictingUser) {
    throw new UserAlreadyExistError(`'${email}' mailine sahip başka kullanıcı mevcut.`);
  }

  const updatedUser = await userRepository.update(id, userData);

  return updatedUser;
}

export async function deleteUser(id) {
  const userToDelete = await userRepository.findById(id);

  if (!userToDelete) {
    throw new UserNotFoundError();
  }

  await userRepository.delete(id);
}
