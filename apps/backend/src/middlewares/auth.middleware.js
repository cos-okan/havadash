import jwt from "jsonwebtoken";
import { 
  EXCLUDED_URLS, 
  TokenNotFoundError, 
  InvalidTokenError, 
  ExpiredTokenError 
} from "@havadash/utils";
import config from "../../config/app.config.js";

const { jwtConf } = config.COMMON;

const authMiddleware = (req, res, next) => {
  // Whitelist (Auth gerektirmeyen URL'ler)
  if (EXCLUDED_URLS.some((url) => req.path.startsWith(url))) {
    return next();
  }

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new TokenNotFoundError();
    }

    jwt.verify(token, jwtConf.jwtSecret, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new ExpiredTokenError());
        }
        return next(new InvalidTokenError());
      }
      req.user = user;
      next();
    });

  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
