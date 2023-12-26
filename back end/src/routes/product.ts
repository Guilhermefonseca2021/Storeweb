import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/productController";

const productRoutes = Router()

productRoutes.post("/create", createProduct)
productRoutes.get('/', getProducts)
productRoutes.delete('/:id', deleteProduct)

export default productRoutes