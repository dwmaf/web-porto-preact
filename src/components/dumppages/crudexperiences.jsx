import { useState, useEffect } from "preact/hooks";
import supabase from "../../supabaseClient";
import { PlusSquare, Trash2, Edit } from "feather-icons-react";
import { Createexp } from "../components/crudexp/createexp";
import { MainLayout } from "../layouts/mainlayout";
import { route } from "preact-router";

export function Crudexperiences() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experienceIdToDelete, setExperienceIdToDelete] = useState(null);

  useEffect(() => {
    getExperiences();
  }, []);

  async function getExperiences() {
    const { data } = await supabase.from("experiences").select().order('date', {ascending: false});
    setExperiences(data);
  }

  const handleEdit = (id) => {
    route(`/updateexp/${id}`);
  };

  const openModal = (id) => {
    setExperienceIdToDelete(id);
    setIsModalOpen(true);
  };

  // Menangani close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setExperienceIdToDelete(null);
  };

  const handleDelete = async () => {
    // console.log('id di proses handledelete',experienceIdToDelete);
    const { data, error } = await supabase
      .from("experiences")
      .delete()
      .eq("id", experienceIdToDelete);
    if (error) {
      console.error("Error deleting experience:", error);
    } else {
      getExperiences(); // Refresh daftar pengalaman setelah dihapus
      closeModal();
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-800 w-full rounded p-4">
        <div className="flex justify-between mb-3">
          <h1 className="text-white text-3xl font-bold">Experiences</h1>
          <a
            href="/createexp"
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
                Position
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Place
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Timestamp
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-400">
            {experiences.map((exp) => (
              <tr key={exp.id} class="transition-colors duration-300">
                <td class="px-3 py-3 text-sm ">{exp.position}</td>
                <td class="px-3 py-3 text-sm gap-1 flex items-center">
                  <span className="text-2xl text-teal-500 leading-none">•</span>
                  <span>{exp.place}</span>
                </td>
                <td class="px-3 py-3 text-sm">
                  <div className=" flex flex-col">
                    <span className="text-md text-gray-200 font-semibold">
                      {exp.timestamp}
                    </span>
                    <span className="text-sm text-gray-400">
                      {exp.duration}
                    </span>
                  </div>
                </td>
                <td class="px-3 py-3 text-sm">
                  <div className="flex gap-2">
                    <div
                      onClick={() => handleEdit(exp.id)}
                      className="bg-teal-900 rounded-md p-1 cursor-pointer"
                    >
                      <Edit size={20} className="text-teal-200" />
                    </div>
                    <div
                      onClick={() => openModal(exp.id)}
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
                Are you sure you want to delete this experience?
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
