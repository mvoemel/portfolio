import { motion } from "framer-motion";

const PulsatingCircles = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex justify-center items-center"
    >
      <div className="absolute border [#33333] rounded-full h-[100px] w-[100px] mt-52  opacity-20 animate-ping" />
      <div className="absolute border [#33333] rounded-full h-[150px] w-[150px] mt-52  opacity-20" />
      <div className="absolute border [#33333] rounded-full h-[250px] w-[250px] mt-52  opacity-20 " />
      <div className="absolute border rounded-full border[#F7AB0A] opacity-20 mt-52 h-[325px] w-[325px] animate-pulse" />
      <div className="absolute border rounded-full border[#33333] mt-52 h-[400px] w-[400px]   opacity-20 " />
    </motion.div>
  );
};

export default PulsatingCircles;
