import { useState, useEffect } from "preact/hooks";
import techData from "../assets/techs.json";
import supabase from "../../supabaseClient";
import { PlusSquare, Trash2, Edit } from "feather-icons-react";
import { MainLayout } from "../layouts/mainlayout";
import { route } from "preact-router";

const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Crudprojects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [allTechs, setAllTechs] = useState([]);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  console.log(techData[0].techname);
  
  useEffect(() => {
    getProjects();
    // setAllTechs(techData);
    // console.log(allTechs);
  }, []);

  async function getProjects() {
    const { data } = await supabase.from("projects").select();
    setProjects(data);
  }

  // async function getTechIcons() {
  //   const res = await fetch("../assets/techs.json");
  //   const techs = await res.json();
  //   setAllTechs(techs);
  // }

  // const getIconById = (id) => {
  //   const found = allTechs.find((t) => t.id === id);
  //   return found?.icon_source || "";
  // };

  const handleEdit = (id) => {
    route(`/updateproject/${id}`);
  };
  // useEffect(() => {
  //   console.log(experienceIdToDelete);
  // }, [experienceIdToDelete]);

  const openModal = (id) => {
    setProjectIdToDelete(id);
    setIsModalOpen(true);
  };

  // Menangani close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProjectIdToDelete(null);
  };

  return (
    <MainLayout>
      <div className="bg-gray-800 w-full rounded p-4">
        <div className="flex justify-between mb-3">
          <h1 className="text-white text-3xl font-bold">Tech Stacks
            
          </h1>
          <a
            href="/createtech"
            className="bg-teal-900 rounded-md py-1 px-3 cursor-pointer flex items-center gap-2"
          >
            <PlusSquare size={20} className="text-teal-200 " />
            <span className="leading-none text-teal-300">Tambah</span>
          </a>
        </div>
        <table class="min-w-full table-auto border-separate border-spacing-0 border-2 border-gray-700 rounded-lg overflow-hidden">
          <thead class="bg-gray-800 text-gray-300">
            <tr>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                App Name
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Tech Stacks
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-400">
            {projects.map((project) => (
              <tr key={project.id} class="transition-colors duration-300">
                <td class="px-3 py-3 text-sm gap-1 flex items-center">
                  {project.appname}
                </td>
                <td class="px-3 py-3 text-sm ">
                  
                  {project.techs.map((techId, index) => (
                    <div class="flex items-center gap-1">
                      <img
                        src={techData[techId].icon_source}
                        alt={techData[techId].techname}
                        className="w-4 object-contain"
                      />
                      <span class="text-xs leading-none" >{techData[techId].techname}</span>
                    </div>
                  ))}

                </td>
                <td class="px-3 py-3 text-sm">
                  <div className="flex gap-2">
                    <div
                      onClick={() => handleEdit(project.id)}
                      className="bg-teal-900 rounded-md p-1 cursor-pointer"
                    >
                      <Edit size={20} className="text-teal-200" />
                    </div>
                    <div
                      onClick={() => openModal(project.id)}
                      className="bg-teal-900 rounded-md p-1 cursor-pointer"
                    >
                      <Trash2 size={20} className="text-teal-200" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Konfirmasi Delete */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-md w-96">
              <h3 className="text-white text-lg mb-4">
                Are you sure you want to delete this tech stack?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
