import { portfolio, mems, adverseevent } from "../assets";

const projects = [
  {
    name: "Portfolio",
    description:
      "This project is the website you are currently looking at. It showcases what I'm capable of programming in the frontend.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "green-text-gradient",
      },
      {
        name: "threejs",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_url: "https://github.com/mvoemel/portfolio",
    demo_url: "https://mvoemel.onrender.com/",
  },
  {
    name: "Adverse Event",
    description:
      "This project is a fullstack application that allows you to manage risks in your company. This application showcases my fullstack experience.",
    tags: [
      {
        name: "mern stack",
        color: "orange-text-gradient",
      },
      {
        name: "rtk",
        color: "pink-text-gradient",
      },
      {
        name: "mui",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
    ],
    image: adverseevent,
    product_page_url: "https://sma-webpage.ch/produkte/adverse-event/",
  },
  {
    name: "MEMS",
    description:
      "This project is a desktop application that allows you to manage Measurement and Testing equipment. This application showcases my desktop application programming skills.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "qt",
        color: "green-text-gradient",
      },
      {
        name: "sqlite3",
        color: "pink-text-gradient",
      },
    ],
    image: mems,
    product_page_url: "https://sma-webpage.ch/produkte/mems/",
  },
];

export default projects;
