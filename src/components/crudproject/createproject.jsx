import { useState } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import techData from "../../assets/techs.json";
import thumbnailData from "../../assets/thumbnails.json";
import supabase from "../../../supabaseClient";

export function Createproject() {
  const [thumbnail, setThumbnail] = useState("");
  const [appname, setAppname] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setSelectedTechs] = useState([]); // To store selected tech stacks
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: insertData, error: insertError } = await supabase
        .from("projects")
        .insert([
          {
            thumbnail,
            appname,
            description,
            techs,
          },
        ]);

      if (insertError) {
        setError("Error inserting project data: " + insertError.message);
      } else {
        setSuccess("Experience successfully added!");
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
          Add Project
        </h2>
        <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />

        <div className="mb-4">
          <label className="text-sm text-teal-300 mb-2 block">
            Pilih Thumbnail
          </label>
          <div className="flex gap-4 flex-wrap">
            {thumbnailData.map((thumb) => (
              <label
                key={thumb.id}
                className={`border rounded-lg cursor-pointer p-2 ${
                  thumbnail === thumb.id ? "ring-2 ring-teal-400" : ""
                }`}
              >
                <input
                  type="radio"
                  name="thumbnail"
                  value={thumb.id}
                  checked={thumbnail === thumb.id}
                  onChange={() => setThumbnail(thumb.id)}
                  className="hidden"
                  required
                />
                <p className="text-sm text-center text-teal-300 mt-1">
                  {thumb.thumbnail_name}
                </p>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="appname" className=" text-sm text-teal-300 mb-2">
            App Name
          </label>
          <input
            id="appname"
            type="text"
            value={appname}
            onInput={(e) => setAppname(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className=" text-sm text-teal-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter the description"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="techs" className=" text-sm text-teal-300 mb-2">
            Techs
          </label>
          <div className="space-y-2">
            {techData.map((tech) => (
              <label key={tech.id} className="flex items-center text-teal-300">
                <input
                  type="checkbox"
                  value={tech.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTechs((prev) => [...prev, tech.id]);
                    } else {
                      setSelectedTechs((prev) =>
                        prev.filter((id) => id !== tech.id)
                      );
                    }
                  }}
                  className="mr-2"
                />
                {tech.techname}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-900 outline-none cursor-pointer"
        >
          Add Project
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </MainLayout>
  );
}
