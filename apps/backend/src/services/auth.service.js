import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/index.js";
import config from "../../config/app.config.js";

const { jwtConf } = config.COMMON;

export default class AuthService {
  constructor(userRepo = userRepository) {
    this.userRepository = userRepo;
    this.jwtSecret = jwtConf.jwtSecret;
    this.jwtExpiresIn = jwtConf.jwtExpiresIn;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    const decoded = jwt.decode(token);
    const now = Math.floor(Date.now() / 1000);
    const secondsLeft = decoded.exp - now;

    return { user, token, expiresIn: secondsLeft };
  }

  async logout(user) {
    // Stateless JWT logout: sadece client tarafında token silinir
    // İleride blacklist uygulanacaksa, buraya DB/Redis kaydı eklenebilir
    return true;
  }

  async getMe(user) {
    const foundUser = await this.userRepository.findById(user.id);
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }
}
