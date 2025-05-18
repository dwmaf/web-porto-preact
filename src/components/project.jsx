export function Project({ thumbnail, appname, description, techs, alt }) {
  return (
    <div className=" bg-slate-950 p-4 rounded-2xl">
        <img src={thumbnail} alt={alt} className="w-full max-h-80 object-cover object-top rounded-md border border-teal-200 mb-3 text-teal-100"/>
      <h5 className="mb-2 text-teal-500 text-lg font-bold flex items-center gap-2">
            {appname}
      </h5>
      <p className="mb-2 text-blue-custom text-sm w-full">{description}</p>
      <hr className="w-full border-t-1 border-gray-600 opacity-50 mb-3" />
      <div className="flex gap-2 text-sm">
        {techs.map((tech, index) => (
          <div className="rounded-md bg-teal-950 text-teal-300 py-1 px-2">
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
