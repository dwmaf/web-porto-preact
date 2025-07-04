// NavButton.jsx
export function Subheader({ label, onClick, index, hoverStates, setHoverStates }) {
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
      className="flex items-center gap-3 mb-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onClick}
        className="text-blue-200 text-lg font-bold hover:text-white relative overflow-hidden"
      >
        {label}
        <span
          className={`absolute left-0 bottom-1 w-full h-[2px] bg-red-500 transform origin-left scale-x-0 transition-all duration-300 ${
            isHovering
              ? "transform scale-x-100 origin-left"
              : wasHovering
              ? "transform scale-x-0 origin-left translate-x-full transition-all duration-300"
              : "transform scale-x-0 origin-left"
          }`}
        />
        <span
          className={`absolute left-0 bottom-[2px] w-full h-[2px] bg-blue-500 origin-left scale-x-0 ${
            isHovering
              ? "origin-left"
              : wasHovering
              ? "origin-left"
              : "transform scale-x-100 origin-left translate-x-full duration-600"
          }`}
        />
      </button>
    </div>
  );
}
