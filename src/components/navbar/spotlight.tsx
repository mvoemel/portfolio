import { useState, useEffect, useRef, useMemo } from "react";
import { SearchIcon, FileIcon, FolderIcon } from "lucide-react";

import { useFinderStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { useSpotlightStore } from "@/stores/spotlight-store";
import { dockApps, fileSystemRoot } from "@/lib/constants";
import type { FileSystemItem, SpotlightResult } from "@/lib/types";
import { cn } from "@/lib/util";

const getAllFiles = (item: FileSystemItem): FileSystemItem[] => {
  let items: FileSystemItem[] = [item];
  if (item.kind === "folder" && item.children) {
    item.children.forEach((child) => {
      items = items.concat(getAllFiles(child));
    });
  }
  return items;
};

export function Spotlight() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { openWindow } = useWindowStore();
  const { changeDirectory } = useFinderStore();
  const { isOpen, closeSpotlight } = useSpotlightStore();

  const searchableItems = useMemo<SpotlightResult[]>(() => {
    const appResults: SpotlightResult[] = dockApps.map((app) => ({
      id: `app-${app.type}`,
      name: app.name,
      typeLabel: "Application",
      icon: app.icon,
      onSelect: () => {
        openWindow(app.type);
        closeSpotlight();
      },
    }));

    const fileResults: SpotlightResult[] = getAllFiles(fileSystemRoot).map(
      (item) => {
        const isFolder = item.kind === "folder";

        return {
          id: item.id,
          name: item.name,
          typeLabel: isFolder ? "Folder" : item.extension.toUpperCase(),
          icon: item.icon,
          fallbackIcon: isFolder ? FolderIcon : FileIcon,
          onSelect: () => {
            if (isFolder) {
              changeDirectory(item.id);
              openWindow("finder");
            } else {
              openWindow("preview", item);
            }
            closeSpotlight();
          },
        };
      },
    );

    return [...appResults, ...fileResults];
  }, [openWindow, changeDirectory, closeSpotlight]);

  const filteredItems = useMemo(() => {
    if (query.trim() === "") return [];

    return searchableItems
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10); // Limit results for performance
  }, [query, searchableItems]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      const timer = setTimeout(() => setQuery(""), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeSpotlight();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeSpotlight]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSpotlight();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        filteredItems[0].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 backdrop-brightness-75 transition-opacity"
        aria-hidden="true"
        onClick={closeSpotlight}
      />

      <div
        ref={containerRef}
        className={cn(
          "relative w-150 bg-control-bg/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-border-primary overflow-hidden transform transition-all duration-200 ease-out",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        )}
      >
        <div className="flex items-center px-4 py-4 border-b border-border-secondary">
          <SearchIcon className="text-text-secondary w-6 h-6 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent text-2xl font-light outline-none text-text-primary placeholder:text-text-tertiary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {filteredItems.length > 0 && (
          <ul className="py-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {filteredItems.map((item, index) => {
              const IconComponent = item.fallbackIcon;

              return (
                <li
                  key={item.id}
                  onClick={item.onSelect}
                  className={cn(
                    "mx-2 px-3 py-2 cursor-pointer flex items-center gap-3 transition-colors rounded-md group",
                    index === 0
                      ? "bg-primary text-text-primary"
                      : "hover:bg-primary-hover hover:text-text-primary",
                  )}
                >
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-7 object-contain"
                    />
                  ) : (
                    IconComponent && (
                      <IconComponent className="size-7 opacity-80" />
                    )
                  )}

                  <span className="text-base truncate font-normal leading-none">
                    {item.name}
                  </span>

                  <span
                    className={cn(
                      "ml-auto text-xs opacity-60",
                      index === 0
                        ? "text-text-primary"
                        : "text-text-secondary group-hover:text-text-primary",
                    )}
                  >
                    {item.typeLabel}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
