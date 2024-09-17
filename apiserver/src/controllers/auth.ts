import { Request, Response } from "express";
import { NewUser } from "../db/data-types";
import * as db from "../db";
import { Prisma, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { genSaltSync, hashSync, hash, compare } from "bcrypt";


export const signUpController = async (req: Request, res: Response) => {
  const user: NewUser = req.body;
  if (
    !(
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.email
    )
  ) {
    return res.status(400).send({ msg: "Data is missing" });
  }
  try {
    const hashedPassword = await hash(user.password, 10);
    const newUser = await db.createNewUser({...user, password: hashedPassword});
    if (!newUser) {
      throw new Error("User creation failed");
    }
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async  (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    
    const user: User | null = await db.findUserWithEmail(email);
    
    let isPasswordMatch
    if(user) {
      isPasswordMatch = await compare(password, user.password)
    }
    
    if(!user || !isPasswordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const jwtSecretKey: string = process.env.JWT_SECRET_KEY ?? "";

    const data = {
        time: Date(),
        userId: user.id,
        username: user.username
    };

    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: "Login successful!", token });
  }