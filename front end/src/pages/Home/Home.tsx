import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <section>
          <Card />
        </section>
        <aside>
          <Card />
          <Card />
        </aside>
      </div>
    </div>
  );
}
