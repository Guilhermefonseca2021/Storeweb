import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Este campo tem que ser preenchido." })
    .email("Este não é um email válido."),
  password: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  async function onSubmit(data: FormData) {
    console.log(data);
    if (data) {
      const isLogged = await auth.signin(data.email, data.password);
      if (isLogged) {
        navigate("/");
        console.log(isLogged);
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label htmlFor="password">Password:</label>
        <input type="string" {...register("password")} />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <button type="submit">Login</button>
        <div className="info">
          <p>
            Nao possui uma conta? <NavLink to="/register">Criar conta.</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
