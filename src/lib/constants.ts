import { CircleXIcon, CopyIcon, InfoIcon, PowerIcon } from "lucide-react";

import type {
  DockApp,
  NavIconItem,
  NavLinkItem,
  NavSystemItem,
} from "@/lib/types";

export const navIcons: NavIconItem[] = [
  { id: "1", icon: "/icons/spotlight.svg", action: "spotlight" },
  { id: "2", icon: "/icons/control-center.svg", action: "controlcenter" },
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
        type: "link",
        app: "finder",
        path: "Projects/DropIn",
      },
      {
        id: "2-2",
        name: "Studyflow",
        type: "link",
        app: "finder",
        path: "Projects/Studyflow",
      },
      {
        id: "2-3",
        name: "MoneyMate",
        type: "link",
        app: "finder",
        path: "Projects/MoneyMate",
      },
    ],
  },
  { id: "3", name: "Contact", type: "link", app: "contacts" },
];

export const navSystemDropdown: NavSystemItem[] = [
  { id: "1", name: "About this portfolio", Icon: InfoIcon, action: "href" },
  { id: "2", name: "Copy link", Icon: CopyIcon, action: "clipboard" },
  { id: "3", name: "Close all windows", Icon: CircleXIcon, action: "reset" },
  { id: "4", name: "Shut down", Icon: PowerIcon, action: "close" },
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
    icon: "/icons/contact-app.png",
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
