import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/index.js";
import config from "../../config/app.config.js";

const { jwtConf: jwtConf } = config.COMMON;

export async function login(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user) throw new Error("Invalid email or password");

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error("Invalid email or password");

  const expiresIn = jwtConf.jwtExpiresIn;

  const token = jwt.sign({ id: user.id, email: user.email }, jwtConf.jwtSecret, {
    expiresIn: expiresIn,
  });
    
  const decoded = jwt.decode(token);
  const now = Math.floor(Date.now() / 1000);
  const secondsLeft = decoded.exp - now;

  return { user, token, expiresIn: secondsLeft };
}

export async function logout(user) {
    // Stateless JWT logout: sadece client tarafında token silinir
    // Eğer ileride blacklist uygulanacaksa, buraya DB/Redis kaydı eklenebilir
    return true;
  }

export async function getMe(user) {
  const foundUser = await userRepository.findById(user.id)
  if (!foundUser) throw new Error("User not found");
  return foundUser;
}
