import { useState } from "preact/hooks";
import { Link, route } from "preact-router";
import {
  Feather,
  Award,
  File,
  BarChart2,
  Sidebar,
  LogOut,
  Grid,
} from "feather-icons-react";
import supabase from "../../supabaseClient";

export function NavDrawer() {
  const [isOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isOpen);
  };

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
      className={` h-max-screen bg-gray-800 p-3 transform transition-all duration-300 ${
        isOpen ? "w-48 translate-x-0" : "w-16 translate-x-0"
      }`}
    >
      <Sidebar
        size={16}
        onClick={toggleSidebar}
        className="text-blue-custom cursor-pointer mb-2 absolute top-6 right-6"
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
          Home
        </span>
      </Link>
      <Link
        href="/crudexperiences"
        className={`w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 hover:bg-gray-700  rounded-sm 
          ${
            location.pathname === "/crudexperiences"
              ? "bg-teal-700 text-blue-900"
              : "text-blue-custom"
          }`}
      >
        <Award
          size={16}
          className={`${
            location.pathname === "/crudexperiences"
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        <span
          className={`${!isOpen && "hidden"} ${
            location.pathname === "/crudexperiences"
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Experiences
        </span>
      </Link>
      <a
        href="/crudprojects"
        className="w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm"
      >
        <File
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
            location.pathname === "/crudprojects"
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Porjects
        </span>
      </a>
      <a
        href="/art"
        className="w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm"
      >
        <Feather
          size={16}
          className={`${
            location.pathname === "/arts"
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        <span
          className={`${!isOpen && "hidden"} ${
            location.pathname === "/asrts"
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Arts
        </span>
      </a>
      <a
        href="/skripsiprogress"
        className="w-full flex items-center gap-2 leading-none mb-2 px-3 py-2 text-blue-custom  hover:bg-gray-700  rounded-sm"
      >
        <BarChart2
          size={16}
          className={`${
            location.pathname === "/skripsi"
              ? " text-teal-200"
              : "text-blue-custom"
          }`}
        />
        <span
          className={`${!isOpen && "hidden"} ${
            location.pathname === "/skrips"
              ? " text-teal-200"
              : "text-blue-custom"
          } transition-all duration-300`}
        >
          Skripsi
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
