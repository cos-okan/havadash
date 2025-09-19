import { promisify } from "util";
import jwt from "jsonwebtoken";
import { EXCLUDED_URLS, HEADERS, TokenNotFoundError, InvalidTokenError, ExpiredTokenError } from "@havadash/utils";

const verifyAsync = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
  if (EXCLUDED_URLS.some((url) => req.path.startsWith(url))) {
    return next();
  }

  try {
    const token = req.headers[HEADERS.AUTHORIZATION]?.split(" ")[1];
    if (!token) {
      throw new TokenNotFoundError();
    }

    const decoded = await verifyAsync(token, { algorithms: ["RS256"] });

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      throw new ExpiredTokenError();
    }

    req.user = decoded;
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