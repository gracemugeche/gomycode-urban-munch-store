// import { Request, Response } from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { amount, currency } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe payment intent error:", error);
//     res.status(500).json({ message: "Failed to create payment intent" });
//   }
// };
