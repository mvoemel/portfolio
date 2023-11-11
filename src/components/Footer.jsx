import { motion } from "framer-motion";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";

import { profilepicture, github, linkedin } from "../assets";
import { linkedInUrl, githubUrl } from "../data/constants";

import PulsatingCircles from "./PulsatingCircles";

const Footer = () => {
  return (
    <div className={`mt-20 bg-black-100`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} flex xl:flex-row flex-col gap-10 justify-between items-center`}
      >
        <motion.div variants={slideIn("left", "spring", 0.2, 1)}>
          <div
            onClick={() => window.open(linkedInUrl, "_blank")}
            className="blue-gradient w-20 h-20 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={linkedin}
              alt="product page"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          variants={slideIn("top", "spring", 0.2, 1)}
          className={`flex justify-center flex-col space-y-8 items-center text-center min-h-[400px]`}
        >
          <PulsatingCircles />
          <img
            src={profilepicture}
            alt=""
            className="relative rounded-full h-36 w-36 mx-auto"
          />
        </motion.div>
        <motion.div variants={slideIn("right", "spring", 0.2, 1)}>
          <div
            onClick={() => window.open(githubUrl, "_blank")}
            className="black-gradient w-20 h-20 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={github}
              alt="source code"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </motion.div>
      </div>
      <p className="bg-tertiary flex justify-center">Made by Michael</p>
    </div>
  );
};

export default Footer;
