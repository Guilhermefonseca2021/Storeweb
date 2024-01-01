import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import noProfileUserLogin from "../../assets/no-profile-pic-icon-7.jpg";

export default function Header() {
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/results/${search}`);
  }

  async function handleLogin() {
    if (auth.user) {
      navigate(`/edit/profile/${auth.user.id}`)
    } else {
      navigate(`/login`);
    }
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
        {auth.user ? (
          <div onClick={handleLogin} className="profile">
            <p>Account</p>
            <img
              src="https://avatars.githubusercontent.com/u/92196697?v=4"
              alt=""
            />
          </div>
        ) : (
          <div onClick={handleLogin} className="profile">
            <p>login</p>
            <img src={noProfileUserLogin} alt="no login" />
          </div>
        )}
      </div>
    </div>
  );
}
