import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "./interfaces";

export const generateAccessToken = (user: User): string => {
  let data: JwtPayload = {
    iss: "DevTestAuth",
    sub: String(user.email),
  };

  return jwt.sign(data, "DevTest");
};

export const verifyAccessToken = (token: string): string | null => {
  try {
    let payload = jwt.verify(token, "DevTest") as JwtPayload;
    return String(payload.sub);
  } catch (e) {
    return null;
  }
};
