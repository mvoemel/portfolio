import { SearchIcon } from "lucide-react";
import clsx from "clsx";

import { locations } from "@/lib/constants";
import { useWindowStore } from "@/stores/window-store";
import { useLocationStore } from "@/stores/finder-store";
import { WindowWrapper } from "../window-wrapper";
import { WindowControls } from "../window-controls";

function Finder() {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const renderList = (
    items:
      | Array<(typeof locations)[keyof typeof locations]>
      | typeof locations.work.children,
  ) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() =>
          setActiveLocation(item as (typeof locations)[keyof typeof locations])
        }
        className={clsx(
          item.id === activeLocation.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  const openItem = (item: any) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <SearchIcon className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>

          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const FinderWindow = WindowWrapper(Finder, "finder");
