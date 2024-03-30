import { portfolio, mems, adverseevent } from "../assets";

/**
 * @type {{name: string, abstract: string, description: string, features?: string[], demo_user?: {link: string, user: string, password: string}, tags: {name: string, color: string}[], image: string, source_code_url?: string, demo_url?: string, product_page_url?: string}}
 */
const projects = [
  {
    name: "Portfolio",
    abstract:
      "This website showcases my frontend programming skills, highlighting my ability to create engaging web interfaces with various technologies and design principles.",
    description:
      "The current website is a demonstration of my proficiency in frontend programming. It serves as a platform to display the various techniques, technologies, and designs I am capable of implementing to create visually appealing and functional web interfaces. From responsive layouts to interactive elements, this website exemplifies my expertise in frontend development.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
        background: "blue-gradient",
      },
      {
        name: "tailwindcss",
        color: "green-text-gradient",
        background: "green-gradient",
      },
      {
        name: "threejs",
        color: "pink-text-gradient",
        background: "pink-gradient",
      },
    ],
    image: portfolio,
    source_code_url: "https://github.com/mvoemel/portfolio",
    demo_url: "https://mvoemel.onrender.com/",
  },
  {
    name: "Adverse Event",
    abstract:
      "Explore a fullstack application designed for effective risk management, showcasing my expertise in both frontend and backend development.",
    description:
      "This fullstack application offers comprehensive risk management capabilities for businesses. From identifying potential risks to implementing strategies for mitigation, it provides a centralized platform to streamline risk assessment processes. By leveraging both frontend and backend technologies, including databases, APIs, and user interfaces, this project showcases my proficiency in developing end-to-end solutions that address complex business needs.",
    features: [
      "Ground up Implementation of Login System based on JWT",
      "Role based Access Control",
      "Automated Email Notification System",
      "Global State Management using Redux",
    ],
    tags: [
      {
        name: "mern stack",
        color: "orange-text-gradient",
        background: "orange-gradient",
      },
      {
        name: "rtk",
        color: "pink-text-gradient",
        background: "pink-gradient",
      },
      {
        name: "mui",
        color: "blue-text-gradient",
        background: "blue-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
        background: "green-gradient",
      },
    ],
    image: adverseevent,
    product_page_url: "https://sma-webpage.ch/produkte/adverse-event/",
  },
  {
    name: "MEMS",
    abstract:
      "Discover a desktop application tailored for managing Measurement and Testing equipment, reflecting my skills in desktop application development.",
    description:
      "The desktop application is tailored for efficiently managing Measurement and Testing equipment within various organizational settings. Offering a user-friendly interface and robust functionality, it facilitates tasks such as inventory tracking, calibration scheduling, and performance monitoring. Developed using desktop application programming languages and frameworks, this project underscores my ability to create intuitive and effective software solutions for desktop environments.",
    features: [
      "Cross Platform Compatibility",
      "Automatic Notification and Sorting of upcoming Maintenance Tasks",
      "Local Databse using SqLite3",
      "Import / Export Functionality",
    ],
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
        background: "blue-gradient",
      },
      {
        name: "qt",
        color: "green-text-gradient",
        background: "green-gradient",
      },
      {
        name: "sqlite3",
        color: "pink-text-gradient",
        background: "pink-gradient",
      },
    ],
    image: mems,
    product_page_url: "https://sma-webpage.ch/produkte/mems/",
  },
];

export default projects;
