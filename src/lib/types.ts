export type NavLinkType = "finder" | "contact" | "resume";

export interface NavLink {
  id: number;
  name: string;
  type: NavLinkType;
}

export interface NavIcon {
  id: number;
  img: string;
}

export interface DockApp {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
}

export interface BlogPost {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface Social {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
}

export interface PhotoLink {
  id: number;
  icon: string;
  title: string;
}

export interface GalleryItem {
  id: number;
  img: string;
}

export type FileType = "txt" | "url" | "img" | "fig" | "pdf";
export type LocationType = "work" | "about" | "resume" | "trash";
export type ItemKind = "folder" | "file";

export interface FileItem {
  id: number;
  name: string;
  icon: string;
  kind: "file";
  fileType: FileType;
  position?: string;
  description?: string[];
  subtitle?: string;
  image?: string;
  imageUrl?: string;
  href?: string;
}

export interface FolderItem {
  id: number;
  name: string;
  icon: string;
  kind: "folder";
  position?: string;
  windowPosition?: string;
  children: (FileItem | FolderItem)[];
}

export type LocationItem = FileItem | FolderItem;

export interface Location {
  id: number;
  type: LocationType;
  name: string;
  icon: string;
  kind: "folder";
  children: LocationItem[];
}

export type WindowType =
  | "finder"
  | "contact"
  | "resume"
  | "safari"
  | "photos"
  | "terminal"
  | "txtfile"
  | "imgfile";

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: any; // You can make this more specific based on what data each window type holds
}

export type WindowConfig = Record<WindowType, WindowState>;
