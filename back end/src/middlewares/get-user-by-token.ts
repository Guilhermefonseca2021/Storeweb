import { Request, Response } from "express";
import User from "./../model/user";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

export default async function getUserByToken(token: string, res: any) {
  if (!token) {
    return (res as Response).status(401).json({ message: "Unauthorized - User not found" });
  }

  const decoded = jwt.verify(token, auth.secret as string) as { id: string};
  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });
  
  return user
}
