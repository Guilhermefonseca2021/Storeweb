import "./product.css";
import Header from "../../components/Header/Header";
import { Product } from "../../types/Product";
import { api } from "../../hooks/useApi";

export default function Product({id, image, price, description, size, name}: Product) {
  async function addProductToCart() {
    const data = api.post('/products', id)
    console.log(data)
  }

  return (
    <>
      <Header />
      <div className="product">
        <img src={image} alt="" />
        <div className="info">
          <div className="description">
            <h2>{name}</h2>
            <p>{description}</p>

            <p>
              <b>R${price}</b> Em 12x s/juros de R$
            </p>
            <h5>Tamanhos</h5>
            {size?.map(size => {
              return (
                <span>{size}</span>
              )
            })}
          </div>
          <button onClick={addProductToCart}>Adicionar ao carrinho</button>
        </div>
      </div>
    </>
  );
}
