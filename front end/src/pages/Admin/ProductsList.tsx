import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import Card from "../../components/Card/Card";
import { api } from "../../hooks/useApi";

export default function ProductsList() {
  const [userProducts, setUserProducts] = useState<Product[]>([{}]);

  useEffect(() => {
    async function getProductsFromCart() {
      const productsCart = await api.get("/");

      if (productsCart) {
        setUserProducts(productsCart.data);
        console.log(productsCart);
      }
    }

    getProductsFromCart()
  });

  return (
    <div>
      {userProducts.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </div>
  );
}
