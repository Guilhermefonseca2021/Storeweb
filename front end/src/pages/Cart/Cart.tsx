import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import useProductsCart from "../../hooks/useProductsCart";

export default function Cart() {
  const { userProducts } = useProductsCart();
  return (
    <div>
      <Header />
      <div className="cart-content">
        {userProducts?.map((product) => (
          <Card
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
