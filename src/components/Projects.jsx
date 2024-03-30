/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, livedemo, productpage } from "../assets";
import SectionWrapper from "./SectionWrapper";
import { projects } from "../data";
import { fadeIn, textVariant } from "../utils/motion";
import { useModal } from "../hooks/useModal";
import CustomModal from "../providers/CustomModal";

// TODO: add detailed description and bulletpoints
// TODO: rework tags design
const ProjectModalCard = ({
  description,
  features,
  demo_user,
  tags,
  image,
  source_code_url,
  demo_url,
  product_page_url,
}) => {
  return (
    <div>
      <div className="relative w-full h-full">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="flex justify-start gap-5 my-3 card-img_hover">
        {/* PRODUCT PAGE URL */}
        {product_page_url && (
          <div
            onClick={() => window.open(product_page_url, "_blank")}
            className="flex flex-row justify-between gap-2 blue-text-gradient cursor-pointer"
          >
            <div className="blue-gradient w-10 h-10 rounded-full flex justify-center items-center">
              <img
                src={productpage}
                alt="product page"
                className="w-5 h-5 object-contain"
              />
            </div>
            <h3 className="flex justify-center items-center">Product Page</h3>
          </div>
        )}
        {/* DEMO URL */}
        {demo_url && (
          <div
            onClick={() => window.open(demo_url, "_blank")}
            className="flex flex-row justify-between gap-2 violet-pink-text-gradient cursor-pointer"
          >
            <div className="violet-pink-gradient w-10 h-10 rounded-full flex justify-center items-center">
              <img
                src={livedemo}
                alt="demo"
                className="w-5 h-5 object-contain"
              />
            </div>
            <h3 className="flex justify-center items-center">Demo Page</h3>
          </div>
        )}
        {/* SOURCE CODE LINK */}
        {source_code_url && (
          <div
            onClick={() => window.open(source_code_url, "_blank")}
            className="flex flex-row justify-between gap-2 black-text-gradient cursor-pointer"
          >
            <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center">
              <img src={github} alt="demo" className="w-5 h-5 object-contain" />
            </div>
            <h3 className="flex justify-center items-center">GitHub Page</h3>
          </div>
        )}
      </div>

      <div className="mt-5">
        {/* DESCRIPTION */}
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
        {/* FEATURES */}
        <ul className="mt-4 list-disc ml-5 space-y-2">
          {features &&
            features.map((point, index) => (
              <li
                key={`feature-point-${index}`}
                className="text-white-100 text-[14px] pl-1 tracking-wider"
              >
                {point}
              </li>
            ))}
        </ul>
        {/* DEMO USER */}
        {demo_user && (
          <>
            <p className="mt-4 text-secondary text-[14px]">Demo User:</p>
            <li
              key="demo-user-link"
              className="text-secondary text-[14px] pl-1"
            >
              <b>Link: </b>
              <a
                href={demo_user.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {demo_user.link}
              </a>
            </li>
            <li
              key="demo-user-link"
              className="text-secondary text-[14px] pl-1"
            >
              <b>User: </b>
              {demo_user.user}
            </li>
            <li
              key="demo-user-link"
              className="text-secondary text-[14px] pl-1"
            >
              <b>Password: </b>
              {demo_user.password}
            </li>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={`${name}-${tag.name}`}
            className={`${tag.background} border border-primary rounded-[50px] px-2 py-1`}
          >
            <p className={`text-[14px] text-primary`}>{tag.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({
  index,
  name,
  abstract,
  description,
  features,
  demo_user,
  tags,
  image,
  source_code_url,
  demo_url,
  product_page_url,
}) => {
  const { setOpen } = useModal();

  return (
    <motion.div
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.95 }}
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      onClick={() =>
        setOpen(
          <CustomModal title={name}>
            <ProjectModalCard
              description={description}
              features={features}
              demo_user={demo_user}
              tags={tags}
              image={image}
              source_code_url={source_code_url}
              demo_url={demo_url}
              product_page_url={product_page_url}
            />
          </CustomModal>
        )
      }
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end gap-1 m-3 card-img_hover">
          {/* PRODUCT PAGE URL */}
          {product_page_url && (
            <div
              onClick={() => window.open(product_page_url, "_blank")}
              className="blue-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={productpage}
                alt="product page"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          )}
          {/* DEMO URL */}
          {demo_url && (
            <div
              onClick={() => window.open(demo_url, "_blank")}
              className="violet-pink-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={livedemo}
                alt="demo"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          )}
          {/* SOURCE CODE LINK */}
          {source_code_url && (
            <div
              onClick={() => window.open(source_code_url, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{abstract}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>
          <span className="text-[#915EFF]">Projects</span>
        </p>
        <h2 className={`${styles.sectionHeadText}`}>Some of my Work</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Some projects have a{" "}
          <span className="text-[#915EFF]">public repository</span>, some have a{" "}
          <span className="text-[#915EFF]">live demonstation</span> page and
          some have a <span className="text-[#915EFF]">product page</span>. It
          reflects my ability to solve complex problems, work with different
          technologies, and manage projects effectively. Click on a project to
          see more!
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "");
