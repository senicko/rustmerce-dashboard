import { Product } from "../types/product";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export interface ProductsTableProps {
  data: Product[];
}

const columnHelper = createColumnHelper<Product>();

// TODO: This probably is overcomplicated
const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
  }),
  columnHelper.accessor("assets", {
    header: () => "Assets",
    cell: (info) => info.getValue().length,
  }),
];

export const ProductsTable = ({ data }: ProductsTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="font-normal text-zinc-100">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* TODO: AAAaaaA look into this again and understand each step */}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
