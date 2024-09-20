import { Request, Response } from "express";
import * as db from "../db";
import { Prisma, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { genSaltSync, hashSync, hash, compare } from "bcrypt";
import { getUserFromToken } from "../utils/auth";
import {z} from "zod";
import { AuthErrors } from "../lib/error-types/auth";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email format"),
});

export const signUpController = async (req: Request, res: Response) => {
  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  const userExists: User | null = await db.findUserWithEmail(req.body.email);

  if(userExists) {
    return res.status(AuthErrors.EMAIL_EXISTS.statusCode).json({
      message: AuthErrors.EMAIL_EXISTS.message,
      type: AuthErrors.EMAIL_EXISTS.type
    })
  }

  const user = validation.data;

  try {
    const hashedPassword = await hash(user.password, 10);
    const newUser = await db.createNewUser({
      ...user,
      password: hashedPassword,
    });
    if (!newUser) {
      throw new Error("User creation failed");
    }
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user: User | null = await db.findUserWithEmail(email);

  let isPasswordMatch;
  if (user) {
    isPasswordMatch = await compare(password, user.password);
  }

  if (!user || !isPasswordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const jwtSecretKey: string = process.env.JWT_SECRET_KEY ?? "";

  const data = {
    time: Date(),
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
  getUserFromToken(token)
  return res
    .status(200)
    .header({ Authorization: `Bearer ${token}` })
    .json({ message: "Login successful!", token });
};
