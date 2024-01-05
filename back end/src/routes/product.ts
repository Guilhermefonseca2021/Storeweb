import { Router } from "express";
import { addProductToCart, createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import verifyToken from "../middlewares/verify-token";
import { imageUpload } from "../utils/multer";

const productRoutes = Router()

productRoutes.post("/create", createProduct)
productRoutes.get('/', getProducts)
productRoutes.delete('/:id', deleteProduct)
productRoutes.put('/:id', updateProduct)
productRoutes.post('/products/:id', imageUpload.array('files', 7),  verifyToken, addProductToCart)

export default productRoutes