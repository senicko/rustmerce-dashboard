import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productInsertSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
});

type ProductInsert = z.infer<typeof productInsertSchema>;

const CreateProduct = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInsert>({
    resolver: zodResolver(productInsertSchema),
  });

  // TODO: Learn about cancellation and other things in TanStack Query.
  const addProductMutation = useMutation((product: ProductInsert) => {
    return fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  });

  const onSubmit: SubmitHandler<ProductInsert> = (data) =>
    addProductMutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input className="border" id="name" {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="price">Price</label>
      <input
        className="border"
        type="number"
        id="price"
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price && <span>{errors.price.message}</span>}

      <button className="btn-primary">Add</button>
    </form>
  );
};

export default CreateProduct;
