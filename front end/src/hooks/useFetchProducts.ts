import { useEffect, useState } from "react";
import { api } from "./useApi";
import { Product } from "../types/Product";

export default function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get("/products/");
      console.log(response.data.data);
      if (response) {
        setProducts(response.data.data);
      }
    }

    fetchProducts();
  });

  return { products };
}
