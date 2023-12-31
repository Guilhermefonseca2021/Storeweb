import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import { CreateProduct } from "./pages/Admin/CreateProduct";

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:search" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/profile/:id" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/products/create" element={<CreateProduct />} />
      </Routes>
    </>
  );
}
