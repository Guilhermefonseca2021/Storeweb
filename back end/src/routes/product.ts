import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";

const productRoutes = Router()

productRoutes.post("/create", createProduct)
productRoutes.get('/', getProducts)
productRoutes.delete('/:id', deleteProduct)
productRoutes.put('/:id', updateProduct)

export default productRoutes