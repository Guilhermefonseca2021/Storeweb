import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
        <NavLink to="/" className="logo">
          storeweb
        </NavLink>
        <div className="search-item">
          <button type="submit">
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
          <img
            src="https://avatars.githubusercontent.com/u/92196697?v=4"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
