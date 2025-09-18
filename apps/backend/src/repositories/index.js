// Modelleri import et
import { User } from "../models/index.js";

// Repositories
import UserRepository from "./user.repository.js";

// Repository instance'larını oluştur ve export et
const userRepository = new UserRepository(User);

export { userRepository };
