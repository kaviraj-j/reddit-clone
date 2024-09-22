import { verify } from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY ?? "";

export const getUserFromToken = (token: string) => {
  return verify(token, jwtSecretKey);
};
