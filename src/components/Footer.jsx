import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

import { profilepicture } from "../assets";

import PulsatingCircles from "./PulsatingCircles";

// TODO: add LinkedIn and GitHub left and right from img

const Footer = () => {
  return (
    <div className={`mt-20 bg-black-100`}>
      <div className={`bg-tertiary rounded-2xl ${styles.paddingTop}`}>
        <div
          className={`flex justify-center flex-col space-y-8 items-center text-center min-h-[400px] overflow-hidden`}
        >
          <PulsatingCircles />
          <img
            src={profilepicture}
            alt=""
            className="relative rounded-full h-36 w-36 mx-auto"
          />
        </div>
      </div>
      <p className="bg-tertiary flex justify-center">Made by Michael</p>
    </div>
  );
};

export default Footer;
