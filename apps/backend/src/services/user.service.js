import { userRepository } from "../repositories/index.js";
import { UserNotFoundError, UserAlreadyExistError } from "@havadash/utils";
import bcrypt from "bcrypt";

export default class UserService {
  constructor(repo = userRepository) {
    this.userRepository = repo;
  }

  async getUsers(queryParams) {
    return this.userRepository.findAllWithQuery(queryParams);
  }

  async getUser(id, options = {}) {
    const { include } = options;

    const user = await this.userRepository.findById(id, include);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async createUser(userData) {
    const { email, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistError(`'${email}' mailine sahip kullanıcı zaten mevcut.`);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userToInsert = {
      ...userData,
      passwordHash,
    };
    delete userToInsert.password;

    const newUser = await this.userRepository.create(userToInsert);
    return newUser;
  }

  async updateUser(id, updateData) {
    const userToUpdate = await this.userRepository.findById(id);
    if (!userToUpdate) {
      throw new UserNotFoundError();
    }

    const { email } = updateData;
    if (email) {
      const conflictingUser = await this.userRepository.findByUniqueFieldsApartFromId(email, id);
      if (conflictingUser) {
        throw new UserAlreadyExistError(`'${email}' mailine sahip başka kullanıcı mevcut.`);
      }
    }

    const updatedUser = await this.userRepository.update(id, updateData);
    return updatedUser;
  }

  async deleteUser(id) {
    const userToDelete = await this.userRepository.findById(id);
    if (!userToDelete) {
      throw new UserNotFoundError();
    }

    await this.userRepository.delete(id);
  }
}
