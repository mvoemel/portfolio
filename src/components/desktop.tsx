import { useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/all'

import { useFinderStore } from '@/stores/finder-store'
import { useWindowStore } from '@/stores/window-store'
import { fileSystemRoot } from '@/lib/constants'
import type { FileSystemItem } from '@/lib/types'
import { cn } from '@/lib/util'

function collectDesktopItems(items: FileSystemItem[]): FileSystemItem[] {
  return items.flatMap((item) => {
    const results: FileSystemItem[] = []
    if (item.showOnDesktop) results.push(item)
    if (item.kind === 'folder') results.push(...collectDesktopItems(item.children))
    return results
  })
}

export function Desktop() {
  const { changeDirectory } = useFinderStore()
  const { openWindow } = useWindowStore()

  useGSAP(() => {
    Draggable.create('.folder')
  }, [])

  const handleOpen = (item: FileSystemItem) => {
    if (item.kind === 'folder') {
      changeDirectory(item.id)
      openWindow('finder')
    } else {
      openWindow('preview', item)
    }
  }

  const desktopItems = useMemo(
    () => collectDesktopItems(fileSystemRoot.children),
    []
  )

  if (desktopItems.length < 1) return null

  return (
    <section id="desktop" className="relative z-0 max-sm:hidden">
      <ul>
        {desktopItems.map((item) => (
          <li
            key={item.id}
            className={cn(
              'absolute z-0 select-none flex items-center flex-col size-24',
              'group folder',
              item.windowPosition,
            )}
            onClick={() => handleOpen(item)}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="size-18 group-hover:bg-bg-secondary/30 p-1 rounded-md"
            />
            <p className="text-sm text-text-primary text-center px-1 rounded-md transition-colors max-w-40">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
