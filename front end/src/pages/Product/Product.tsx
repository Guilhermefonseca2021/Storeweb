import "./product.css";
import imgProduct from "../../assets/images/moletom-never-stop-learning 1.png";
import Header from "../../components/Header/Header";

export default function Product() {
  return (
    <>
      <Header />
      <div className="product">
        <img src={imgProduct} alt="" />
        <div className="info">
          <div className="description">
            <h2>Moleton Never Stop Learning</h2>
            <p>Moleton fabricado com 88% de algodao e 12% de poliester.</p>

            <p>
              <b>RS99</b> Em 12x s/juros de RS8,25{" "}
            </p>
            <h5>Tamanhos</h5>
            <span>P</span>
            <span>M</span>
            <span>G</span>
            <span>GG</span>
          </div>
          <button>Adicionar ao carrinho</button>
        </div>
      </div>
    </>
  );
}
