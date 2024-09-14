import { Request, Response } from "express";
import { NewUser } from "../db/data-types";
import { createNewUser, findUserWithEmail } from "../db";
import { Prisma, User } from "@prisma/client";

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
    const newUser = await createNewUser(user);
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
    
    const user: User | null = await findUserWithEmail(email);
    console.log({user})
    let isPasswordMatch
    if(user) {
        isPasswordMatch = user?.password === password
    }

    if(!user || !isPasswordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    return res.status(200).json({ message: "Login successful!" });
  } 