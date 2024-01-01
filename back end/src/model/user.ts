import mongoose from "mongoose";
import { Product } from "./../types/product";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    cart: [
      {id: String, quantity: Number}
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", schema);
export default User;
