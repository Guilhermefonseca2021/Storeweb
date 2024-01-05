import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: [String],
      default: [""],
      required: true,
    },
    size: {
      type: [String],
      default: ["P", "M", "G", "GG"],
    },
    url: {
      type: String
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchema);
export default Product;
