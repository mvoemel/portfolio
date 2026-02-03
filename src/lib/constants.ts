import {
  CircleXIcon,
  CopyIcon,
  InfoIcon,
  PowerIcon,
  SearchIcon,
  Settings2Icon,
  BadgeCheckIcon,
  CircleEllipsisIcon,
  ClipboardListIcon,
  HomeIcon,
  Trash2Icon,
  type LucideIcon,
} from "lucide-react";

import type {
  ContactCard,
  DockApp,
  NavIconItem,
  NavLinkItem,
  NavSystemItem,
  SafariLinkGroup,
  FileSystemItem,
  FolderItem,
  FileContent,
} from "@/lib/types";

import aboutHobbies from "../assets/about/hobbies.txt?raw";
import aboutShortDescription from "../assets/about/short-description.txt?raw";
import aboutTechnicalSkills from "../assets/about/technical-skills.md?raw";
import dropinDesc from "../assets/projects/dropin-description.md?raw";
import moneymateDesc from "../assets/projects/moneymate-description.md?raw";
import studyflowDesc from "../assets/projects/studyflow-description.md?raw";
import websiteBuilderDesc from "../assets/projects/website-builder-description.md?raw";
import changelog from "../assets/other/changelog.md?raw";

export const iconsSrc = {
  apps: {
    contacts: "/icons/apps/contacts-app.png",
    finder: "/icons/apps/finder-app.png",
    maps: "/icons/apps/maps-app.png",
    safari: "/icons/apps/safari-app.png",
    terminal: "/icons/apps/terminal-app.png",
  },
  files: {
    code: "/icons/files/code-file.png",
    default: "/icons/files/file.png",
    image: "/icons/files/image-file.png",
    markdown: "/icons/files/markdown-file.png",
    pdf: "/icons/files/pdf-file.png",
    readme: "/icons/files/readme-file.png",
    text: "/icons/files/text-file.png",
    url: "/icons/files/url-file.png",
  },
  folders: {
    bookmark: "/icons/folders/folder-bookmark.svg",
    cloud: "/icons/folders/folder-cloud.svg",
    code: "/icons/folders/folder-code.svg",
    desktop: "/icons/folders/folder-desktop.svg",
    documents: "/icons/folders/folder-documents.svg",
    download: "/icons/folders/folder-download.svg",
    games: "/icons/folders/folder-games.svg",
    home: "/icons/folders/folder-home.svg",
    html: "/icons/folders/folder-html.svg",
    images: "/icons/folders/folder-images.svg",
    music: "/icons/folders/folder-music.svg",
    open: "/icons/folders/folder-open.svg",
    public: "/icons/folders/folder-public.svg",
    root: "/icons/folders/folder-root.svg",
    temp: "/icons/folders/folder-temp.svg",
    templates: "/icons/folders/folder-templates.svg",
    videos: "/icons/folders/folder-videos.svg",
    default: "/icons/folders/folder.svg",
    trash: "/icons/folders/trash.png",
  },
};

let _idCounter = 0;
const nextId = () => (++_idCounter).toString();

const getIcon = (ext: string) => {
  const icons: Record<string, string> = {
    txt: iconsSrc.files.text,
    md: iconsSrc.files.markdown,
    webp: iconsSrc.files.image,
    png: iconsSrc.files.image,
    jpg: iconsSrc.files.image,
    jpeg: iconsSrc.files.image,
    svg: iconsSrc.files.image,
    pdf: iconsSrc.files.pdf,
    url: iconsSrc.files.url,
    java: iconsSrc.files.code,
    js: iconsSrc.files.code,
    ts: iconsSrc.files.code,
    py: iconsSrc.files.code,
  };
  return icons[ext] || iconsSrc.files.default;
};

const f = (
  name: string,
  meta: FileContent,
  opts?: { enableDownload?: boolean; winPos?: string; icon?: string },
): FileSystemItem => {
  const extension = name.split(".").pop() || "txt";
  return {
    id: nextId(),
    kind: "file",
    name,
    extension,
    icon: opts?.icon || getIcon(extension),
    downloadable: opts?.enableDownload,
    windowPosition: opts?.winPos,
    meta,
  };
};

const d = (
  name: string,
  children: FileSystemItem[],
  opts?: {
    icon?: string;
    finderIcon?: LucideIcon;
    winPos?: string;
  },
): FolderItem => ({
  id: nextId(),
  kind: "folder",
  name,
  icon: opts?.icon || iconsSrc.folders.default,
  finderIcon: opts?.finderIcon,
  windowPosition: opts?.winPos,
  children,
});

