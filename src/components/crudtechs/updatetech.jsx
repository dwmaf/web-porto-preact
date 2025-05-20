import { useState } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import supabase from "../../../supabaseClient";

const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET;

export function Updatetech() {
  const [icon, setIcon] = useState("");
  const [techname, setTechname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const techId = id;

  useEffect(() => {
    async function getTech() {
      const { data, error } = await supabase
        .from("techs")
        .select("*")
        .eq("id", techId)
        .single();

      if (error) {
        setError("Error fetching data: " + error.message);
        return;
      }

      setIconUrl(data.icon);
      setTechname(data.techname);
    }

    if (techId) {
      getTech();
    }
  }, [techId]);

   const handleIconChange = (e) => {
    setIcon(e.target.files[0]); // Store the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(position, place, timestamp, duration, description, techs);
    try {

      let uploadedIconUrl = iconUrl;

      if (icon) {
        // If a new icon is uploaded, upload it to Cloudinary
        const formData = new FormData();
        formData.append("file", icon);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }

        uploadedIconUrl = data.secure_url; // Get the uploaded image URL
      }

      const { data, error } = await supabase
        .from("techs") // Ganti dengan nama tabel yang sesuai
        .update({
          icon: uploadedIconUrl,
          techname,
        })
        .eq("id", techId);

      if (error) {
        setError("Error updating data: " + error.message);
      } else {
        setSuccess("Tech stack successfully updated!");
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
          Update Tech Stack
        </h2>
        <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />
        <div className="mb-4">
          <label htmlFor="position" className=" text-sm text-teal-300 mb-2">
            Icon
          </label>
          {/* Display the current icon if available */}
          {iconUrl && (
            <div className="mb-4">
              <img src={iconUrl} alt="Current Icon" className="w-16 h-16 object-cover" />
            </div>
          )}
          <input
            id="position"
            type="file"
            placeholder="Enter the icon"
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
          Update
        </button>
        {/* Show success or error messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </MainLayout>
  );
}
