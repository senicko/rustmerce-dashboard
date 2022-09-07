import { createColumnHelper } from "@tanstack/react-table";
import type { ApiError, Product } from "../../types/api";
import { useQuery } from "@tanstack/react-query";
import { Table } from "../table";
import { AssetsPreview } from "./assets-preview";
import { useRouter } from "next/router";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("assets", {
    header: "Assets",
    cell: (info) => <AssetsPreview visibleCount={3} assets={info.getValue()} />,
  }),
];

const fetchProducts = async () => {
  const res = await fetch("http://localhost:8080/products");
  const body = await res.json();

  // Errors returned from the api are json objects with a message property.
  // I am not sure if fetch can fail in some other way, so there is no response body?
  // For now I will just assume that there will be response body every time :O
  if (!res.ok) throw new Error(body);
  return body;
};

export const ProductsTable = () => {
  const router = useRouter();

  const productsQuery = useQuery<Product[], ApiError>(
    ["products"],
    fetchProducts
  );

  const onProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  if (productsQuery.isLoading) {
    return <p>Loading ...</p>;
  }

  if (productsQuery.isError) {
    return <p>Error: {productsQuery.error.message}</p>;
  }

  return (
    <Table
      columns={columns}
      data={productsQuery.data}
      onClick={onProductClick}
    />
  );
};
