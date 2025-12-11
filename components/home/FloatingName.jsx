const FloatingName = () => {
  return (
    <div
      className="
        fixed top-6 left-6 z-50
        px-5 py-2
        border border-white/30
        text-white
        rounded-md
        bg-black/20
        backdrop-blur-[2px]
        font-light tracking-[0.08em]
        uppercase 
        text-sm
        animate-fadein
      "
      style={{ fontFamily: "serif" }}
    >
      Gurjap Singh
    </div>
  );
};

export default FloatingName;
