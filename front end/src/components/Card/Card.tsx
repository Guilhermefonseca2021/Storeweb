import "./card.css";
import imgProduct from "../../assets/images/moletom-never-stop-learning 1.png";

export default function Card() {

  return (
    <button className="modal-button">
      <div className="card-item">
        <img src={imgProduct} alt="" />
        <div className="description">
          <span>Moleton Never S...</span>
          <button>RS44</button>
        </div>
      </div>   
    </button>
  );
}
