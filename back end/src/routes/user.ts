import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers";

const userRoutes = Router();

userRoutes.post("/create", createUser);
userRoutes.put("/update_user/:id", updateUser);
userRoutes.delete("/delete", deleteUser);

export default userRoutes;
