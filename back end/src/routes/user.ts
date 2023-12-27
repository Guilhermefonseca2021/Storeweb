import { Router } from "express";
import { createUser } from "../controllers/userControllers";

const userRoutes = Router()

userRoutes.post("/create", createUser)

export default userRoutes