const javaCode = `public void wakeUp() {
    int snoozesHit = 0;
    while (snoozesHit < 5) {
        alarm.snooze();
        snoozesHit++;
    }
    coffee.drink(Coffee.EXTRA_LARGE);
}`;

const aboutFolder = d(
  "About",
  [
    f("portfolio.url", { type: "link", href: "https://michael.voemel.org" }),
    f("me.png", { type: "image", src: "/images/profile-pic-comic.png" }),
    f("drivers-license.png", {
      type: "image",
      src: "/images/drivers-license.png",
    }),
    f("short-description.txt", {
      type: "text",
      content: aboutShortDescription,
    }),
    f("hobbies.txt", { type: "text", content: aboutHobbies }),
    f("technical-skills.md", { type: "text", content: aboutTechnicalSkills }),
  ],
  { finderIcon: InfoIcon },
);

const projectsFolder = d(
  "Projects",
  [
    d(
      "DropIn",
      [
        f(
          "README.md",
          { type: "text", content: dropinDesc },
          { icon: iconsSrc.files.readme },
        ),
        f("codebase.url", {
          type: "link",
          href: "https://github.com/PM4-FS25-DropIn/dropin",
        }),
        f("introduction.url", {
          type: "link",
          href: "https://www.youtube.com/watch?v=wciM1h03AWg",
        }),
        f("logo.png", {
          type: "image",
          src: "/images/dropin-logo.webp",
        }),
        f("mockup-map.png", {
          type: "image",
          src: "/images/dropin-mockup-map.png",
        }),
      ],
      {
        winPos: "top-7 left-5",
      },
    ),
    d(
      "Studyflow",
      [
        f(
          "README.md",
          { type: "text", content: studyflowDesc },
          { icon: iconsSrc.files.readme },
        ),
        f("codebase.url", {
          type: "link",
          href: "https://github.com/mvoemel/studyflow",
        }),
        f(
          "architecture.png",
          {
            type: "image",
            src: "/images/studyflow-architecture.png",
          },
          { enableDownload: true },
        ),
        f(
          "server-arch.png",
          {
            type: "image",
            src: "/images/studyflow-server-arch.png",
          },
          { enableDownload: true },
        ),
      ],
      { winPos: "top-37 left-5" },
    ),
    d(
      "MoneyMate",
      [
        f(
          "README.md",
          { type: "text", content: moneymateDesc },
          { icon: iconsSrc.files.readme },
        ),
        f("codebase.url", {
          type: "link",
          href: "https://github.com/mvoemel/moneymate",
        }),
        f("mock.png", {
          type: "image",
          src: "/images/moneymate-mock.png",
        }),
      ],
      { winPos: "top-67 left-5" },
    ),
    d(
      "Website Builder",
      [
        f(
          "README.md",
          { type: "text", content: websiteBuilderDesc },
          { icon: iconsSrc.files.readme },
        ),
        f("codebase.url", {
          type: "link",
          href: "https://github.com/mvoemel/website-builder",
        }),
      ],
      { winPos: "top-97 left-5" },
    ),
  ],
  { icon: iconsSrc.folders.code, finderIcon: ClipboardListIcon },
);

const otherFolder = d(
  "Other",
  [
    d("About this portfolio", [
      f("codebase.url", {
        type: "link",
        href: "https://github.com/mvoemel/portfolio",
      }),
      f("logo.svg", {
        type: "image",
        src: "/logo.svg",
      }),
      f("techstack.png", {
        type: "image",
        src: "/images/portfolio-techstack.png",
      }),
      f(
        "visual-concept.png",
        {
          type: "image",
          src: "/images/portfolio-visual-concept.png",
        },
        { enableDownload: true },
      ),
      f("changelog.md", { type: "text", content: changelog }),
    ]),
    d(
      "Certifications",
      [
        f(
          "codecademy-aspnet.pdf",
          {
            type: "pdf",
            src: "/files/codecademy-aspnet.pdf",
          },
          { enableDownload: true },
        ),
        f(
          "codecademy-securing-express-apps.pdf",
          {
            type: "pdf",
            src: "/files/codecademy-securing-express-apps.pdf",
          },
          { enableDownload: true },
        ),
        f(
          "codecademy-vuejs.pdf",
          {
            type: "pdf",
            src: "/files/codecademy-vuejs.pdf",
          },
          { enableDownload: true },
        ),
        f(
          "udemy-microservices.pdf",
          {
            type: "pdf",
            src: "/files/udemy-microservices.pdf",
          },
          { enableDownload: true },
        ),
      ],
      { finderIcon: BadgeCheckIcon },
    ),
  ],
  { finderIcon: CircleEllipsisIcon },
);

