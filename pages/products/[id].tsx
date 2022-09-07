import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { Product } from "../../types/api";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8080/products/${id}`);
  const body = await res.json();

  if (!res.ok) throw new Error(body);
  return body;
};

const EditpProductPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const productQuery = useQuery<Product, ApiError>(["product", id], () =>
    fetchProduct(id as string)
  );

  if (productQuery.isLoading) {
    return <p>Loading ...</p>;
  }

  if (productQuery.isError) {
    return <p>Error: {productQuery.error.message}</p>;
  }

  return <div>{JSON.stringify(productQuery.data)}</div>;
};

export default EditpProductPage;
