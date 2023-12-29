import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .min(6, { message: "Este campo tem que ser preenchido." })
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

  function onSubmit(data: FormData) {
    console.log(data);

    navigate(`/`);
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
      </form>
    </div>
  );
}
