import { useState, useEffect } from "preact/hooks";
import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";
import supabase from "../../supabaseClient";
import { PlusSquare, Trash2, Edit } from "feather-icons-react";
import { MainLayout } from "../layouts/mainlayout";
import { route } from "preact-router";

export function Crudprojects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const { data } = await supabase.from("projects").select().order('date', {ascending: false});
    setProjects(data);
  }

  const handleEdit = (id) => {
    route(`/updateproject/${id}`);
  };

  const openModal = (id) => {
    setProjectIdToDelete(id);
    setIsModalOpen(true);
  };

  // Menangani close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProjectIdToDelete(null);
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectIdToDelete);
    if (error) {
      console.error("Error deleting experience:", error);
    } else {
      getProjects(); // Refresh daftar pengalaman setelah dihapus
      closeModal();
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-800 w-full rounded p-4">
        <div className="flex justify-between mb-3">
          <h1 className="text-white text-3xl font-bold">Projects</h1>
          <a
            href="/createproject"
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
                Thumbnail
              </th>
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
                <td class="px-3 py-3 text-sm gap-1 items-center">
                  <img src={thumbnailData[project.thumbnail].thumb_source} alt="" className="w-6" />
                </td>
                <td class="px-3 py-3 text-sm gap-1 items-center">
                  {project.appname}
                </td>
                <td class="px-3 py-3 text-sm ">
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((techId, index) => (
                      <div class="flex items-center gap-1">
                        <div
                          className={`rounded-3xl w-8 h-8 flex items-center justify-center ${techData[techId]["bg-spesial"]}`}
                        >
                          <img
                            src={techData[techId].icon_source}
                            alt={techData[techId].techname}
                            className={`w-5`}
                          />
                        </div>
                        <span className="text-xs leading-none">
                          {techData[techId].techname}
                        </span>
                      </div>
                    ))}
                  </div>
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
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                >
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
