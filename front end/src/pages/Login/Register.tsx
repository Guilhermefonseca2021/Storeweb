import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import './styles.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(6, { message: 'Este campo deve ser preenchido.' }).email('Formato de email inválido.'),
  email: z
    .string()
    .min(6, { message: 'Este campo tem que ser preenchido.' })
    .email('Este não é um email válido.'),
  password: z.string().min(6, { message: 'A senha deve conter ao menos 6 caracteres' }),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [output, setOutput] = useState<FormData>();
  console.log(output);

  function createUser (data: FormData) {
    setOutput(data);
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit((data) => createUser(data))}>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <button type="submit">Criar conta</button>
      </form>
    </div>
  );
}
