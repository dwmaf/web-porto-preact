import { useState, useEffect } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import supabase from "../../../supabaseClient";
const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Createproject() {
  const [thumbnail, setThumbnail] = useState("");
  const [appname, setAppname] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState([]); // To store all tech stacks
  const [selectedTechs, setSelectedTechs] = useState([]); // To store selected tech stacks
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch tech stacks on component mount
  useEffect(() => {
    async function fetchTechs() {
      const { data, error } = await supabase
        .from("techs")
        .select("id, techname");
      if (error) {
        console.error("Error fetching techs:", error);
      } else {
        setTechs(data);
      }
    }

    fetchTechs();
  }, []);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      setError("Thumbnail is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      const thumbnailUrl = data.secure_url;

      // Insert project data into 'projects' table
      const { data: insertData, error: insertError } = await supabase
        .from("projects")
        .insert([
          {
            thumbnail: thumbnailUrl,
            appname,
            description,
          },
        ])
        .single(); // Assuming the insert returns a single object

      if (insertError) {
        setError("Error inserting project data: " + insertError.message);
        return;
      }

      // Now insert data into 'project_tech' pivot table
      if (selectedTechs.length > 0) {
        const projectTechs = selectedTechs.map((techId) => ({
          project_id: insertData.id, // project ID from the newly inserted project
          tech_id: techId,
        }));

        const { error: pivotError } = await supabase
          .from("project_tech")
          .upsert(projectTechs); // Use upsert to handle insert or update

        if (pivotError) {
          setError(
            "Error inserting data into project_tech: " + pivotError.message
          );
        } else {
          setSuccess("Project successfully added!");
        }
      } else {
        setSuccess("Project successfully added without tech stacks!");
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
          <label htmlFor="appname" className=" text-sm text-teal-300 mb-2">
            App Name
          </label>
          <input
            id="appname"
            type="text"
            placeholder="Enter the app name"
            value={appname}
            onInput={(e) => setAppname(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="thumbnail" className=" text-sm text-teal-300 mb-2">
            Thumbnail
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
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
            {techs.map((tech) => (
              <label key={tech.id} className="flex items-center">
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