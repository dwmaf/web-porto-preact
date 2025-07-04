export function Exp({ timestamp, duration, position, place, description, techs }) {
  return (
    <div className=" bg-slate-950 p-4 rounded-2xl">
      <h6 className="flex items-center w-full text-blue-custom text-sm mb-2 gap-1">
        <span>{timestamp}</span>
        <span className="text-xs leading-none">•</span>
        <span>{duration} </span>
      </h6>
      <h6 className="mb-2 text-cyan-500 font-bold text-lg flex items-center gap-2">
        <span>{position}</span>
        <span className="text-xs leading-none">•</span>
        <span>{place}</span>
      </h6>
      <p className="mb-2 text-blue-custom text-sm w-full">{description}</p>
      <hr className="w-full border-t-1 border-gray-600 opacity-50 mb-3" />
      <div className="flex gap-2 text-sm">
        {techs.map((tech, index) => (
          <div className="rounded-md bg-cyan-950 text-cyan-300 py-1 px-2">
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
