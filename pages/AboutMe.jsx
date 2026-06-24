"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const AboutMe = () => {
  const imageDivRef = useRef(null)
  const imageRef = useRef(null)
  const imageArray = [
    '/logo1.webp',
    '/logo2.webp',
    '/logo3.webp',
    '/logo4.webp',
    '/logo5.webp',
    '/logo6.webp',
    '/logo7.webp',
    '/logo8.webp',
    '/logo9.webp',
    '/logo10.webp',
    '/logo11.webp',
    '/logo12.webp',
    '/logo13.webp',
    '/logo14.webp',
    '/logo15.webp',
    '/logo16.webp',
    '/logo17.webp',
  ]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        markers: true,
        start: "top 25%", 
        end: "top -75%", 
        scrub: true, 
        pin:true,
        onUpdate:(elem)=>{
          const imageIndex = Math.floor(elem.progress*imageArray.length)
          if(imageIndex < imageArray.length){
            imageRef.current.src = imageArray[imageIndex]
          }
          // console.log(Math.floor(elem.progress*imageArray.length))
        },
      },
      // x: 200, // just an example so you can see the animation
    });
  });

  return (
    <div>
      <div className="section1 text-white">
        <div ref={imageDivRef} className="absolute overflow-hidden h-[20vw] w-[15vw] rounded-4xl top-44 left-[30vw]">
          <img ref={imageRef}
            className="h-full object-cover w-full"
            src={imageArray[0]}
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

export default AboutMe;
