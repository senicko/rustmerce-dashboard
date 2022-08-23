import { Header, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

export interface TableHeaderProps {
  header: Header<any, unknown>;
}

export const TableHeader = ({ header }: TableHeaderProps) => {
  if (header.isPlaceholder) return null;

  return (
    <th className="px-4 py-2 text-left text-sm font-normal text-gray-600">
      <span
        className="flex select-none items-center gap-2 text-inherit"
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: <ArrowUpIcon className="h-4" />,
          desc: <ArrowDownIcon className="h-4" />,
        }[header.column.getIsSorted() as string] || null}
      </span>
    </th>
  );
};
