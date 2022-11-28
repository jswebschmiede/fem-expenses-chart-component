import { LayoutProps } from "../../typings";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto flex min-h-[600px] w-full max-w-[540px] flex-col items-center justify-center px-3">
      {children}
    </div>
  );
};

export default Layout;
