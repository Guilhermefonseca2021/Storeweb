import { useEffect, useState } from "react";
import { api } from "./useApi";
import { Product } from "../types/Product";

export default function useProductsCart() {
  const [userProducts, setUserProducts] = useState<Product[]>();
  
  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get("/products/");
      console.log(response.data);
      if (response) {
        setUserProducts(response.data);
      }
    }

    fetchProducts();
  });

  return { userProducts };
}
