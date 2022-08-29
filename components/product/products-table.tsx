import { useState } from "react";
import { Product } from "../../types/product";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { AssetPreview } from "./assets-preview";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.display({
    id: "#",
    header: "#",
    cell: (info) => info.row.index + 1,
    maxSize: 10,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    size: 50,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
    size: 20,
  }),
  columnHelper.accessor("assets", {
    header: "Assets",
    cell: (info) => <AssetPreview visibleCount={3} assets={info.getValue()} />,
    size: 20,
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full shadow-sm">
      <header className="flex items-center justify-between rounded-t-lg border-x border-t border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-800">Products</span>
          <span className="rounded-full bg-gray-50 py-1 px-3 text-sm text-gray-600">
            {data.length} products
          </span>
        </div>
      </header>
      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-4 py-2 text-left font-normal text-gray-600"
                    key={header.id}
                    style={{ width: `${header.getSize()}%` }}
                  >
                    <span
                      className="flex select-none items-center gap-2 text-inherit"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() &&
                        ({
                          asc: <ArrowUpIcon className="h-4" />,
                          desc: <ArrowDownIcon className="h-4" />,
                        }[header.column.getIsSorted() as string] || (
                          <MinusIcon className="h-4 text-gray-300" />
                        ))}
                    </span>
                  </th>
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
                    className="h-[64px] whitespace-nowrap px-4 py-4 text-left text-gray-600 sm:whitespace-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 rounded-b-lg border-x border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-lg border text-zinc-900 hover:bg-gray-50 disabled:text-zinc-400"
          >
            <ChevronLeftIcon className="w-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-lg border text-zinc-900 hover:bg-gray-50 disabled:text-zinc-400"
          >
            <ChevronRightIcon className="w-4" />
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};
