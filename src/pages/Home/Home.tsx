import Card from "../../component/Card/Card";
import Header from "../../component/Header/Header";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <Card />
      </div>
    </div>
  );
}
