import { Router } from "express";
import { addProductToCart, createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import verifyToken from "../middlewares/verify-token";

const productRoutes = Router()

productRoutes.post("/create", createProduct)
productRoutes.get('/', getProducts)
productRoutes.delete('/:id', deleteProduct)
productRoutes.put('/:id', updateProduct)
productRoutes.post('/product/:id', verifyToken, addProductToCart)

export default productRoutes