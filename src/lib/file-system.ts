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

const f = (
  name: string,
  meta: FileContent,
  opts?: { enableDownload?: boolean; winPos?: string },
): FileSystemItem => {
  const extension = name.split(".").pop() || "txt";
  return {
    id: nextId(),
    kind: "file",
    name,
    extension,
    icon: getIcon(extension),
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
  icon: opts?.icon || "/icons/folder.png",
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
    f("drivers-license.png", { type: "image", src: "/placeholder.svg" }),
    f("short-description.txt", {
      type: "text",
      content: aboutShortDescription,
    }),
    f("hobbies.txt", { type: "text", content: aboutHobbies }),
    f("technical-skills.md", { type: "text", content: aboutTechnicalSkills }),
  ],
  { icon: "/icons/folder-home.png", finderIcon: InfoIcon },
);

const projectsFolder = d(
  "Projects",
  [
    d("DropIn", [f("description.md", { type: "text", content: dropinDesc })], {
      winPos: "top-[2vh] left-5",
    }),
    d(
      "Studyflow",
      [f("description.md", { type: "text", content: studyflowDesc })],
      { winPos: "top-[12vh] left-5" },
    ),
    d(
      "MoneyMate",
      [f("description.md", { type: "text", content: moneymateDesc })],
      { winPos: "top-[22vh] left-5" },
    ),
    d(
      "Website Builder",
      [f("description.md", { type: "text", content: websiteBuilderDesc })],
      { winPos: "top-[32vh] left-5" },
    ),
  ],
  { finderIcon: ClipboardListIcon },
);

const certsFolder = d("Certifications", [], { finderIcon: BadgeCheckIcon });

const otherFolder = d(
  "Other",
  [
    f("changelog.md", { type: "text", content: changelog }),
    f(
      "resume.pdf",
      {
        type: "pdf",
        src: "/files/resume.pdf",
      },
      { enableDownload: true },
    ),
  ],
  { finderIcon: CircleEllipsisIcon },
);

const archiveFolder = d(
  "Archive",
  [f("placeholder.png", { type: "image", src: "/placeholder.svg" })],
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
