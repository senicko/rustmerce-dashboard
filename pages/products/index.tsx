import type { NextPage } from "next";
import Link from "next/link";
import { ProductsTable } from "../../components/products/products-table";

const Products: NextPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/products/add">
          <a className="w-fit cursor-pointer rounded-lg bg-indigo-500 p-4 text-white transition-colors hover:bg-indigo-600">
            Add product
          </a>
        </Link>
      </div>
      <ProductsTable />
    </div>
  );
};

export default Products;
