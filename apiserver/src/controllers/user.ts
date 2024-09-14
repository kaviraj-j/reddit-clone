import { Request, Response } from "express";
import { NewUser } from "../db/data-types";
import { createNewUser } from "../db";

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
