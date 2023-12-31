import express from "express";
import connectDatabase from "./database/connect";
import cors from "cors";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import stripeRoutes from "./routes/stripe";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("", userRoutes);
app.use("", stripeRoutes);

connectDatabase()
  .then(() => app.listen(3333, () => console.log("server is running at 3333")))
  .catch((err) => console.log(err));
