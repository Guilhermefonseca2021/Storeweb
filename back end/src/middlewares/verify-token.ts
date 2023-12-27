import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
import User from "../model/user";
import { UserProps } from './../types/user';

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }
    
    next();
    return user
  } catch (err: any) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}
