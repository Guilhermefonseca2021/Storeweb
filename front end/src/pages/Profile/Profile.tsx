import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./profile.css";

export default function Profile() {
  const auth = useContext(AuthContext);

  return (
    <div className="profile-page">
      <div className="profile">
        <img src={auth.user?.image} alt="Your profile picture" />
        <div className="info">
          <h4>name: {auth.user?.name}</h4>
          <h5>{auth.user?.id}</h5>
          <p>email: {auth.user?.email}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}