const archiveFolder = d(
  "Archive",
  [f("placeholder.png", { type: "image", src: "/placeholder.svg" })],
  { icon: iconsSrc.folders.trash, finderIcon: Trash2Icon },
);

export const fileSystemRoot = d(
  "Home",
  [
    aboutFolder,
    projectsFolder,
    otherFolder,
    archiveFolder,
    f("morning-routine.java", {
      type: "code",
      content: javaCode,
      language: "java",
    }),
  ],
  { finderIcon: HomeIcon },
);

export const findItemById = (
  id: string,
  root = fileSystemRoot,
): FileSystemItem | null => {
  if (root.id === id) return root;
  if (root.kind === "folder") {
    for (const child of root.children) {
      const found = findItemById(id, child as FolderItem);
      if (found) return found;
    }
  }
  return null;
};

export const findItemByPath = (
  path: string,
  root = fileSystemRoot,
): FileSystemItem | null => {
  if (path === "/" || path === "") return root;

  const parts = path.split("/").filter((part) => part !== "");

  let current: FileSystemItem = root;
  for (const part of parts) {
    if (current.kind !== "folder") return null;

    const nextItem: FileSystemItem | undefined = current.children.find(
      (child) => child.name === part,
    );

    if (!nextItem) return null;
    current = nextItem;
  }

  return current;
};

export const navSystemDropdown: NavSystemItem[] = [
  {
    id: "1",
    name: "About this portfolio",
    icon: InfoIcon,
    action: "finder",
    finderPath: "Other/About this portfolio",
  },
  { id: "2", name: "Copy link", icon: CopyIcon, action: "clipboard" },
  { id: "3", name: "Close all windows", icon: CircleXIcon, action: "close" },
  { id: "4", name: "Reload tab", icon: PowerIcon, action: "reload" },
];

export const navLinks: NavLinkItem[] = [
  { id: "1", name: "About", type: "link", app: "finder", path: "About" },
  {
    id: "2",
    name: "Projects",
    type: "dropdown",
    children: [
      {
        id: "2-1",
        name: "DropIn",
        icon: iconsSrc.folders.default,
        type: "link",
        app: "finder",
        path: "Projects/DropIn",
      },
      {
        id: "2-2",
        name: "Studyflow",
        icon: iconsSrc.folders.default,
        type: "link",
        app: "finder",
        path: "Projects/Studyflow",
      },
      {
        id: "2-3",
        name: "MoneyMate",
        icon: iconsSrc.folders.default,
        type: "link",
        app: "finder",
        path: "Projects/MoneyMate",
      },
      {
        id: "2-4",
        name: "Website Builder",
        icon: iconsSrc.folders.default,
        type: "link",
        app: "finder",
        path: "Projects/Website Builder",
      },
    ],
  },
  { id: "3", name: "Contact", type: "link", app: "contacts" },
];

export const navIcons: NavIconItem[] = [
  { id: "1", icon: SearchIcon, action: "spotlight" },
  { id: "2", icon: Settings2Icon, action: "controlcenter" },
];

export const dockApps: DockApp[] = [
  {
    type: "finder",
    name: "Finder",
    icon: iconsSrc.apps.finder,
    canOpen: true,
  },
  {
    type: "safari",
    name: "Safari",
    icon: iconsSrc.apps.safari,
    canOpen: true,
  },
  {
    type: "maps",
    name: "Maps",
    icon: iconsSrc.apps.maps,
    canOpen: true,
  },
  {
    type: "contacts",
    name: "Contacts",
    icon: iconsSrc.apps.contacts,
    canOpen: true,
  },
  {
    type: "terminal",
    name: "Terminal",
    icon: iconsSrc.apps.terminal,
    canOpen: true,
  },
];

