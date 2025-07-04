import { useState } from "preact/hooks";
import { Link, route } from "preact-router";
import {
  Feather,
  Award,
  FileText,
  BarChart2,
  Sidebar,
  LogOut,
  Grid,
} from "feather-icons-react";
import supabase from "../../supabaseClient";

export function NavDrawer() {
  const [isOpen, setSidebarOpen] = useState(false);
  const handleLogout = async () => {
    try {
      // Melakukan logout dengan Supabase
      await supabase.auth.signOut();
      route("/login");
      // Setelah logout, arahkan pengguna ke halaman login
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  return (
    <aside
    onMouseEnter={() => setSidebarOpen(true)}
    onMouseLeave={() => setSidebarOpen(false)}
      className={` h-max-screen bg-gray-800 p-3 transform transition-all duration-300 ${
        isOpen ? "w-48 translate-x-0" : "w-16 translate-x-0"
      }`}
    >
      <Sidebar
        size={16}
        className="text-blue-custom mb-2 absolute top-6 right-6"
      />

      <Link
        href="/dashboard"
        
        className={`w-full flex items-center gap-2 leading-none mt-10 mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm 
          ${
            location.pathname === "/dashboard"
              ? "bg-teal-700 text-teal-200"
              : "text-blue-custom"
          }`}
      >
        <Grid
          size={16}
          className={`${
            location.pathname === "/dashboard"
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        <span
          className={`${!isOpen && "hidden"} ${
            location.pathname === "/dashboard"
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Dashboard
        </span>
      </Link>
      <Link
        href="/crudexperiences"
        
        className={`w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 hover:bg-gray-700  rounded-sm 
          ${
            ["/crudexperiences", "/createexp", "/updateexp"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? "bg-teal-700 "
              : ""
          }`}
      >
        <Award
          size={16}
          className={`${
            ["/crudexperiences", "/createexp", "/updateexp"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        
        <span
          className={`${!isOpen && "hidden"} ${
            ["/crudexperiences", "/createexp", "/updateexp"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Experiences
        </span>
      </Link>
      <a
        href="/crudprojects"
        className={`w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm 
          ${
            ["/crudprojects", "/createproject", "/updateproject"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? "bg-teal-700 "
              : ""
          }`}
      >
        <FileText
          size={16}
          className={`${
            ["/crudprojects", "/createproject", "/updateproject"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        <span
          className={`${!isOpen && "hidden"} ${
            ["/crudprojects", "/createproject", "/updateproject"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Porjects
        </span>
      </a>
      <a
        onClick={handleLogout}
        className="w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm cursor-pointer"
      >
        <LogOut size={16} className={`text-blue-custom`} />
        <span
          className={`${
            !isOpen && "hidden"
          } text-blue-custom transition-all duration-300`}
        >
          Log out
        </span>
      </a>
    </aside>
  );
}
