import { ComponentProps } from "react";
import Link from "next/link";
import { ArchiveBoxIcon, TagIcon, HomeIcon } from "@heroicons/react/24/outline";

type NavElement = {
  href: string;
  label: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
};

export const Nav = () => {
  const elements: NavElement[] = [
    {
      href: "/",
      label: "Home",
      Icon: HomeIcon,
    },
    {
      href: "/products",
      label: "Products",
      Icon: ArchiveBoxIcon,
    },
    {
      href: "/categories",
      label: "Categories",
      Icon: TagIcon,
    },
  ];

  return (
    <nav className="h-screen w-96 border-r border-gray-200 bg-white p-4">
      {elements.map(({ href, label, Icon }) => (
        <Link href={href} key={href}>
          <a className="flex gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50">
            <Icon className="w-5 text-gray-800" />
            <span className="text-gray-800">{label}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
};
