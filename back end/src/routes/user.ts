import { Router } from "express";
import {
  checkUser,
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/userControllers";
import verifyToken from "../middlewares/verify-token";

const userRoutes = Router();

userRoutes.post("/signin", loginUser);
userRoutes.post("/register", createUser);
userRoutes.use(verifyToken)
userRoutes.get("/checkuser", checkUser);
userRoutes.put("/update_user/:id", updateUser);
userRoutes.delete("/delete/:id", deleteUser);

export default userRoutes;
