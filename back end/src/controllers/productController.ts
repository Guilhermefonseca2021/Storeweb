import { Request, Response } from "express";
import Product from "../model/product";
import User from "../model/user";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { ObjectId } from "mongoose";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.status(200).json({ data: products });
  } catch (err) {
    return res.status(422).send("INternal server error" + err);
  }
}

export async function createProduct(req: Request, res: Response) {
  const url = req.originalUrl;
  const { name, price, image, description, size, featured } = req.body;

  try {
    if (!name || !price || !description || !image || size) {
      return res.status(422).send("Please fill up all fields!");
    }

    const newProduct = await Product.create({
      name,
      price,
      image,
      size,
      featured,
      description,
    });
    
    const url: string = newProduct._id.toString();
    
    newProduct.url = url as string;
    
    await newProduct.save();

    res.status(200).json({ message: "product created", newProduct });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    console.log(product);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found, please provide a valid product" });
    }

    return res.status(201).json({ deleted: product });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const { name, price, image, description, size } = req.body;
  const { id } = req.params;

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
      image,
      description,
      size,
    });

    res.status(200).json({ message: "updated product", updateProduct });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}

export async function addProductToCart(req: Request, res: Response) {
  const { id } = req.params;
  const { quantity } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(422)
        .json({ message: "Unauthorized - User not found." });
    }

    const decoded = jwt.verify(token, auth.secret as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);

    const product = await Product.findById(id);
    console.log(product);

    if (!user || !product) {
      return res
        .status(422)
        .json({ message: "Something went wrong! product or user not found." });
    }

    const addProductToUserCart = await user.cart.push({
      id: product._id,
      quantity: quantity,
    });

    console.log(addProductToCart);

    res
      .status(200)
      .json({ message: "product was add to cart.", addProductToUserCart });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}
