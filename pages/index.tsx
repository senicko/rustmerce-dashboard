import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { Product } from "../types/product";
import type { ApiError } from "../types/error";
import { ProductsTable } from "../components/product/products-table";
import Link from "next/link";

const fetchProducts = async () => {
  const res = await fetch("http://localhost:8080/products");
  const body = await res.json();

  // Errors returned from the api are json objects with a message property.
  // I am not sure if fetch can fail in some other way, so there is no response body?
  // For now I will just assume that there will be response body every time :O
  if (!res.ok) throw new Error(body);
  return body;
};

const Home: NextPage = () => {
  const productsQuery = useQuery<Product[], ApiError>(
    ["products"],
    fetchProducts
  );

  if (productsQuery.isLoading) {
    return <p>Loading ...</p>;
  }

  if (productsQuery.isError) {
    return <p>Error: {productsQuery.error.message}</p>;
  }

  return (
    <>
      <div className="flex justify-end">
        <Link href="/products/add">
          <a className="w-fit cursor-pointer rounded-lg bg-indigo-500 p-4 text-white transition-colors hover:bg-indigo-600">
            Add product
          </a>
        </Link>
      </div>
      <ProductsTable data={productsQuery.data} />
    </>
  );
};

export default Home;
