import { useState, useEffect } from "preact/hooks";
import supabase from "../../supabaseClient";
import { PlusSquare, Trash2, Edit } from "feather-icons-react";
import { MainLayout } from "../layouts/mainlayout";
import { route } from "preact-router";

const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Crudtechs() {
  const [techs, setTechs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techIdToDelete, setTechIdToDelete] = useState(null);

  useEffect(() => {
    getTechs();
  }, []);

  async function getTechs() {
    const { data } = await supabase.from("techs").select();
    if (error) {
      console.error("Error fetching techs:", error);
    } else {
      setTechs(data);
    }
  }

  const handleEdit = (id) => {
    route(`/updatetech/${id}`);
  };
  // useEffect(() => {
  //   console.log(experienceIdToDelete);
  // }, [experienceIdToDelete]);

  const openModal = (id) => {
    setTechIdToDelete(id);
    setIsModalOpen(true);
  };

  // Menangani close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTechIdToDelete(null);
  };

  const handleDelete = async () => {
    // First, get the tech object to delete
    const techToDelete = techs.find((tech) => tech.id === techIdToDelete);

    if (techToDelete && techToDelete.icon) {
      // Extract the public ID of the image from the Cloudinary URL
      const iconPublicId = techToDelete.icon.split("/").slice(-2, -1)[0]; // Assumes Cloudinary URL format

      try {
        // Delete the image from Cloudinary
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.CLOUDINARY_CLOUD_NAME
          }/image/destroy`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              public_id: iconPublicId,
              api_key: import.meta.env.CLOUDINARY_API_KEY,
              api_secret: import.meta.env.CLOUDINARY_API_SECRET,
            }),
          }
        );

        const cloudinaryResult = await cloudinaryResponse.json();

        if (cloudinaryResult.result === "ok") {
          console.log("Cloudinary icon deleted successfully");

          // Now delete the tech stack record from Supabase
          const { data, error } = await supabase
            .from("techs")
            .delete()
            .eq("id", techIdToDelete);

          if (error) {
            console.error("Error deleting tech:", error);
          } else {
            getTechs(); // Refresh the list of techs after deletion
            closeModal();
          }
        } else {
          console.error(
            "Error deleting image from Cloudinary:",
            cloudinaryResult
          );
        }
      } catch (err) {
        console.error("Error deleting icon from Cloudinary:", err);
      }
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-800 w-full rounded p-4">
        <div className="flex justify-between mb-3">
          <h1 className="text-white text-3xl font-bold">Tech Stacks</h1>
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
                Icon
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Tech Name
              </th>
              <th class=" px-3 py-2 text-left text-md font-semibold border-b-2 border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-400">
            {techs.map((tech) => (
              <tr key={tech.id} class="transition-colors duration-300">
                <td class="px-3 py-3 text-sm ">
                  {tech.icon && (
                    <img
                      src={tech.icon}
                      alt="Icon"
                      className="w-10 h-10 object-cover"
                    />
                  )}
                </td>
                <td class="px-3 py-3 text-sm gap-1 flex items-center">
                  {tech.techname}
                </td>
                <td class="px-3 py-3 text-sm">
                  <div className="flex gap-2">
                    <div
                      onClick={() => handleEdit(tech.id)}
                      className="bg-teal-900 rounded-md p-1 cursor-pointer"
                    >
                      <Edit size={20} className="text-teal-200" />
                    </div>
                    <div
                      onClick={() => openModal(tech.id)}
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