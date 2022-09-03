import { Nav } from "./nav";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex h-full w-full">
      <Nav />
      <div className="flex flex-1 justify-center p-8">
        <div className="w-full max-w-screen-2xl">{children}</div>
      </div>
    </main>
  );
};
