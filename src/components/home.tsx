import { locations } from "@/lib/constants";
import { useLocationStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";

const projects = locations.work?.children ?? [];

export function Home() {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
