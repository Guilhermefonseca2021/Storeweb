import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./../model/user";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
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

    res
      .status(200)
      .json({ message: "Login successfully", user: user, token: token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkUser(req: Request, res: Response) {
  let user;
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };

    user = await User.findById(decoded.id);

    user?.password ?? undefined;
  } else {
    user = null;
  }
  
  res.status(200).json({ user: user});
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];
  const { name, email, password, image } = req.body;

  try {
    if (!token) {
      return res
        .status(422)
        .json({ message: "Unauthorized - User not found." });
    }

    const user = await getUserByToken(token, res);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }

    const userAlreadyExists = await User.findOne({ email: email });

    if (userAlreadyExists) {
      return res.status(422).json({ message: "Email is already in user." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
      image,
    });

    res.status(200).json({ message: "User updated", user: updateUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }

    const deletedUser = user.deleteOne();

    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
