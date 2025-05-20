import { useState } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import supabase from "../../../supabaseClient";

const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Createtech() {
  const [icon, setIcon] = useState("");
  const [techname, setTechname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(position, place, timestamp, duration, description, techs);
    if (!icon) {
      setError("Icon is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file",icon);
      formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      const iconUrl = data.secure_url;

      const { data: insertData, error } = await supabase
        .from("techs") // Ganti dengan nama tabel yang sesuai
        .insert([
          {
            icon: iconUrl,
            techname,
          },
        ]);

      if (error) {
        setError("Error inserting data: " + error.message);
      } else {
        setSuccess("Tech stack successfully added!");
      }
    } catch (error) {
      setError("Error inserting data: " + error.message);
    }
  };
  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full"
      >
        <h2 className="text-2xl font-bold text-blue-custom mb-6">
          Add Tech Stack
        </h2>
        <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />
        <div className="mb-4">
          <label htmlFor="position" className=" text-sm text-teal-300 mb-2">
            Icon
          </label>
          <input
            id="position"
            type="file"
            placeholder="Enter the icon"
            value={icon}
            accept="image/*"
            onChange={handleIconChange}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="techname" className=" text-sm text-teal-300 mb-2">
            Tech stack name
          </label>
          <input
            id="techname"
            type="text"
            placeholder="Enter the tech name"
            value={techname}
            onInput={(e) => setTechname(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="py-2 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-900 outline-none cursor-pointer"
        >
          Add
        </button>
        {/* Show success or error messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </MainLayout>
  );
}
