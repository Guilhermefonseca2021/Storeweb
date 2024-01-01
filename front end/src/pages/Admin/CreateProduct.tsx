import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import { api } from "../../hooks/useApi";
import "./styles.css";
import { FaImage } from "react-icons/fa";

interface FormData {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  size?: [string];
  featured?: boolean;
}

const productSchema = z.object({
  name: z.string().min(1, { message: "Este campo tem que ser preenchido." }),
  price: z.number().min(1, { message: "Este campo tem que ser preenchido." }),
  image: z.string().min(1, { message: "Este campo tem que ser preenchido." }),
  size: z.string(),
  featured: z.boolean().default(false),
});

export function CreateProduct() {
  const [product, setProduct] = useState<FormData>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(data: FormData) {
    setProduct(data);
    const response = await api.post("/products/create", { data });
    console.log(response);
    navigate(`/product/${product}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-page">
      <h2>Create Product:</h2>
      <label htmlFor="name">name:</label>
      <input type="text" {...register("name")} />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <label htmlFor="price">Price:</label>
      <input type="number" {...register("price")} />
      {errors.price?.message && <p>{errors.price?.message}</p>}

      <label htmlFor="size">Size:</label>
      <input type="text" {...register("size")} />
      {errors.size?.message && <p>{errors.size?.message}</p>}

      <label htmlFor="image">image:</label>
      <input type="file" {...register("image")} />
      <div className="file-input-wrapper">
        <input type="file" id="fileInput" />
        <label htmlFor="fileInput" className="file-input-label">
          <b>Choose a image <FaImage size={10} /> </b>
        </label>
      </div>
      {errors.image?.message && <p>{errors.image?.message}</p>}

      <label htmlFor="Featured">Featured:</label>
      <input type="text" {...register("size")} />
      {errors.featured?.message && <p>{errors.featured?.message}</p>}

      <button type="submit">Create Product</button>
    </form>
  );
}
