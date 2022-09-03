import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment, useMemo } from "react";
import { ApiError, Category } from "../../types/api";
import { Table } from "../table";

const fetchCategories = async () => {
  const res = await fetch("http://localhost:8080/categories");
  const body = await res.json();

  if (!res.ok) throw new Error(body);
  return body;
};

type CategoryTableData = {
  name: string[];
};

const columnHelper = createColumnHelper<CategoryTableData>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex gap-2">
        {info.getValue().map((name, i) => (
          <Fragment key={name}>
            <span>{name}</span>
            {i < info.getValue().length - 1 && (
              <ArrowRightIcon className="w-4 text-gray-400" />
            )}
          </Fragment>
        ))}
      </div>
    ),
  }),
];

const getCategoriesTableData = (
  parent: string[],
  children: Category[]
): CategoryTableData[] => {
  const childrenNames: CategoryTableData[] = [];

  children.forEach((child) => {
    const name = [...parent, child.name];
    childrenNames.push({ name });
    childrenNames.push(...getCategoriesTableData(name, child.children));
  });

  return childrenNames;
};

export const CategoriesTable = () => {
  const categoriesQuery = useQuery<Category[], ApiError>(
    ["categories"],
    fetchCategories
  );

  const categoriesDisplayData = useMemo(() => {
    return categoriesQuery.data
      ? getCategoriesTableData([], categoriesQuery.data)
      : [];
  }, [categoriesQuery]);

  if (categoriesQuery.isLoading) {
    return <p>Loading ...</p>;
  }

  if (categoriesQuery.isError) {
    return <p>Error: {categoriesQuery.error.message}</p>;
  }

  return <Table columns={columns} data={categoriesDisplayData} />;
};
