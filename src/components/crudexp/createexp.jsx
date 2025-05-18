import { useState } from "preact/hooks";
import { NavDrawer } from "../navdrawer";
export function Createexp() {
  const [position, setPosition] = useState("");
  const [place, setPlace] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(position, place, timestamp, duration, description, techs);
  };
  return (
    <>
      <div className="flex min-h-screen w-full">
        <NavDrawer/>
        <div className="p-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-950 p-8 rounded-2xl w-full"
          >
            <h2 className="text-2xl font-bold text-blue-custom mb-6">
              Add Experience
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
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="timestamp"
                className=" text-sm text-teal-300 mb-2"
              >
                Timestamp
              </label>
              <input
                id="timestamp"
                type="text"
                placeholder="Enter the timestamp"
                value={timestamp}
                onInput={(e) => setTimestamp(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="techs" className=" text-sm text-teal-300 mb-2">
                Techs
              </label>
              <input
                id="techs"
                type="text"
                placeholder="Enter the tech stacks"
                value={techs}
                onInput={(e) => setTechs(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 text-teal-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-900 outline-none cursor-pointer"
            >
              Tambah
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
