import express from "express";
import connectDatabase from "./database/connect";
import cors from 'cors';
import productRoutes from "./routes/product";

const app = express();
app.use(express.json());
app.use(cors())

app.use('/products', productRoutes)

connectDatabase()
  .then(() => app.listen(3333, () => console.log("server is running at 3333")))
  .catch((err) => console.log(err));
  