import { useState, useEffect } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import techData from "../../assets/techs.json";
import thumbnailData from "../../assets/thumbnails.json";
import supabase from "../../../supabaseClient";

export function Updateproject({ id }) {
  const projectId = id;

  const [thumbnail, setThumbnail] = useState("");
  const [appname, setAppname] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setSelectedTechs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", projectId)
      .single();

    if (error) {
      setError("Failed to fetch project: " + error.message);
    } else {
      setAppname(data.appname);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
      setSelectedTechs(data.techs);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(thumbnail);
    

    const { data, error: updateError } = await supabase
      .from("projects")
      .update({
        thumbnail,
        appname,
        description,
        techs,
      })
      .eq("id", projectId);

    if (updateError) {
      setError("Error updating project: " + updateError.message);
    } else {
      setSuccess("Project successfully updated!");
    }
  }

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full"
      >
        <h2 className="text-2xl font-bold text-blue-custom mb-6">
          Edit Project
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
            value={description}
            onInput={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>

        {/* Tech stack selector */}
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
                  checked={techs.includes(tech.id)}
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
          Update
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </MainLayout>
  );
}
