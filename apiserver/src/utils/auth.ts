import { verify } from "jsonwebtoken"
const jwtSecretKey = process.env.JWT_SECRET_KEY ?? ""

export const getUserFromToken = (token: string) => {
  const output = verify(token, jwtSecretKey)
  console.log({output})
}