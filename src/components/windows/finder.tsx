import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react";
import clsx from "clsx";

import { useWindowStore } from "@/stores/window-store";
import { useFinderStore } from "@/stores/finder-store";
import { fileSystemRoot, findItemById } from "@/lib/file-system";
import type { FileSystemItem, FolderItem } from "@/lib/types";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";

function Finder() {
  const { openWindow } = useWindowStore();
  const {
    currentDirectoryId,
    changeDirectory,
    goBack,
    goForward,
    history,
    historyIndex,
  } = useFinderStore();

  const currentFolder =
    (findItemById(currentDirectoryId) as FolderItem) || fileSystemRoot;

  const sidebarFavorites = [
    fileSystemRoot, // Home
    ...fileSystemRoot.children.filter((child) => child.kind === "folder"),
  ];

  const sidebarProjectsFolder: FolderItem | undefined =
    fileSystemRoot.children.find(
      (item) => item.name === "Projects" && item.kind === "folder",
    ) as FolderItem;

  const handleOpenItem = (item: FileSystemItem) => {
    if (item.kind === "folder") {
      changeDirectory(item.id);
      return;
    }

    const { meta } = item;

    if (meta.type === "link") {
      window.open(meta.href, "_blank");
    } else {
      openWindow("preview", item);
    }
  };

  return (
    <>
      <div className="window-header">
        <div className="flex items-center gap-4">
          <WindowControls target="finder" />

          <div className="flex items-center gap-2 text-text-secondary ml-2">
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className="p-1 hover:bg-finder-sidebar-item-hover rounded disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLeftIcon size={16} />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
              className="p-1 hover:bg-finder-sidebar-item-hover rounded disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>

          <span className="text-sm font-semibold text-text-primary ml-2">
            {currentFolder.name}
          </span>
        </div>

        <button
          className="flex items-center gap-2 text-text-secondary cursor-pointer"
          // TODO: implement
          onClick={() => {}}
        >
          <SearchIcon size={16} />
        </button>
      </div>

      <div className="bg-bg-primary flex h-[calc(100%-3rem)] flex-1 overflow-hidden">
        <div className="w-48 bg-bg-secondary p-2 flex flex-col gap-4 text-sm">
          <div>
            <h3 className="text-xs font-semibold text-text-secondary px-2 mb-1">
              Favorites
            </h3>
            <ul className="space-y-0.5">
              {sidebarFavorites.map((item) => {
                const isActive = item.id === currentDirectoryId;
                const Icon = (item as FolderItem).finderIcon;

                return (
                  <li
                    key={item.id}
                    onClick={() => changeDirectory(item.id)}
                    className={clsx(
                      "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors",
                      isActive
                        ? "bg-finder-sidebar-item-active text-selection-text"
                        : "hover:bg-finder-sidebar-item-hover text-text-primary",
                    )}
                  >
                    {Icon && (
                      <Icon
                        size={16}
                        className={clsx(
                          isActive
                            ? "text-finder-icon-folder"
                            : "text-text-secondary",
                        )}
                      />
                    )}
                    <span className="truncate">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {sidebarProjectsFolder && (
            <div>
              <h3 className="text-xs font-semibold text-text-secondary px-2 mb-1">
                Projects
              </h3>
              <ul className="space-y-0.5">
                {sidebarProjectsFolder.children.map((item) => {
                  const isActive = item.id === currentDirectoryId;

                  return (
                    <li
                      key={item.id}
                      onClick={() => changeDirectory(item.id)}
                      className={clsx(
                        "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors",
                        isActive
                          ? "bg-finder-sidebar-item-active text-selection-text"
                          : "hover:bg-finder-sidebar-item-hover text-text-primary",
                      )}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="size-4"
                        />
                      )}
                      <span className="truncate">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {currentFolder.children.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-secondary">
              <p>Folder is empty</p>
            </div>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-4 auto-rows-min">
              {currentFolder.children.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleOpenItem(item)}
                  className="group flex flex-col items-center gap-1 p-2 rounded hover:bg-bg-secondary cursor-pointer transition-colors text-center"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="size-12 object-contain drop-shadow-sm"
                  />
                  <p className="text-xs text-text-secondary font-medium w-full wrap-break-word line-clamp-2 leading-tight">
                    {item.name}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export const FinderWindow = WindowWrapper(
  Finder,
  "finder",
  "w-3xl absolute left-40 top-40 bg-bg-secondary rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden",
);
