import { useParams } from "react-router-dom";
import "./products.css";
import Header from "../../components/Header/Header";
import useFetchProducts from "../../hooks/useFetchProducts";
import Card from "../../components/Card/Card";

export default function Products() {
  const { products } = useFetchProducts();
  const { search } = useParams();
  
  return (
    <div>
      <Header />
      <div className="results-products">
        <p>search: {search} </p>
        <div>
          {products.map((product) => {
            return (
              <Card name={product.name} image={product.image} price={product.price} size={product.size} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
