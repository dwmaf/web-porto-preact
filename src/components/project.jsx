import { route } from "preact-router";
import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";

export function Project({ thumbnail, appname, description, techs, alt, slug }) {
  const handleClick = () => {
    route(`/project/${slug}`);
  };

  return (
    <div
      className="bg-slate-950 p-4 rounded-2xl cursor-pointer group transition-all duration-300 hover:ring-1 hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-900/10 hover:-translate-y-1"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
    >
      <div className="relative overflow-hidden mb-3">
        <img
          src={thumbnailData[thumbnail].thumb_source}
          alt={alt}
          className="w-full max-h-80 object-cover object-top rounded-sm border border-cyan-200 text-cyan-100 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/90 text-white text-sm font-medium shadow-lg">
            View Project
          </span>
        </div>
      </div>
      <h5 className="mb-2 text-cyan-500 text-lg font-bold flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
        {appname}
      </h5>
      <p className="mb-2 text-blue-custom text-sm w-full line-clamp-3">{description}</p>
      <hr className="w-full border-t-1 border-gray-600 opacity-50 mb-3" />
      <div className="flex flex-wrap gap-3">
        {techs.map((techId, index) => (
          <div class="flex items-center gap-1" key={techId}>
            <div
              className={`rounded-3xl w-8 h-8 flex items-center justify-center ${techData[techId]["bg-spesial"]}`}
            >
              <img
                src={techData[techId].icon_source}
                alt={techData[techId].techname}
                className={`w-5`}
              />
            </div>
            <span className="text-sm text-blue-custom leading-none">
              {techData[techId].techname}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
