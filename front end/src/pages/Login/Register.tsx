import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { NavLink } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(3, { message: "Por favor ensira um nome valido." }),
  email: z
    .string()
    .min(6, { message: "Este campo tem que ser preenchido." })
    .email("Este não é um email válido."),
  password: z
    .string()
    .min(6, { message: "A senha deve conter ao menos 6 caracteres" }),
});

export default function Register() {
  const [output, setOutput] = useState<FormData>();
  console.log(output);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  async function createUser(data: FormData) {
    console.log(data);
    if (data) {
      const isLogged = await auth.register(
        data.name,
        data.email,
        data.password
      );
      if (isLogged) {
        navigate("/login");
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }
    setOutput(data);
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit((data) => createUser(data))}>
        <label htmlFor="name">Name</label>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label htmlFor="password">Password</label>
        <input type="string" {...register("password")} />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <button type="submit">Criar conta</button>
        <div className="info">
          <p>
            Ja possui conta? <NavLink to="/login">Faca login.</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
