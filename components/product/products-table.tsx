import { useState } from "react";
import { Product } from "../../types/product";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { AssetPreview } from "./assets-preview";
import { TableHeader } from "../table/table-header";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.display({
    id: "#",
    header: "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("assets", {
    header: "Assets",
    cell: (info) => <AssetPreview visibleCount={3} assets={info.getValue()} />,
  }),
];

export type ProductsTableProps = {
  data: Product[];
};

export const ProductsTable = ({ data }: ProductsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full shadow-sm">
      <header className="flex items-center justify-between rounded-t-lg border-x border-t border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-800">Products</span>
          <span className="rounded-full bg-gray-50 py-1 px-3 text-xs font-medium text-gray-600">
            {data.length} products
          </span>
        </div>
        <div>
          <Link href="/products/add">
            <a className="btn-primary">
              <PlusIcon className="w-4" /> Add Product
            </a>
          </Link>
        </div>
      </header>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id} header={header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-[64px] px-4 py-4 text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
