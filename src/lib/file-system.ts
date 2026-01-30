import {
  BadgeCheckIcon,
  CircleEllipsisIcon,
  ClipboardListIcon,
  HomeIcon,
  InfoIcon,
  Trash2Icon,
  type LucideIcon,
} from "lucide-react";

import type { FileSystemItem, FolderItem, FileContent } from "@/lib/types";

import aboutHobbies from "../assets/about/hobbies.txt?raw";
import aboutShortDescription from "../assets/about/short-description.txt?raw";
import aboutTechnicalSkills from "../assets/about/technical-skills.md?raw";
import dropinDesc from "../assets/projects/dropin/description.md?raw";
import moneymateDesc from "../assets/projects/moneymate/description.md?raw";
import studyflowDesc from "../assets/projects/studyflow/description.md?raw";
import websiteBuilderDesc from "../assets/projects/website-builder/description.md?raw";
import changelog from "../assets/other/changelog.md?raw";

let _idCounter = 0;
const nextId = () => (++_idCounter).toString();

const getIcon = (ext: string) => {
  const icons: Record<string, string> = {
    txt: "/icons/text-file.png",
    md: "/icons/markdown-file.png",
    png: "/icons/image-file.png",
    jpg: "/icons/image-file.png",
    pdf: "/icons/pdf-file.png",
    url: "/icons/url-file.png",
    java: "/icons/code-file.png",
    js: "/icons/code-file.png",
    ts: "/icons/code-file.png",
    py: "/icons/code-file.png",
  };
  return icons[ext] || "/icons/file.png";
};

const f = (name: string, meta: FileContent, pos?: string): FileSystemItem => {
  const extension = name.split(".").pop() || "txt";
  return {
    id: nextId(),
    kind: "file",
    name,
    extension,
    icon: getIcon(extension),
    position: pos,
    meta,
  };
};

const d = (
  name: string,
  children: FileSystemItem[],
  opts?: {
    icon?: string;
    finderIcon?: LucideIcon;
    pos?: string;
    winPos?: string;
  },
): FolderItem => ({
  id: nextId(),
  kind: "folder",
  name,
  icon: opts?.icon || "/icons/folder.png",
  finderIcon: opts?.finderIcon,
  position: opts?.pos,
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
    f(
      "portfolio.url",
      { type: "link", href: "https://michael.voemel.org" },
      "top-10 right-20",
    ),
    f(
      "me.png",
      { type: "image", src: "/images/profile-pic-comic.png" },
      "top-10 left-5",
    ),
    f(
      "drivers-license.png",
      { type: "image", src: "/placeholder.svg" },
      "top-28 right-72",
    ),
    f(
      "short-description.txt",
      { type: "text", content: aboutShortDescription },
      "top-60 left-5",
    ),
    f("hobbies.txt", { type: "text", content: aboutHobbies }, "top-48 left-25"),
    f(
      "technical-skills.md",
      { type: "text", content: aboutTechnicalSkills },
      "top-20 right-15",
    ),
  ],
  { icon: "/icons/folder-home.png", finderIcon: InfoIcon },
);

const projectsFolder = d(
  "Projects",
  [
    d(
      "DropIn",
      [
        f(
          "description.md",
          { type: "text", content: dropinDesc },
          "top-5 left-10",
        ),
      ],
      { pos: "top-10 left-5", winPos: "top-[5vh] left-5" },
    ),
    d(
      "Studyflow",
      [
        f(
          "description.md",
          { type: "text", content: studyflowDesc },
          "top-5 left-10",
        ),
      ],
      { pos: "top-52 right-80", winPos: "top-[15vh] left-5" },
    ),
    d(
      "MoneyMate",
      [
        f(
          "description.md",
          { type: "text", content: moneymateDesc },
          "top-5 left-10",
        ),
      ],
      { pos: "top-10 left-80", winPos: "top-[25vh] left-5" },
    ),
    d(
      "Website Builder",
      [
        f(
          "description.md",
          { type: "text", content: websiteBuilderDesc },
          "top-5 left-10",
        ),
      ],
      { pos: "top-36 left-40", winPos: "top-[35vh] left-5" },
    ),
  ],
  { finderIcon: ClipboardListIcon },
);

const certsFolder = d("Certifications", [], { finderIcon: BadgeCheckIcon });

const otherFolder = d(
  "Other",
  [f("changelog.md", { type: "text", content: changelog }, "top-5 left-10")],
  { finderIcon: CircleEllipsisIcon },
);

const archiveFolder = d(
  "Archive",
  [
    f(
      "placeholder.png",
      { type: "image", src: "/placeholder.svg" },
      "top-10 left-10",
    ),
  ],
  { finderIcon: Trash2Icon },
);

export const fileSystemRoot = d(
  "Home",
  [
    aboutFolder,
    projectsFolder,
    certsFolder,
    otherFolder,
    archiveFolder,
    f(
      "morning-routine.java",
      { type: "code", content: javaCode, language: "java" },
      "bottom-20 right-20",
    ),
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
