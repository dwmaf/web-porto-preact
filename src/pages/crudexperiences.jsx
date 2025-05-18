import { useState, useEffect } from "preact/hooks";
import { NavDrawer } from "../components/navdrawer";
import supabase from "../../supabaseClient";
import { PlusSquare, Trash2, Edit } from "feather-icons-react";
import { Createexp } from "../components/crudexp/createexp";
export function Crudexperiences() {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    getExperiences();
  }, []);
  async function getExperiences() {
    const { data } = await supabase.from("experiences").select();
    setExperiences(data);
  }

  return (
    <>
      <div className="flex min-h-screen  ">
        <NavDrawer />
        <div className="p-4 w-full">
          <div className="bg-gray-800 w-full rounded p-4">
            <div className="flex justify-between mb-3">
              <h1 className="text-white text-3xl font-bold">Experiences</h1>
              <a href="/createexp" className="bg-teal-900 rounded-md py-1 px-3 cursor-pointer flex items-center gap-2">
                <PlusSquare size={20} className="text-teal-200 " />
                <span className="leading-none text-teal-300">Tambah</span>
              </a>
            </div>

            <table class="min-w-full table-auto border-separate border-2 border-gray-700 rounded-lg overflow-hidden">
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
                      <span className="text-2xl text-teal-500 leading-none">
                        •
                      </span>
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
                        <div className="bg-teal-900 rounded-md p-1 cursor-pointer">
                          <Edit size={20} className="text-teal-200" />
                        </div>
                        <div className="bg-teal-900 rounded-md p-1 cursor-pointer">
                          <Trash2 size={20} className="text-teal-200" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </>
  );
}