export const safariLinks: SafariLinkGroup[] = [
  {
    title: "Frequently Visited",
    links: [
      {
        name: "Portfolio",
        icon: "/logo.svg",
        href: "https://michael.voemel.org",
      },
      {
        name: "Github",
        icon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
        href: "https://github.com/mvoemel",
      },
      {
        name: "LinkedIn",
        icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
        href: "https://linkedin.com/in/mvoemel",
      },
    ],
  },
  {
    title: "Companies I have worked with",
    links: [
      {
        name: "Titanion",
        icon: "https://titanion.ch/favicon.ico",
        href: "https://titanion.ch",
      },
      {
        name: "Microshield",
        icon: "https://microshield.ch/images/favicon.png",
        href: "https://microshield.ch",
      },
      {
        name: "EPS Software Engineering",
        icon: "https://www.eps.ch/favicon.ico",
        href: "https://www.eps.ch",
      },
    ],
  },
];

export const contactCards: ContactCard[] = [
  {
    name: "Michael Voemel",
    profilePicture: "/images/profile-pic.png",
    email: "michael@voemel.org",
    github: "https://github.com/mvoemel",
    linkedin: "https://linkedin.com/in/mvoemel",
  },
];

/*
Afghanistan,Angola,Albania,United Arab Emirates,Argentina,Armenia,Antarctica,French Southern and Antarctic Lands,Australia,Austria,Azerbaijan,Burundi,Belgium,Benin,Burkina Faso,Bangladesh,Bulgaria,The Bahamas,Bosnia and Herzegovina,Belarus,Belize,Bolivia,Brazil,Brunei,Bhutan,Botswana,Central African Republic,Canada,Switzerland,Chile,China,Ivory Coast,Cameroon,Democratic Republic of the Congo,Republic of the Congo,Colombia,Costa Rica,Cuba,Northern Cyprus,Cyprus,Czech Republic,Germany,Djibouti,Denmark,Dominican Republic,Algeria,Ecuador,Egypt,Eritrea,Spain,Estonia,Ethiopia,Finland,Fiji,Falkland Islands,France,Gabon,England,Georgia,Ghana,Guinea,Gambia,Guinea Bissau,Equatorial Guinea,Greece,Greenland,Guatemala,Guyana,Honduras,Croatia,Haiti,Hungary,Indonesia,India,Ireland,Iran,Iraq,Iceland,Israel,Italy,Jamaica,Jordan,Japan,Kazakhstan,Kenya,Kyrgyzstan,Cambodia,South Korea,Kosovo,Kuwait,Laos,Lebanon,Liberia,Libya,Sri Lanka,Lesotho,Lithuania,Luxembourg,Latvia,Morocco,Moldova,Madagascar,Mexico,Macedonia,Mali,Myanmar,Montenegro,Mongolia,Mozambique,Mauritania,Malawi,Malaysia,Namibia,New Caledonia,Niger,Nigeria,Nicaragua,Netherlands,Norway,Nepal,New Zealand,Oman,Pakistan,Panama,Peru,Philippines,Papua New Guinea,Poland,Puerto Rico,North Korea,Portugal,Paraguay,Qatar,Romania,Russia,Rwanda,Western Sahara,Saudi Arabia,Sudan,South Sudan,Senegal,Solomon Islands,Sierra Leone,El Salvador,Somaliland,Somalia,Republic of Serbia,Suriname,Slovakia,Slovenia,Sweden,Swaziland,Syria,Chad,Togo,Thailand,Tajikistan,Turkmenistan,East Timor,Trinidad and Tobago,Tunisia,Turkey,Taiwan,United Republic of Tanzania,Uganda,Ukraine,Uruguay,USA,Uzbekistan,Venezuela,Vietnam,Vanuatu,West Bank,Yemen,South Africa,Zambia,Zimbabwe
*/

export const visitedCountries = [
  // North America
  "Canada",
  // "USA",

  // Europe (Western/Central/Northern)
  "Switzerland",
  "Germany",
  "France",
  "England",
  "Netherlands",
  "Belgium",
  "Luxembourg",
  "Austria",
  "Liechtenstein",
  "Czech Republic",
  "Poland",

  // Scandinavia / Baltic
  "Denmark",
  "Sweden",
  "Finland",
  "Estonia",
  "Latvia",
  "Lithuania",

  // Mediterranean / Southern Europe
  "Portugal",
  "Spain",
  "Italy",
  // "Greece",
  // "Malta",
  // "Cyprus",
  "Turkey",
  "Slovenia",
  "Croatia",

  // Eastern Europe / Russia
  "Russia",

  // North Africa
  "Morocco",
  "Egypt",
];
