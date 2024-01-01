import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import useFetchProducts from "../../hooks/useFetchProducts";
import "./home.css";

export default function Home() {
  const { products } = useFetchProducts()

  const featuredProducts = products.filter(product => product.featured)
  console.log(featuredProducts)

  return (
    <div>
      <Header />
      <div className="content">
        <aside>
          {featuredProducts.map((product) => (
            <Card key={product.id} name={product.name} image={product.image} price={product.price}size={product.size} />
          ))}
        </aside>
      </div>
    </div>
  );
}
