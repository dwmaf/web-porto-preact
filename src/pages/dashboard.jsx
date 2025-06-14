import { MainLayout } from "../layouts/mainlayout";
import { Link } from "preact-router/match";
import { useState, useEffect } from "preact/hooks";
import {
  Award,
  FileText,
  ArrowRight,
  DollarSign,
  Image,
} from "feather-icons-react"; // Menggunakan FileText untuk Projects agar sedikit berbeda
import supabase from "../../supabaseClient";

export function Dashboard() {
  const cardBaseStyle = "bg-gray-800 p-6 rounded-lg ";
  const cardLinkStyle =
    "mt-4 inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold group";
  const iconContainerStyle = "p-3 bg-gray-700 rounded-full mb-4 inline-block";
  const [experiencesCount, setExperiencesCount] = useState(0); // State untuk jumlah experiences
  const [projectsCount, setProjectsCount] = useState(0); // State untuk jumlah projects

  useEffect(() => {
    async function fetchDataCounts() {
      // Ambil jumlah experiences
      const {
        data: experiencesData,
        error: experiencesError,
        count: expCount,
      } = await supabase
        .from("experiences")
        .select("*", { count: "exact", head: true }); // Hanya ambil count

      if (experiencesError) {
        console.error("Error fetching experiences count:", experiencesError);
      } else {
        setExperiencesCount(expCount || 0);
      }

      // Ambil jumlah projects
      const {
        data: projectsData,
        error: projectsError,
        count: projCount,
      } = await supabase
        .from("projects") // Asumsi nama tabel Anda adalah 'projects'
        .select("*", { count: "exact", head: true }); // Hanya ambil count

      if (projectsError) {
        console.error("Error fetching projects count:", projectsError);
      } else {
        setProjectsCount(projCount || 0);
      }
    }

    fetchDataCounts();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
        {/* Card untuk Experiences */}
        <Link href="/crudexperiences" className="no-underline">
          <div className={`${cardBaseStyle}`}>
            <div className={iconContainerStyle}>
              <Award size={28} className="text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              Manage Experiences
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Add, edit, or delete your professional experiences and skills
              showcased on your portfolio.
            </p>
            <span className={cardLinkStyle}>
              Go to Experiences
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        {/* Card untuk Projects */}
        <Link href="/crudprojects" className="no-underline">
          <div className={`${cardBaseStyle}`}>
            <div className={iconContainerStyle}>
              <FileText size={28} className="text-teal-400" />{" "}
              {/* Menggunakan FileText */}
            </div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              Manage Projects
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Showcase your best work. Add new projects, update details, or
              remove outdated ones.
            </p>
            <span className={cardLinkStyle}>
              Go to Projects
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        {/* Anda bisa menambahkan lebih banyak card di sini jika ada fitur lain */}
        {/* Contoh:
          <Link href="/settings" className="no-underline">
            <div className={`${cardBaseStyle}`}>
              <div className={iconContainerStyle}>
                <Settings size={28} className="text-teal-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-100 mb-2">
                Site Settings
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                Configure general settings for your portfolio.
              </p>
              <span className={cardLinkStyle}>
                Go to Settings
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          */}
      </div>

      <div className="mt-4 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Quick Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-700 rounded flex items-center">
            <Award size={28} className="text-teal-400 mr-4" />
            <div>
              <p className="text-sm text-slate-400">Experiences</p>
              <p className="text-2xl font-bold text-teal-400">
                {experiencesCount}
              </p>{" "}
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded flex items-center">
            <FileText size={28} className="text-teal-400 mr-4" />
            <div>
              <p className="text-sm text-slate-400">Projects</p>
              <p className="text-2xl font-bold text-teal-400">
                {projectsCount}
              </p>{" "}
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded flex items-center">
            <Image size={28} className="text-teal-400 mr-3" />
            <div>
              <p className="text-sm text-slate-400">Fanarts</p>
              <p className="text-2xl font-bold text-teal-400">5</p>{" "}
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded flex items-center">
            <DollarSign size={28} className="text-teal-400 mr-3" />
            <div>
              <p className="text-sm text-slate-400">Art Commisions</p>
              <p className="text-2xl font-bold text-teal-400">0</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
