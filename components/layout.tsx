export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="mx-auto flex max-w-6xl flex-col justify-center gap-4 p-4">
      {children}
    </main>
  );
};
