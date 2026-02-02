import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";

import { useFinderStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { fileSystemRoot } from "@/lib/constants";
import type { FileSystemItem, FolderItem } from "@/lib/types";
import { cn } from "@/lib/util";

export function Desktop() {
  const { changeDirectory } = useFinderStore();
  const { openWindow } = useWindowStore();

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  const handleOpenProjectFinder = (project: FileSystemItem) => {
    changeDirectory(project.id);
    openWindow("finder");
  };

  const projectsFolder: FolderItem | undefined = fileSystemRoot.children.find(
    (item) => item.name === "Projects" && item.kind === "folder",
  ) as FolderItem;

  if (
    !projectsFolder ||
    !Array.isArray(projectsFolder.children) ||
    projectsFolder.children.length < 1
  )
    return null;

  return (
    <section id="desktop" className="relative z-0 max-sm:hidden">
      <ul>
        {projectsFolder.children.map((project) => (
          <li
            key={project.id}
            className={cn(
              "absolute z-0 select-none flex items-center flex-col size-24",
              "group folder",
              project.windowPosition,
            )}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img
              src={project.icon}
              className="group-hover:bg-bg-secondary/30 p-1 rounded-md"
              alt={project.name}
            />
            <p className="text-sm text-text-primary text-center px-1 rounded-md transition-colors max-w-40">
              {project.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
