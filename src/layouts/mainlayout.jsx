import { NavDrawer } from "../components/navdrawer";

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <NavDrawer />
      <div className="p-4 w-full">
        {children}
      </div>
    </div>
  );
}
