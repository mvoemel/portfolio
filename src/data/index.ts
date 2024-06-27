import { gridItems } from "./bentogrid";
import { projects } from "./projects";
import { testimonials, companies } from "./clients";
import { experience } from "./experience";
import { approachPhases } from "./approach";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  // { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

const socialMedia = [
  {
    id: 1,
    img: "/technologies/devops/github.svg",
    link: "https://github.com/mvoemel",
  },
  {
    id: 3,
    img: "/socials/linkedin.svg",
    link: "https://www.linkedin.com/in/mvoemel",
  },
];

const email = "michael@voemel.org";

export {
  navItems,
  gridItems,
  projects,
  testimonials,
  companies,
  experience,
  approachPhases,
  socialMedia,
  email,
};
