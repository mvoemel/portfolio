/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
import SectionWrapper from "./SectionWrapper";
import { technologies } from "../data";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const TechCard = ({ index, name, icon, lightbackground }) => (
  <Tilt className="xs:w-[150px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.25, 0.5)}
      className="w-full green-pink-gradient p-[1px] rounded-[150px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[150px] py-2 px-2 min-h-[150px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt={name}
          className={`w-12 h-12 object-contain ${
            lightbackground && "bg-secondary rounded-[50px]"
          }`}
        />

        <h3 className="text-white text-[14px] font-bold text-center">{name}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          <span className="text-[#915EFF]">Skills</span>
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Technologies I&apos;m familiar with
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        <h3 className={`${styles.sectionSubText} text-center w-full`}>
          Languages
        </h3>
        {technologies
          .filter((tech) => tech.category === "Languages")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}

        <h3 className={`${styles.sectionSubText} text-center w-full`}>
          Frameworks
        </h3>
        {technologies
          .filter((tech) => tech.category === "Frameworks")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}

        <h3 className={`${styles.sectionSubText} text-center w-full`}>
          Environments
        </h3>
        {technologies
          .filter((tech) => tech.category === "Environments")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}

        <h3 className={`${styles.sectionSubText} text-center w-full`}>
          DataBases
        </h3>
        {technologies
          .filter((tech) => tech.category === "DataBases")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}

        <h3 className={`${styles.sectionSubText} text-center w-full`}>
          DevOps
        </h3>
        {technologies
          .filter((tech) => tech.category === "DevOps")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}

        <h3 className={`${styles.sectionSubText} text-center w-full`}>Other</h3>
        {technologies
          .filter((tech) => tech.category === "Other")
          .map((tech, index) => (
            <TechCard key={tech.title} index={index} {...tech} />
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
