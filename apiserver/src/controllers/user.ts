import { Request, Response } from "express";
import { NewUser } from "../db/data-types";
import { createNewUser } from "../db";


export const newUserController = async (req: Request, res: Response) => {
    const user = req.body;
    if(!(user.firstName && user.lastName && user.username && user.password && user.email)) {
        return res.status(400).send({msg: "Data is missing"});
    }
    
    const newUserPayload: NewUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        email: user.email
    }
    console.log(newUserPayload)
    let newUser = null;
    try {
        newUser = await createNewUser(newUserPayload);
    } catch(err) {
        console.log(err)
        return res.status(500).send("Error Creating User")
    }
    return res.status(201).send({msg: "New User Created", user: newUser})

}