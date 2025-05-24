import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";
export function Project({ thumbnail, appname, description, techs, alt }) {
  return (
    <div className=" bg-slate-950 p-4 rounded-2xl">
      <img
        src={thumbnailData[thumbnail].thumb_source}
        alt={alt}
        className="w-full max-h-80 object-cover object-top rounded-md border border-teal-200 mb-3 text-teal-100"
      />
      <h5 className="mb-2 text-teal-500 text-lg font-bold flex items-center gap-2">
        {appname}
      </h5>
      <p className="mb-2 text-blue-custom text-sm w-full">{description}</p>
      <hr className="w-full border-t-1 border-gray-600 opacity-50 mb-3" />
      <div className="flex flex-wrap gap-3">
        {techs.map((techId, index) => (
          <div class="flex items-center gap-1">
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
