import { useEffect, useState } from "preact/hooks";
import { MainLayout } from "../../layouts/mainlayout";
import supabase from "../../../supabaseClient";

export function Updateexp({id}) {
  const [position, setPosition] = useState("");
  const [place, setPlace] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const experienceId = id;

  useEffect(() => {
    async function getExperience() {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", experienceId)
        .single();

      if (error) {
        setError("Error fetching data: " + error.message);
        return;
      }

      setPosition(data.position);
      setPlace(data.place);
      setTimestamp(data.timestamp);
      setDuration(data.duration);
      setDescription(data.description);
      setTechs(data.techs.join(", "));
    }

    if (experienceId) {
      getExperience();
    }
  }, [experienceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(position, place, timestamp, duration, description, techs);
    const techArray = techs.split(",").map((tech) => tech.trim());
    try {
      const { data, error } = await supabase
        .from("experiences") // Ganti dengan nama tabel yang sesuai
        .update({
          position,
          place,
          timestamp,
          duration,
          description,
          techs: techArray,
        })
        .eq("id", experienceId);

      if (error) {
        setError("Error inserting data: " + error.message);
      } else {
        setSuccess("Experience successfully updated!");
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
          Edit Experience
        </h2>
        <hr className="w-full border-t-1 border-teal-600 opacity-50 mb-6" />
        <div className="mb-4">
          <label htmlFor="position" className=" text-sm text-teal-300 mb-2">
            Position
          </label>
          <input
            id="position"
            type="text"
            placeholder="Enter your position"
            value={position}
            onInput={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="place" className=" text-sm text-teal-300 mb-2">
            Place
          </label>
          <input
            id="place"
            type="text"
            placeholder="Enter the location"
            value={place}
            onInput={(e) => setPlace(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="timestamp" className=" text-sm text-teal-300 mb-2">
            Timestamp
          </label>
          <input
            id="timestamp"
            type="text"
            placeholder="Enter the timestamp"
            value={timestamp}
            onInput={(e) => setTimestamp(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="duration" className=" text-sm text-teal-300 mb-2">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            placeholder="Enter the duration"
            value={duration}
            onInput={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="durdescriptionation"
            className=" text-sm text-teal-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            type="text"
            placeholder="Enter the description"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
            className="min-h-[150px] w-full px-4 py-2 bg-slate-900 text-teal-500 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="techs" className=" text-sm text-teal-300 mb-2">
            Techs
          </label>
          <span className="text-sm text-slate-500 ml-1">
            contoh insert (dipisahkan dengan koma intinya): php, laravel{" "}
          </span>
          <input
            id="techs"
            type="text"
            placeholder="Enter the tech stacks"
            value={techs}
            onInput={(e) => setTechs(e.target.value)}
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
