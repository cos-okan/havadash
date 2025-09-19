import jwt from "jsonwebtoken";
import { EXCLUDED_URLS, HEADERS, TokenNotFoundError, InvalidTokenError, ExpiredTokenError } from "@havadash/utils";
import config from "../../config/app.config.js";

const { jwtConf: jwtConf } = config.COMMON;

const authMiddleware = async (req, res, next) => {
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
        return res.status(403).json({ message: "[Auth] Token geçersiz." });
      }
      req.user = user;
      next();
    });

    const decoded = jwt.decode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      throw new ExpiredTokenError();
    }

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(new InvalidTokenError());
    } else if (err instanceof ExpiredTokenError || err instanceof TokenNotFoundError) {
      next(err);
    } else {
      next(err);
    }
  }
};

export default authMiddleware;