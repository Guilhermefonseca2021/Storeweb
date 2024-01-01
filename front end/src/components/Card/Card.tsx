import "./card.css";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";

export default function Card({ id, name, image, price }: Product) {
  const navigate = useNavigate()
  const productId = id

  function goToProduct() {
    navigate(`/product/${productId}`)
  }

  return (
    <button onClick={goToProduct} className="modal-button">
      <div className="card-item">
        <img src={image} alt="" />
        <div className="description">
          <span>{name}</span>
          <button>{price}</button>
        </div>
      </div>
    </button>
  );
}
