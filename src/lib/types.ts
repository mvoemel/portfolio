import type { GeoGeometryObjects } from 'd3-geo'
import type { LucideIcon } from 'lucide-react'

export type FileType = 'txt' | 'md' | 'img' | 'pdf' | 'url' | 'code'
export type FileTypeCodeLanguages = 'java' | 'js' | 'ts' | 'py'

export type FileContent =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language: FileTypeCodeLanguages }
  | { type: 'image' | 'pdf'; src: string }
  | { type: 'link'; href: string }

interface FileSystemItemBase {
  id: string
  name: string
  icon?: string
  position?: string
  showOnDesktop?: boolean
}

export interface FileItem extends FileSystemItemBase {
  kind: 'file'
  extension: string
  windowPosition?: string
  downloadable?: boolean
  meta: FileContent
}

export interface FolderItem extends FileSystemItemBase {
  kind: 'folder'
  finderIcon?: LucideIcon
  windowPosition?: string
  children: FileSystemItem[]
}

export type FileSystemItem = FileItem | FolderItem

export type NavIconItemType = 'spotlight' | 'controlcenter'
export type NavSystemItemAction = 'finder' | 'clipboard' | 'close' | 'reload'

export interface NavIconItem {
  id: string
  icon: LucideIcon
  action: NavIconItemType
}

export interface NavSystemItem {
  id: string
  name: string
  icon: LucideIcon
  action: NavSystemItemAction
  finderPath?: string
}

export type NavLinkItem =
  | {
      id: string
      type: 'link'
      name: string
      icon?: string
      app: WindowType
      path?: string
    }
  | {
      id: string
      type: 'dropdown'
      name: string
      icon?: string
      children: NavLinkItem[]
    }

export type WindowType = 'finder' | 'safari' | 'maps' | 'contacts' | 'terminal' | 'preview'

export interface WindowState {
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  data?: FileSystemItem
}

export type WindowConfig = Record<WindowType, WindowState>

export type DockApp = {
  type: WindowType
  name: string
  icon: string
  canOpen: boolean
}

export type SafariLink = {
  name: string
  icon?: string
  href: string
}

export type SafariLinkGroup = {
  title: string
  links: SafariLink[]
}

export type ContactCard = {
  name: string
  profilePicture?: string
  emailEncoded: string // base64; use 'atob(email)' to encode once
  phone?: string
  github?: string
  linkedin?: string
}

type GeoFeature = {
  type: 'Feature'
  id: string | number
  geometry: GeoGeometryObjects
  properties: {
    name: string
    [key: string]: unknown
  }
}

export type GeoFeatureCollection = {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

export type SpotlightResult = {
  id: string
  name: string
  typeLabel: string
  icon?: string
  fallbackIcon?: React.ElementType
  onSelect: () => void
}
