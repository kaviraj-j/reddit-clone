import { Request, Response } from "express";
import * as db from "../db";
import { Prisma, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { genSaltSync, hashSync, hash, compare } from "bcrypt";
import { getUserFromToken } from "../utils/auth";
import { z } from "zod";
import { AuthErrors } from "../lib/error-types/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecretKey: string = process.env.JWT_SECRET_KEY ?? "";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email format"),
});

export const signUp = async (req: Request, res: Response) => {
  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: req.body.email }, { username: req.body.username }],
    },
  });

  if (userExists) {
    if (userExists.email === req.body.email) {
      return res.status(AuthErrors.EMAIL_EXISTS.statusCode).json({
        message: AuthErrors.EMAIL_EXISTS.message,
        type: AuthErrors.EMAIL_EXISTS.type,
      });
    }

    if (userExists.username === req.body.username) {
      return res.status(AuthErrors.USERNAME_NOT_AVAILABLE.statusCode).json({
        message: AuthErrors.USERNAME_NOT_AVAILABLE.message,
        type: AuthErrors.USERNAME_NOT_AVAILABLE.type,
      });
    }
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
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    const data = {
      time: Date(),
      ...userResponse,
    };

    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
    res
      .status(201)
      .json({ token, user: userResponse, message: "New User Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
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
  const userResponse = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const data = {
    time: Date(),
    ...userResponse,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });

  return res
    .status(200)
    .json({ message: "Login successful!", user: userResponse, token });
};

export const validate = async (req: Request, res: Response) => {
  res.status(200).json({message: "Valid Token"});
};
