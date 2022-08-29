import { Header, flexRender } from "@tanstack/react-table";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useMemo } from "react";

export interface TableHeaderProps {
  header: Header<any, unknown>;
}

export const TableHeader = ({ header }: TableHeaderProps) => {
  const width = useMemo(() => `${header.getSize()}%`, [header]);

  if (header.isPlaceholder) return null;

  return (
    <th
      className="px-4 py-2 text-left font-normal text-gray-600"
      style={{ width }}
    >
      <span
        className="flex select-none items-center gap-2 text-inherit"
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}

        {header.column.getCanSort() &&
          ({
            asc: <ArrowUpIcon className="h-4" />,
            desc: <ArrowDownIcon className="h-4" />,
          }[header.column.getIsSorted() as string] || (
            <MinusIcon className="h-4 text-gray-200" />
          ))}
      </span>
    </th>
  );
};
