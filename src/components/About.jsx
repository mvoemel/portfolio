/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../data";
import SectionWrapper from "./SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const EXPERIENCE_SINCE_YEAR = 2021;

  const numberOfYearsExperience = () => {
    const currentDate = new Date();
    const differenceInYears = currentDate.getFullYear() - EXPERIENCE_SINCE_YEAR;

    // getMonth() returns the current month (0-11)
    return currentDate.getMonth() >= 6
      ? differenceInYears + 0.5
      : differenceInYears;
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          <span className="text-[#915EFF]">Introduction</span>
        </p>
        <h2 className={styles.sectionHeadText}>About me</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a software engineer with combined {numberOfYearsExperience()}{" "}
        years of experience in{" "}
        <span className="text-[#915EFF]">TypeScript</span> and{" "}
        <span className="text-[#915EFF]">JavaScript</span>,{" "}
        <span className="text-[#915EFF]">Java</span>,{" "}
        <span className="text-[#915EFF]">Python</span> and skilled with using
        frameworks and environments like{" "}
        <span className="text-[#915EFF]">React</span>,{" "}
        <span className="text-[#915EFF]">Node.js</span>, and{" "}
        <span className="text-[#915EFF]">Next.js</span>.
        <br />I get excited about opportunities where I can innovate,
        collaborate with a talented team, and continuously learn and grow while
        solving complex technical challenges.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
