import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

export type TableProps<TValue> = {
  columns: ColumnDef<TValue, any>[];
  data: TValue[];
};

export const Table = <TValue,>({ data, columns }: TableProps<TValue>) => {
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

  const getSortIcon = (header: Header<TValue, unknown>) => {
    return (
      {
        asc: <ArrowUpIcon className="h-4" />,
        desc: <ArrowDownIcon className="h-4" />,
      }[header.column.getIsSorted() as string] || (
        <MinusIcon className="h-4 text-gray-300" />
      )
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
      <div>
        <table className="w-full border-collapse bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-4 py-2 text-left font-normal text-gray-600"
                    key={header.id}
                  >
                    <span
                      className="flex select-none items-center gap-2 text-inherit"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && getSortIcon(header)}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
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
      <div className="flex items-center gap-4 bg-white p-4">
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
