import { Request, Response } from "express";
import Product from "../model/product";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.status(200).json({ products: products });
  } catch (err) {
    return res.status(422).send("INternal server error" + err);
  }
}

export async function createProduct(req: Request, res: Response) {
  const { name, price, image, description, size } = req.body;

  try {
    if (!name || !price || !description || !image || size) {
      return res.status(422).send("Please fill up all fields!");
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      size,
    });

    res.status(200).json({ message: "product created", newProduct });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id)
    console.log(product)

    if(!product) {
      return res.status(404).json({ message: 'Product not found, please provide a valid product'})
    }

    return res.status(201).json({ deleted: product })
  } catch(err) {
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
      size
    })

    res.status(200).json({ message: "updated product", updateProduct})
  } catch(err) {
    return res.status(500).json({ error: `Internal server error ${err}` });
  }
}
