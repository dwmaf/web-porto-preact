import { useState, useEffect } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import supabase from "../../../supabaseClient";
const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Updateproject() {
  const [thumbnail, setThumbnail] = useState("");
  const [appname, setAppname] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState([]); // All available tech stacks
  const [selectedTechs, setSelectedTechs] = useState([]); // Selected tech stacks
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const projectId = id;
  // Fetch available techs
  useEffect(() => {
    async function fetchTechs() {
      const { data, error } = await supabase.from("techs").select("id, techname");
      if (error) {
        console.error("Error fetching techs:", error);
      } else {
        setTechs(data);
      }
    }

    fetchTechs();
  }, []);

  // Fetch the current project data
  useEffect(() => {
    async function fetchProject() {
      const { data: projectData, error } = await supabase
        .from("projects")
        .select("id, appname, description, thumbnail")
        .eq("id", projectId)
        .single();

      if (error) {
        setError("Error fetching project data: " + error.message);
      } else {
        setAppname(projectData.appname);
        setDescription(projectData.description);
        setThumbnail(projectData.thumbnail);
        
        // Fetch the associated techs for this project
        const { data: projectTechs, error: techError } = await supabase
          .from("project_tech")
          .select("tech_id")
          .eq("project_id", projectId);

        if (techError) {
          setError("Error fetching techs for this project: " + techError.message);
        } else {
          setSelectedTechs(projectTechs.map((tech) => tech.tech_id)); // Set selected techs
        }
      }
    }

    fetchProject();
  }, [projectId]);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      setError("Thumbnail is required");
      return;
    }

    try {
      // Upload thumbnail to Cloudinary
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

      // Update the project data
      const { data: updatedProject, error: updateError } = await supabase
        .from("projects")
        .update({
          thumbnail: thumbnailUrl,
          appname,
          description,
        })
        .eq("id", projectId)
        .single();

      if (updateError) {
        setError("Error updating project: " + updateError.message);
        return;
      }

      // Remove the old tech entries in the project_tech table
      const { error: deleteError } = await supabase
        .from("project_tech")
        .delete()
        .eq("project_id", projectId);

      if (deleteError) {
        setError("Error removing old tech associations: " + deleteError.message);
        return;
      }

      // Insert the new tech associations into the project_tech table
      if (selectedTechs.length > 0) {
        const projectTechs = selectedTechs.map((techId) => ({
          project_id: updatedProject.id,
          tech_id: techId,
        }));

        const { error: pivotError } = await supabase
          .from("project_tech")
          .upsert(projectTechs); // Use upsert to insert new or update existing records

        if (pivotError) {
          setError("Error updating tech associations: " + pivotError.message);
        } else {
          setSuccess("Project successfully updated!");
        }
      } else {
        setSuccess("Project successfully updated without tech stacks!");
      }
    } catch (error) {
      setError("Error updating data: " + error.message);
    }
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-custom mb-6">Update Project</h2>
        <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />
        
        <div className="mb-4">
          <label htmlFor="appname" className=" text-sm text-teal-300 mb-2">App Name</label>
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
          <label htmlFor="thumbnail" className=" text-sm text-teal-300 mb-2">Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className=" text-sm text-teal-300 mb-2">Description</label>
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
          <label htmlFor="techs" className=" text-sm text-teal-300 mb-2">Techs</label>
          <div className="space-y-2">
            {techs.map((tech) => (
              <label key={tech.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTechs.includes(tech.id)} // Mark as selected if it's in selectedTechs
                  value={tech.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTechs((prev) => [...prev, tech.id]);
                    } else {
                      setSelectedTechs((prev) => prev.filter((id) => id !== tech.id));
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
          Update Project
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </MainLayout>
  );
}