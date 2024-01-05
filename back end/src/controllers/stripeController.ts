import { Request, Response } from "express";
import stripe from "stripe";

export async function createPayment(req: Request, res: Response) {
    const { items, currency } = req.body;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: currency,
//   });

//   res.json({ clientSecret: paymentIntent.client_secret });
};