import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";

export default function Header() {
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    navigate(`/results/${search}`);
  }

  return (
    <div className="header">
      <form className="search-bar" onSubmit={handleSearch}>
        <h2>storeweb</h2>
        <div className="search-item">
          <button>
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Buscar por produtos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="information">
        <div className="cart-item">
          <FaCartArrowDown className="cart-item" />
          <span>(3)</span>
        </div>
        <div className="profile">
          <p>Account</p>
          <img src="https://avatars.githubusercontent.com/u/92196697?v=4" alt="" />
        </div>
      </div>
    </div>
  );
}
