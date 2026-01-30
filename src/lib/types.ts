import type { LucideIcon } from "lucide-react";

export type FileType = "txt" | "md" | "img" | "pdf" | "url" | "code";
export type FileTypeCodeLanguages = "java" | "js" | "ts" | "py";

export type FileContent =
  | { type: "text"; content: string }
  | { type: "code"; content: string; language: FileTypeCodeLanguages }
  | { type: "image" | "pdf"; src: string }
  | { type: "link"; href: string };

interface FileSystemItemBase {
  id: string;
  name: string;
  icon?: string;
  position?: string;
}

export interface FileItem extends FileSystemItemBase {
  kind: "file";
  extension: string;
  meta: FileContent;
}

export interface FolderItem extends FileSystemItemBase {
  kind: "folder";
  finderIcon?: LucideIcon;
  windowPosition?: string;
  children: FileSystemItem[];
}

export type FileSystemItem = FileItem | FolderItem;

export type NavIconItemType = "spotlight" | "controlcenter";
export type NavSystemItemAction = "href" | "clipboard" | "reset" | "close";

export interface NavIconItem {
  id: string;
  icon: LucideIcon;
  action: NavIconItemType;
}

export interface NavSystemItem {
  id: string;
  name: string;
  icon: LucideIcon;
  action: NavSystemItemAction;
}

export type NavLinkItem =
  | {
      id: string;
      type: "link";
      name: string;
      icon?: string;
      app: WindowType;
      path?: string;
    }
  | {
      id: string;
      type: "dropdown";
      name: string;
      icon?: string;
      children: NavLinkItem[];
    };

export type WindowType =
  | "finder"
  | "safari"
  | "maps"
  | "contacts"
  | "terminal"
  | "preview";

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  data?: FileSystemItem;
}

export type WindowConfig = Record<WindowType, WindowState>;

export type DockApp = {
  type: WindowType;
  tooltip: string;
  icon: string;
  canOpen: boolean;
};
