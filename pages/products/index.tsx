import type { NextPage } from "next";
import Link from "next/link";
import { ProductsTable } from "../../components/products/products-table";

const Products: NextPage = () => {
  return (
    <main className="min-h-screen bg-stone-200 p-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="flex justify-end">
          <Link href="/products/add">
            <a className="button">Add product</a>
          </Link>
        </div>
        <ProductsTable />
      </div>
    </main>
  );
};

export default Products;
