import Header from "../../component/Header/Header";
import { useParams } from "react-router-dom";
import "./products.css";

export default function Products() {

  const { search } = useParams();

  return (
    <div>
      <Header />
      <div className="results-procuts">
        <p>search: {search} </p>
      </div>
    </div>
  );
}
