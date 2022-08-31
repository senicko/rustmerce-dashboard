import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";

const productInsertSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
});

type ProductInsert = z.infer<typeof productInsertSchema>;

const CreateProduct: NextPage = () => {
  const {
    register,
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
    <div className="flex flex-col gap-4">
      <header>
        <Link href="/">
          <a className="flex gap-2">
            <ArrowLeftIcon className="w-4" />
            Back
          </a>
        </Link>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="rounded-lg border border-gray-200 p-3 outline-indigo-400"
            id="name"
            placeholder="e.g., Sandy Blue T-Shirt"
            autoComplete="off"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price">
            Price <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="rounded-lg border border-gray-200 p-3 outline-indigo-400"
            type="number"
            id="price"
            autoComplete="off"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-sm text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="flex justify-end">
          <button className="rounded-lg bg-indigo-500 p-4 text-white transition-colors hover:bg-indigo-600">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
