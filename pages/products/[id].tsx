import { useQuery, useMutation } from "@tanstack/react-query";
import { NextPage } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { Product } from "../../types/api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { productValuesSchema, ProductValues } from "../../entities/product";
import { zodResolver } from "@hookform/resolvers/zod";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8080/products/${id}`);
  const body = await res.json();

  if (!res.ok) throw new Error(body);
  return body;
};

const updateProduct = async (id: string, product: ProductValues) => {
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body);
  }
};

const EditpProductPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<ProductValues>({
    resolver: zodResolver(productValuesSchema),
  });

  const productQuery = useQuery<Product, ApiError>(["product", id], () =>
    fetchProduct(id as string)
  );

  const updateProductMutation = useMutation((product: ProductValues) =>
    updateProduct(id as string, product)
  );

  useEffect(() => {
    if (productQuery.data) {
      const { name, price } = productQuery.data;

      setFormValue("name", name);
      setFormValue("price", price);
    }
  }, [productQuery.data, setFormValue]);

  if (productQuery.isLoading) {
    return <p>Loading ...</p>;
  }

  if (productQuery.isError) {
    return <p>Error: {productQuery.error.message}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit((data) => updateProductMutation.mutate(data))}
      className="flex flex-col gap-4"
    >
      <div className=" flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-800">
            Name <span className="text-blue-600">*</span>{" "}
          </label>
          <input
            className="rounded-lg border border-gray-200 p-2 shadow-sm outline-gray-200"
            id="name"
            placeholder="e.g., Sandy Blue T-Shirt"
            autoComplete="off"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-orange-600">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-gray-800">
            Price <span className="text-blue-600">*</span>
          </label>
          <input
            className="rounded-lg border border-gray-200 p-2 shadow-sm outline-1 outline-gray-200"
            type="number"
            id="price"
            min="1"
            step="any"
            autoComplete="off"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-xs text-orange-600">
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <button className="button">Save</button>
        </div>
      </div>
    </form>
  );
};

export default EditpProductPage;
