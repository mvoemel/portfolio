import {
  CircleXIcon,
  CopyIcon,
  InfoIcon,
  PowerIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";

import type {
  DockApp,
  NavIconItem,
  NavLinkItem,
  NavSystemItem,
  SafariLinkGroup,
} from "@/lib/types";

export const navSystemDropdown: NavSystemItem[] = [
  { id: "1", name: "About this portfolio", icon: InfoIcon, action: "href" },
  { id: "2", name: "Copy link", icon: CopyIcon, action: "clipboard" },
  { id: "3", name: "Close all windows", icon: CircleXIcon, action: "reset" },
  { id: "4", name: "Shut down", icon: PowerIcon, action: "close" },
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
        icon: "/icons/folder.png",
        type: "link",
        app: "finder",
        path: "Projects/DropIn",
      },
      {
        id: "2-2",
        name: "Studyflow",
        icon: "/icons/folder.png",
        type: "link",
        app: "finder",
        path: "Projects/Studyflow",
      },
      {
        id: "2-3",
        name: "MoneyMate",
        icon: "/icons/folder.png",
        type: "link",
        app: "finder",
        path: "Projects/MoneyMate",
      },
      {
        id: "2-4",
        name: "Website Builder",
        icon: "/icons/folder.png",
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
    tooltip: "Portfolio",
    icon: "/icons/finder-app.png",
    canOpen: true,
  },
  {
    type: "safari",
    tooltip: "Links",
    icon: "/icons/safari-app.png",
    canOpen: true,
  },
  {
    type: "maps",
    tooltip: "Map",
    icon: "/icons/maps-app.png",
    canOpen: true,
  },
  {
    type: "contacts",
    tooltip: "Contact",
    icon: "/icons/contacts-app.png",
    canOpen: true,
  },
  {
    type: "terminal",
    tooltip: "Terminal",
    icon: "/icons/terminal-app.png",
    canOpen: true,
  },
  {
    type: "finder",
    tooltip: "Archive",
    icon: "/icons/trash.png",
    canOpen: false,
  },
];

export const safariLinks: SafariLinkGroup[] = [
  {
    title: "Frequently Visited",
    links: [
      {
        name: "Portfolio",
        icon: "/favicon.png",
        href: "https://michael.voemel.org",
      },
      {
        name: "Github",
        href: "https://github.com/mvoemel",
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/mvoemel",
      },
    ],
  },
  {
    title: "Companies I have worked with",
    links: [
      {
        name: "Microshield",
        href: "https://microshield.ch",
      },
      {
        name: "Titanion",
        href: "https://titanion.ch",
      },
    ],
  },
];
