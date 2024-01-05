import { Router } from "express";
import { createPayment } from "../controllers/stripeController";

const stripeRoutes = Router()

stripeRoutes.post("/create-payment-intent", createPayment)

export default stripeRoutes
