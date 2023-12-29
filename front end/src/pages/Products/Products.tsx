import { useParams } from "react-router-dom";
import "./products.css";
import Header from "../../components/Header/Header";

export default function Products() {

  const { search } = useParams();

  return (
    <div>
      <Header />
      <div className="results-products">
        <p>search: {search} </p>
      </div>
    </div>
  );
}
