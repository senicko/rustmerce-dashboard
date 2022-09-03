import { NextPage } from "next";
import Link from "next/link";
import { CategoriesTable } from "../../components/categories/categories-table";

const Categories: NextPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/categories/add">
          <a className="w-fit cursor-pointer rounded-lg bg-indigo-500 p-4 text-white transition-colors hover:bg-indigo-600">
            Add category
          </a>
        </Link>
      </div>
      <CategoriesTable />
    </div>
  );
};

export default Categories;
