import { Nav } from "./nav/nav";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex h-full">
      <Nav />
      <div className="flex w-96 flex-1 justify-center p-4">
        <div className="w-3/4 max-w-7xl">{children}</div>
      </div>
    </main>
  );
};
