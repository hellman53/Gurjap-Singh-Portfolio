import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const Agence = () => {
  const imageDivRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.to(imageDivRef.current, {
      scrollTrigger: { // ✅ must be lowercase
        trigger: imageDivRef.current,
        markers: true,
        start: "top 25%", // optional
        end: "bottom -75%", // optional
        scrub: true, // optional if you want scroll sync
        pin:true
      },
      // x: 200, // just an example so you can see the animation
    });
  });

  return (
    <div>
      <div className="section1">
        <div ref={imageDivRef} className="absolute overflow-hidden h-[20vw] w-[15vw] rounded-4xl top-44 left-[30vw]">
          <img
            className="h-full object-cover w-full"
            src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg"
            alt=""
          />
        </div>
        <div className="font-[font2]">
          <div className="relative mt-[55vh]">
            <h1 className="text-[20vw] text-center uppercase leading-[17vw]">
              Soixan7e <br /> Douze
            </h1>
          </div>
          <div className="relative pl-[40%] mt-20">
            <p className="text-5xl ">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notre curiosité nourrit notre
              créativité. On reste humbles et on dit non aux gros egos, même le
              vôtre. Une marque est vivante. Elle a des valeurs, une
              personnalité, une histoire. Si on oublie ça, on peut faire de bons
              chiffres à court terme, mais on la tue à long terme. C’est pour ça
              qu’on s’engage à donner de la perspective, pour bâtir des marques
              influentes.
            </p>
          </div>
        </div>
      </div>

      <div className="section2 h-screen"></div>
    </div>
  );
};

export default Agence;
