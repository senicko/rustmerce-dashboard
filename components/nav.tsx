import { ComponentProps, useEffect } from "react";
import Link from "next/link";
import { ArchiveBoxIcon, TagIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type NavElement = {
  path: string;
  label: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
};

export const Nav = () => {
  const router = useRouter();

  const elements: NavElement[] = [
    {
      path: "/",
      label: "Home",
      Icon: HomeIcon,
    },
    {
      path: "/products",
      label: "Products",
      Icon: ArchiveBoxIcon,
    },
    {
      path: "/categories",
      label: "Categories",
      Icon: TagIcon,
    },
  ];

  return (
    <nav className="flex h-screen w-80 flex-col border-r border-gray-200 bg-white">
      {elements.map(({ path, label, Icon }) => (
        <Link href={path} key={path}>
          <a
            className={`flex gap-2 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-100 ${
              router.pathname === path ? "bg-gray-100" : ""
            }`}
          >
            <Icon className="w-5 " />
            <span>{label}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
};
