import { eps, microshield, sai, meta } from "../assets";

// TODO: add more examples

const experiences = [
  {
    title: "Web Developer",
    company_name: "Swiss Aviation Interiors GmbH",
    icon: sai,
    iconBg: "#E6DEDD",
    date: "July 2020 - September 2020",
    points: [
      // TODO: formulate better
      "Developing and maintaining website using HTML, CSS, and JavaScript",
      "Designing and optimizing their official website and implementing a newsletter functionality",
      "Implemented responsive design and ensuring cross-browser compatibility.",
      "Participated in a testing phase and integrating changed and improved features",
    ],
  },
  {
    title: "Fullstack and Desktop Developer",
    company_name: "Microshield AG",
    icon: microshield,
    iconBg: "#383E56",
    date: "January 2021 - September 2023",
    points: [
      // TODO: formulate better
      "Designing and developing their official website using HTML, CSS, and JavaScript",
      "Developing a desktop application called MEMS",
      "Developing a fullstack application called AdverseEvent",
    ],
  },
  {
    title: "Fullstack Developer",
    company_name: "EPS Software Engineering AG",
    icon: eps,
    iconBg: "#E6DEDD",
    date: "October 2022 - January 2023",
    points: [
      // TODO: formulate better
      "Working with the Atlassian Team to further develop the server and cloud plugins for Atlassian Confluence.",
    ],
  },
  {
    // TODO: remove this
    title: "PLACEHOLDER",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

export default experiences;
