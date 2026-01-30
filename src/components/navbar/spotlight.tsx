import { useState, useEffect, useRef, useMemo } from "react";
import { SearchIcon } from "lucide-react";

import { useFinderStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { fileSystemRoot } from "@/lib/file-system";
import type { FileSystemItem } from "@/lib/types";
import { cn } from "@/lib/util";

const getAllItems = (item: FileSystemItem): FileSystemItem[] => {
  let items: FileSystemItem[] = [item];
  if (item.kind === "folder" && item.children) {
    item.children.forEach((child) => {
      items = items.concat(getAllItems(child));
    });
  }
  return items;
};

type SpotlightProps = {
  isOpen: boolean;
  onClose: () => void;
};

// TODO: add also applications
export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { openWindow } = useWindowStore();
  const { changeDirectory } = useFinderStore();

  const allItems = useMemo(() => getAllItems(fileSystemRoot), []);

  const filteredItems = useMemo(() => {
    if (query.trim() === "") return [];
    return allItems
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
  }, [query, allItems]);

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
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSelect = (item: FileSystemItem) => {
    if (item.kind === "folder") {
      changeDirectory(item.id);
      openWindow("finder");
    } else {
      openWindow("preview", item);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 backdrop-brightness-75 transition-opacity"
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className={cn(
          "relative w-150 bg-control-bg backdrop-blur-2xl rounded-xl shadow-2xl border border-border-secondary overflow-hidden transform transition-all",
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
          <ul className="py-2 max-h-[60vh] overflow-y-auto">
            {filteredItems.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className={cn(
                  "px-4 py-2 cursor-pointer flex items-center gap-3 transition-colors group rounded-lg",
                  index === 0
                    ? "bg-primary text-text-primary"
                    : "hover:bg-primary-hover hover:text-text-primary",
                )}
              >
                {item.icon && (
                  <img src={item.icon} alt={item.name} className="size-6" />
                )}
                <span className="text-lg truncate">{item.name}</span>
                <span
                  className={cn(
                    "ml-auto text-xs opacity-60",
                    index === 0
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary",
                  )}
                >
                  {item.kind}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
