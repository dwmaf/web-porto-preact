import { useLanguage, t } from "../context/language-context";

// NavButton.jsx
export function Subheader({
  label,
  onClick,
  index,
  hoverStates,
  setHoverStates,
  number,
}) {
  const { language } = useLanguage();
  const handleMouseEnter = () => {
    const newStates = [...hoverStates];
    newStates[index].isHovering = true;
    setHoverStates(newStates);
  };

  const handleMouseLeave = () => {
    const newStates = [...hoverStates];
    newStates[index].isHovering = false;
    newStates[index].wasHovering = true;
    setHoverStates(newStates);

    setTimeout(() => {
      const resetStates = [...newStates];
      resetStates[index].wasHovering = false;
      setHoverStates(resetStates);
    }, 300);
  };

  const isHovering = hoverStates[index].isHovering;
  const wasHovering = hoverStates[index].wasHovering;

  return (
    <div
      className="flex items-center mb-5 ml-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onClick}
        className="text-cyan-600 dark:text-cyan-400 text-2xl font-bold relative overflow-hidden text-left flex items-center gap-4 pb-1 transition-colors"
      >
        {number && (
          <div className="flex items-center gap-2">
            <span className="font-medium w-7 h-[1px] bg-slate-400 dark:bg-slate-500 transition-colors" />
            <span className="font-['Geist_Mono',_monospace] text-sm text-slate-500 dark:text-slate-400 tracking-widest whitespace-nowrap">
              {number}. /
            </span>
          </div>
        )}
        <span className="hover:text-cyan-800 dark:hover:text-cyan-200">{t(label, language).toUpperCase()}</span>
        <span
          className={`absolute bottom-0 h-[2px] bg-teal-400 dark:bg-teal-500 w-full ${
            isHovering || wasHovering ? "transition-all duration-300" : ""
          } ${
            isHovering ? "left-0" : wasHovering ? "left-full" : "-left-full"
          }`}
        />
      </button>
    </div>
  );
}
