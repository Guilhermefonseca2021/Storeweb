import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./../model/user";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { UserProps } from "../types/user";
import getUserByToken from "../middlewares/get-user-by-token";

export async function createUser(req: Request, res: Response) {
  const { name, email, password, image } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(422).json({ message: "Fill up all fields." });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(422).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
    });

    const token = jwt.sign({ id: newUser._id }, auth.secret as string, {
      expiresIn: auth.expiresIn,
    });

    res.status(200).json({ user: newUser, token: token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ message: "Fill up all fields." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ message: "User do not exists." });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Password Invalid." });
    }

    const token = jwt.sign({ id: user._id }, auth.secret as string, {
      expiresIn: auth.expiresIn,
    });

    res.status(200).json({ message: "Login successfully", token: token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function editUser(req: Request, res: Response) {
  let currentUser: UserProps;
  const id = req.params.id;
  const authHeader = req.headers.authorization;
  const { name, email, password } = req.body;

  try {
    if (!authHeader) {
      return res
        .status(422)
        .json({ message: "Unauthorized - User not found." });
    }

    const token = authHeader.split(" ")[1];
    const user = await getUserByToken(token, res);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }

    const userAlreadyExists = await User.findOne({ email: email })

    if(userAlreadyExists) {
      return res.status(422).json({message: 'Email is already in user.'})
    }
    
    
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
