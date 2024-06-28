export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/macbook.png",
    spareImg: "",
  },
  {
    id: 2,
    title: "I adapt to different time zones for seamless communication.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start text-center",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to enhance",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
    leftTechList: ["C", "Java", "Python", "Typescript"],
    rightTechList: ["ReactJS", "NextJS", "MongoDB", "Postgres"],
  },
  // TODO: (maybe) split Random Repo into two columns (id: 4 and 5)
  {
    id: 5,
    title: "Random Repo",
    description: "",
    link: "https://github.com/mvoemel/random",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName:
      "justify-center md:max-w-full max-w-60 text-center items-center",
    img: "/bg.png",
    spareImg: "",
  },
  {
    id: 6,
    title: "About Me",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center max-w-full",
    img: "/grid-2.svg",
    spareImg: "",
    paragraph: `Leveraging over ${
      new Date().getFullYear() - 2021
    } years of experience in software development, I excel in building robust, scalable, and secure applications using modern technologies and best practices. As a dedicated and versatile Full-Stack Software Engineer, I have expertise in designing, developing, deploying, and maintaining web applications. My skills span both front-end and back-end technologies, enabling me to build comprehensive solutions. I am passionate about leveraging technology to solve complex problems and continuously enhancing my skills to keep up with the ever-evolving tech landscape.`,
  },
  {
    id: 7,
    title: "CI/CD tools I use",
    description: "DevOps",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "max-w-full",
    img: "",
    spareImg: "",
    devopsTechstack: [
      {
        id: 1,
        name: "Confluence",
        description: "Documentation",
        image: "/technologies/devops/confluence.png",
      },
      {
        id: 2,
        name: "Jira",
        description: "Issue & Project Tracking",
        image: "/technologies/devops/jira.png",
      },
      {
        id: 3,
        name: "BitBucket",
        description: "Version Control",
        image: "/technologies/devops/bitbucket.png",
      },
      {
        id: 4,
        name: "GitHub",
        description: "Version Control & Deployment",
        image: "/technologies/devops/github.svg",
      },
      {
        id: 5,
        name: "GitLab",
        description: "CI/CD Pipeline",
        image: "/technologies/devops/gitlab.svg",
      },
      {
        id: 6,
        name: "Git",
        description: "Version Control",
        image: "/technologies/devops/git.png",
      },
      {
        id: 7,
        name: "Docker",
        description: "Deployment",
        image: "/technologies/devops/docker.png",
      },
      {
        id: 8,
        name: "Jenkins",
        description: "CI/CD Pipeline",
        image: "/technologies/devops/jenkins.png",
      },
      {
        id: 9,
        name: "Proxmox",
        description: "Deployment",
        image: "/technologies/devops/proxmox.png",
      },
    ],
  },
  {
    id: 8,
    title: "Currently working on a Management Tool.",
    description: "Behind the Scenes",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid-1.svg",
  },
  {
    id: 9,
    title: "Passionate tech enthusiast dedicated to development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid-1.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 10,
    title: "Interested in a project collaboration? Let's connect.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];
