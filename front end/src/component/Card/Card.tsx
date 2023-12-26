import "./card.css";
import imgProduct from "../../assets/images/moletom-never-stop-learning 1.png";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function Card() {
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <button className="modal-button" onClick={handleOpenModal}>
      <div className="card-item">
        <img src={imgProduct} alt="" />
        <div className="description">
          <span>Moleton Never S...</span>
          <button>RS44</button>
        </div>
      </div>   
      {openModal && <Modal />}
    </button>
  );
}
