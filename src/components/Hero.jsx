import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { MacBookCanvas } from "./canvas";
import { navLinks } from "../data";

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "Hi, my name is Michael",
      "I develop fullstack web applications",
      "and desktop applications",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      {/* INTRODUCTION CONTAINER */}
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* LINE WITH DOT */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* TYPEWRITER AND INTRODUCTION TEXT */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="mr-3 text-white"> {text} </span>
            <Cursor cursorColor="#915EFF" />
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I have helped companies create{" "}
            <span className="text-[#915EFF]">websites</span>,{" "}
            <span className="text-[#915EFF]">SaaS</span> and{" "}
            <br className="sm:block hidden" />
            <span className="text-[#915EFF]">desktop</span> applications.
          </p>
        </div>
      </div>

      <MacBookCanvas />

      {/* SCROLL DOWN AND NAVLINK BUTTONS */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about" className="sm:hidden block">
          {/* ANIMATED SCROLL DOWN BUTTON */}
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>

        {/* TODO: remove animation and make buttons static */}
        {/* ANIMATED NAVLINK BUTTONS */}
        <div className="sm:flex hidden">
          {navLinks.map((nav) => (
            <a href={`#${nav.id}`} key={nav.id} className="text-[#aaa6c3]">
              <div className="py-1 px-3 mx-2 h-[35px] rounded-3xl border-2 border-secondary flex justify-center items-start">
                <motion.div
                  animate={{
                    x: [-4, 4, -4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <h1 className="flex justify-center items-center">
                    {nav.title}
                  </h1>
                </motion.div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
