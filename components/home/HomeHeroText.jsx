import React from "react";
import Video from "./Video";

const HomeHeroText = () => {
  return (
    <div className="font-[font1] pt-5 text-center">
      <div className="text-[9.5vw] justify-center flex items-start uppercase leading-[8vw]">
        The spark
      </div>

      <div className="text-[9.5vw] justify-center flex items-start uppercase leading-[8vw]">
        that
        <div className="h-[7vw] w-[16vw] mt-3 rounded-full overflow-hidden">
          <Video />
        </div>
        ignites
      </div>

      <div className="text-[9.5vw] justify-center flex items-start uppercase leading-[8vw]">
        creativity
      </div>
    </div>
  );
};

export default HomeHeroText;
